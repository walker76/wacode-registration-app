import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Find Jobs',
  };

  constructor(props){
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  render() {

    const list = [
      {
        title: 'Food',
        icon: 'cutlery'
      },
      {
        title: 'Handyman',
        icon: 'wrench'
      },
      {
        title: 'Company',
        icon: 'heart'
      },
      {
        title: 'Driver',
        icon: 'car'
      },
      {
        title: 'Professional',
        icon: 'black-tie'
      },
      {
        title: 'Recreation',
        icon: 'bicycle'
      },
      {
        title: 'Misc',
        icon: 'circle'
      },
    ]

    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
        <View style={styles.container}>
         {
            list.map((item, i) => (
              <ListItem
                key={item.title}
                title={item.title}
                titleContainerStyle={styles.titleContainerStyle}
                leftIcon = {<Icon name={item.icon} type={'font-awesome'} size={25}/>}
                rightIcon = {<Icon name={'chevron-right'} type={'font-awesome'} size={25}/>}
                height= {60}
                onPress={() => {
                    this._handleClick(item.title)
                  }
                }
                keyExtractor={item => item.title}
              />
            ))
          }
        </View>

      </ScrollView>
    );
  }

  _handleClick(_name) {
    const { navigate } = this.props.navigation;
    navigate('JobInfo',{ name: _name });
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 70,
  },
  titleContainerStyle: {
    fontSize: 70,
  },
});
