import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import axios from 'axios';
import {AsyncStorage, Platform} from 'react-native';

class FindOrders extends React.Component {

  static navigationOptions = {
    title: 'Find Jobs',
  };

  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount(){

    AsyncStorage.getItem('@Store:id')
    .then(res => {
      if(res === undefined || res === null){
        this.props.navigation.navigate('Login');
      }
    })
    .catch(err => {
      console.error(err);
    });

    axios.get('https://wacode-2020.herokuapp.com/orders/findByStatus/PENDING')
    .then(response => {
      console.log(response.data);
      if(response.data !== undefined && response.data !== null){
        console.log('setting state');
        this.setState({
          data: response.data,
        });
      }
    })
    .catch(err => {
        console.error(err);
    });
  }

  render() {
    const list = this.state.data;
    if(list.length <= 0){
      return(
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Text>No orders in your area</Text>
            </View>
          </ScrollView>
        </View>
      );
    }

    console.log(list);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            {
              list.map((item, i) => (
                
                <ListItem
                  key={i}
                  title={item.title}
                  subtitle={item.description}
                  rightIcon = {<Icon name={'chevron-right'} type={'font-awesome'} size={25}/>}
                  height= {60}
                  onPress={() => {
                      this._handleClick(item.id)
                    }
                  }
                  keyExtractor={item => item.id}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClick(_id) {
    this.props.navigation.navigate('OrderDetails',{ id: _id });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default FindOrders;
