// SignUp.js
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            email: '', 
            password: '', 
            errorMessage: null,
            authenticated: false,
        }
    }

    componentWillMount(){
      AsyncStorage.getItem('@Store:id')
      .then(res => {
        if(res !== undefined){
          this.props.navigation.navigate('Root');
        }
      })
      .catch(err => {
        console.error(err);
      });
    }

    handleSignUp = () => {
      const authRecord = {
        email: this.state.email,
        password: this.state.password
      }
  
      axios.put('https://wacode-2020.herokuapp.com/auth/register', authRecord)
      .then(response => {
        console.log(response.data);
        if(response.data !== undefined && res !== null){
          console.log('setting state');
          this.setState({
            email: response.data.email, 
            password: response.data.password, 
            errorMessage: null,
            authenticated: true,
          }, () => {
            AsyncStorage.setItem('@Store:id', response.data.id)
            .catch(err => {
              console.error(err);
            });
          });
        }
      })
      .catch(err => {
          console.error(err);
      });
    }

    render() {

      if(this.state.authenticated){
        this.props.navigation.navigate('Root');
      }
        return (
            <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/icon.png')}
                />
                <Text>Sign Up</Text>
                {this.state.errorMessage !== null &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                placeholder= "Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                />
                <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                />
                <Text></Text>
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Text></Text>
                <Button
                title="Already have an account? Login"
                onPress={() => {
                  const navigation = useNavigation();
                  navigation.jumpTo('Login');
                }}
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