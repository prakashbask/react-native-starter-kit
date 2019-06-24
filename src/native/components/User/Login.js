import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container, Content, Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from '../UI/Messages';
import Header from '../UI/Header';
import Spacer from '../UI/Spacer';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val })

  handleSubmit = () => {
    const { onFormSubmit } = this.props;

    return onFormSubmit(this.state)
      .then(() => Actions.main())
      .catch(() => {});
  }

  render() {
    const { loading, error, success } = this.props;
    const { email } = this.state;

    return (
      <Container>
        <Content>
          <View padder>
            <Header
              title="Welcome back"
              content="Please use your email and password to login."
            />
            {error && <Messages message={error} />}
            {success && <Messages type="success" message={success} />}
          </View>

          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                disabled={loading}
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                disabled={loading}
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>
            
            <Spacer size={20} />

            <View padder>
              <Text  warning onPress={Actions.forgotPassword}
                style={styles.forgotPasswordStyle}>
                Forgot Password?
              </Text>
                 
              <Button block onPress={this.handleSubmit} disabled={loading}
                style= {styles.button_style}>
                <Text>{loading ? 'Loading' : 'Login' }</Text>
              </Button>
              <Button block onPress={Actions.signUp} >
                <Text>Signup</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  } 
}
const styles = StyleSheet.create({
  button_style: {
    marginBottom: 20
  },
  forgotPasswordStyle: {
    marginBottom: 30,
    alignSelf: 'flex-end',
    color: '#f0ad4e'
  }
});

export default Login;
