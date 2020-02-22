import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

export default class Divider extends React.Component {

    render(){
        return (
            <View style = {styles.lineStyle} />
        );
    }
}

const styles = StyleSheet.create({
  lineStyle:{
        borderTopWidth: 0.5,
        borderColor: 'black',
        margin: 0,
   }
 });