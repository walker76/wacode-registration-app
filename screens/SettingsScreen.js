import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props){
    super(props);
    this._logout = this._logout.bind(this);
  }

  _logout(){
      firebase.auth().signOut()
      .then(() => this.props.navigation.navigate('Loading'))
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flex: 1}}>
        <View style={styles.header}/>
        <Image style={styles.avatar} 
          source={require('../assets/images/robot-dev.png')}
          />
        <View style={styles.body}>
          <View /*style={styles.bodyContent*}*/>
          <Text style={styles.name}>Schaeffer Duncan</Text>
          <Text style={styles.info}>Stay-at-Home Mother</Text>
          <Text style={styles.description}>Just need a strong man to get the groceries for me</Text>

          <TouchableOpacity style={styles.buttonContainer} onPress={this._logout}>
            <Text style={{fontWeight: '500'}}>
            <Text style={{fontSize: 25}}>
            Logout
            </Text>
            </Text>
          </TouchableOpacity>
          </View>
          </View>
      </ScrollView>);
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:40,
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  bodyContent: {
    
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});