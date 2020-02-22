import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
  } from 'react-native';
import Divider from './Divider';

export default class ComicSeriesLineItem extends React.Component {

    constructor(props){
        super(props);
        console.log('Constructing ComicSeriesLineItem - ' + this.props.name);
        this.state = {
            name: this.props.name
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inlineContainer}>
                    <Text style={styles.seriesTitle}>{this.state.name}</Text>
                    <Button
                        title="Details >"
                        onPress={() => this.props.onClick(this.state.name)}
                    />
                </View>
                <Divider/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        minWidth: '100%',
        minHeight: 50,
        maxHeight: 150,
    },
    inlineContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    seriesTitle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        paddingLeft: 20,
    },
    detailsLine: {
        fontSize: 15,
        paddingRight: 20,
    }
  });