// SignUp.js
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import * as firebase from 'firebase';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            email: '', 
            password: '', 
            errorMessage: null 
        }
    }

    _registerUser(user){

        console.log("About to register user", user);

        return fetch('https://wacode-hackathon-api.herokuapp.com/user/insert', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.user.email,
                jobsPosted: [],
                jobsWorking: []
            }),
        }).catch(err => {
            console.error(err);
        })
    }

    handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            //console.log(res);
            this._registerUser(res)
            .then(() => 
                this.props.navigation.navigate('Main')
            );
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
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
                onPress={() => this.props.navigation.navigate('Login')}
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