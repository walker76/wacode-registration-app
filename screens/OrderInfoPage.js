import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Tile } from 'react-native-elements';

class OrderInfoPage extends React.Component {

  static navigationOptions = {
    title: 'Details',
  };

  constructor(props){
    super(props);
    const {state} = props.navigation;

    this.state = {
      id: state.params.id,
      job: [],
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

    console.log(this.state.id);
    fetch('https://wacode-2020.herokuapp.com/orders/findById/' + this.state.id)
    .then(response => {
      return response.json();
    }).then(responseJSON => {
      this.setState({ job: responseJSON }, () => console.log("State", this.state))
    }).catch(err => {
      console.err("There was an error");
      console.error(err);
    });
  }

    onPress = () => {

      AsyncStorage.getItem('@Store:id')
      .then(res => {

        updateRequest = {
          id: this.state.id,
          status: "ACCEPTED",
          workerId: email,
        }
  
        fetch('https://wacode-2020.herokuapp.com/orders/findById/updateOrderStatus/', {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateRequest),
        });

      })
      .catch(err => {
        console.error(err);
      });

      this.props.navigation.navigate('FindOrders');
  }

  render() {
    const list = this.state.data;
    let buttonAccept = (<View></View>);

    if(this.state.job !== undefined && this.state.job.type === "PENDING"){
      buttonAccept = (
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onPress}>
          <Text style={{fontWeight: '300'}}>
            <Text style={{fontSize: 25}}>
              Accept
            </Text>
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' }}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Tile imageSrc={require('../assets/images/help.jpeg')}/>
          <View style={styles.container}>
            <Text style={styles.textInput}>Job Title: {this.state.job.title}{"\n"}</Text>
            <Text style={styles.textInput}>Job Description: {this.state.job.description}{"\n"}</Text>
            <Text style={styles.textInput}>Job Type: {this.state.job.type}{"\n"}</Text>
          </View>
          <TouchableOpacity style={styles.buttonContainer}
            onPress={this.onPress}>
            <Text style={{fontWeight: '300'}}>
              <Text style={{fontSize: 25}}>
                Accept
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5cf441',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  textInput: {
    fontSize: 20,
    color: 'black',
  },
  contentContainer: {
    paddingTop: 30,
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
});

export default OrderInfoPage;
