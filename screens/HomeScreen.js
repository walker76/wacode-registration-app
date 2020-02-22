import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import * as firebase from 'firebase';
import JobListItem from '../components/JobListItem';
import { NavigationActions } from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Upcoming',
  };

  constructor(props){
    super(props);

    this.state = {
      list: []
    }

    this._handleClick = this._handleClick.bind(this);
  }

  componentWillMount(){
    let userId = firebase.auth().currentUser.email;

    let url = "https://wacode-hackathon-api.herokuapp.com/user/findJobsById/" + userId;
    fetch(url)
    .then(response => {
      return response.json();
    }).then(responseJSON => {
      this.setState({
        list: responseJSON
      });
    }).catch(err => {
      console.error(err);
    });
  }

  _handleClick(id){
    console.log(this.props.navigation);
    console.log(id);
    this.props.navigation.navigate('LinksStack', {}, NavigationActions.navigate({ routeName: 'JobDetails', params: {id: id} }))
  }

  render() {
    if(this.state.list && this.state.list.length > 0){
      console.log(this.state.list);
      let comp = this.state.list.map((item, i) => (
        <JobListItem
          key={i}
          itemKey={item}
          handleClick={this._handleClick}
        />
      ));

      return (
        <ScrollView style={styles.container}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
             * content, we just wanted to provide you with some helpful links */}
          {/* <ExpoLinksView /> */}
          <View style={styles.container}>
            {comp}
          </View>
  
        </ScrollView>
      );
    } else {
      return (

        <View style={styles.noJobContainer}>
          <Text>No upcoming jobs/postings</Text>
        </View>
    );
    }

    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 70,
  },
  noJobContainer: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 70,
    margin: 15,
    textAlign: 'center',
    alignItems: 'center'
  },
  titleContainerStyle: {
    fontSize: 70,
  },
});