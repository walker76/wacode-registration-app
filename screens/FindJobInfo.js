import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

class FindJobInfoScreen extends React.Component {

  static navigationOptions = {
    title: 'Find Jobs',
  };

  constructor(props){
    super(props);
    const {state} = props.navigation;

    this.state = {
      name: state.params.name,
      data: [],
    }
  }

  componentDidMount(){
    fetch('https://wacode-hackathon-api.herokuapp.com/job/findByJobType/' + this.state.name.toUpperCase())
    .then(response => {
      return response.json();
    }).then(responseJSON => {
      this.setState({ data: responseJSON }, () => console.log("State", this.state))
    }).catch(err => {
      console.err("There was an error");
      console.error(err);
    });
  }

  render() {
      const list = this.state.data;

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
    const { navigate } = this.props.navigation;
    navigate('JobDetails',{ id: _id });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  }
});

export default FindJobInfoScreen;
