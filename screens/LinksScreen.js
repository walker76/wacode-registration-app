import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';

export default class LinksScreen extends React.Component {

  componentWillMount(){
    AsyncStorage.getItem('@Store:id')
    .then(res => {
      if(res === undefined || res === null){
        this.props.navigation.navigate('Login');
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  logout(){
    AsyncStorage.removeItem('@Store:id')
    .then(res => {
      this.props.navigation.navigate('Login');
    })
    .catch(err => {
      console.error(err);
    });
  }

  render(){
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <OptionButton
          icon="md-school"
          label="Read the Expo documentation"
          onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
        />

        <OptionButton
          icon="md-compass"
          label="Read the React Navigation documentation"
          onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
        />

        <OptionButton
          icon="ios-chatboxes"
          label="Ask a question on the forums"
          onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
          isLastOption
        />

        <OptionButton
          icon="ios-chatboxes"
          label="Ask a question on the forums"
          onPress={() => {
            this.logout();
          }}
          isLastOption
        />

      </ScrollView>
    );
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
