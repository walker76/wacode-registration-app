import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
  } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
  
export default class PostConfirmationScreen extends React.Component {
  static navigationOptions = {
    title: 'Successful Post',
  };

  constructor(props){
    super(props);
    this.state = { JobType: '',};
  }

  onPressPost = () => {
    const { navigate } = this.props.navigation;
    navigate('PostScreen');
  }

  onPressHome = () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
}

  render() {

    const placeholder = {
        label: 'Select a Job Type',
        value: null,
        color: 'blue',
        fontSize: 100,
    };

    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (

      <View style={styles.container}>  

        <Text style={styles.title}> Successful Post!{"\n"}</Text>

        <TouchableOpacity style={styles.buttonContainer}
            onPress={this.onPressPost}>
          <Text style={{fontWeight: '300'}}>
              <Text style={{fontSize: 20}}>
              Post Another Job
              </Text>
          </Text>
        </TouchableOpacity>   

        {/* <Text style={styles.title}>{"\n"}</Text> */}

        <TouchableOpacity style={styles.buttonContainer}
            onPress={this.onPressHome}>
          <Text style={{fontWeight: '300'}}>
              <Text style={{fontSize: 20}}>
              Go to Home
              </Text>
          </Text>
        </TouchableOpacity>  

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5cf441',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textInput: {
    fontSize: 15,
    color: 'black',

  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 115,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 50,
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
})
  
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 2.0,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2.0,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});