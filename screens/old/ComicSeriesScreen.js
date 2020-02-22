import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ComicSeriesLineItem from '../../components/ComicSeriesLineItem';

export default class ComicSeriesScreen extends React.Component {

  static navigationOptions = {
      title: 'Series',
  };

  constructor(props){
    super(props);
    this.state = {
      comics: [
        {key: 'Comic A'},
        {key: 'Comic B'},
        {key: 'Comic C'},
        {key: 'Comic D'},
        {key: 'Comic E'},
        {key: 'Comic F'},
        {key: 'Comic G'},
        {key: 'Comic H'},
        {key: 'Comic A'},
        {key: 'Comic B'},
        {key: 'Comic C'},
        {key: 'Comic D'},
        {key: 'Comic E'},
        {key: 'Comic F'},
        {key: 'Comic G'},
        {key: 'Comic H'},
        {key: 'Comic A'},
        {key: 'Comic B'},
        {key: 'Comic C'},
        {key: 'Comic D'},
        {key: 'Comic E'},
        {key: 'Comic F'},
        {key: 'Comic G'},
        {key: 'Comic H'},
      ]
    };
    this._handleClick = this._handleClick.bind(this);
  }

  render() {

    let comicsContent = <Text>No Comics Available</Text>;
    if(this.state.comics && this.state.comics.length > 0){
      comicsContent = (<FlatList
                        data={this.state.comics}
                        renderItem={({item}) => <ComicSeriesLineItem name={item.key} onClick={this._handleClick}/>}
                      />);
    }

    return (
      <View style={styles.container}>
        {comicsContent}
      </View>
    );
  }

  _handleClick(_name) {
    const { navigate } = this.props.navigation;
    navigate('ComicInfo', { name: _name });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});