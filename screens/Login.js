// Login.js
import React from 'react';
import { KeyboardAvoidingView, Image, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    console.log('login');
    this.state = { 
      email: '', 
      password: '', 
      errorMessage: null,
      authenticated: false 
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('@Store:id')
    .then(res => {
      console.log(res);
      if(res !== undefined && res !== null){
        this.props.navigation.navigate('Root');
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  handleLogin = () => {

    console.log(this.state);

    const authRecord = {
      email: this.state.email,
      password: this.state.password
    }

    axios.put('https://wacode-2020.herokuapp.com/auth/login', authRecord)
      .then(response => {
        console.log(response.data);
        if(response.data !== undefined){
          console.log('response', response.data);
          this.setState({
            authenticated: true,
          }, () => {
            AsyncStorage.setItem('@Store:id', response.data.id)
            .catch(err => {
              console.error(err);
            });
          })
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          email: this.state.email, 
          password: this.state.password, 
          errorMessage: 'not found',
          authenticated: false,
        });
      });
  }

  render() {
    if(this.state.authenticated){
      this.props.navigation.navigate('Root');
    }

    let email = this.state.email !== undefined ? this.state.email : '';
    let password = this.state.password !== undefined ? this.state.password : '';

    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled> 
      <View style={styles.container}>
          <Image
              source={require('../assets/images/icon.png')}
          />
        <Text>Login Screen</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder= "Email"
          onChangeText={email => this.setState({ email })}
          value={email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <Text></Text>
        <Button title="Login" onPress={this.handleLogin} />
        <Text></Text>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    minWidth: '90%',
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 8,
    paddingLeft: 5
  }
})