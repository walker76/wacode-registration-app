import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Tile } from 'react-native-elements';
import axios from 'axios';

class OrderInfoPage extends React.Component {

  static navigationOptions = {
    title: 'Details',
  };

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      id: this.props.route.params.id,
      job: [],
    }
  }

  componentDidMount(){
    fetch('https://wacode-2020.herokuapp.com/orders/findByOrderId/' + this.state.id)
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
      const updateRequest = {
        id: this.state.id,
        status: "ACCEPTED",
        workerId: 131849,
      }

      axios.put('https://wacode-2020.herokuapp.com/orders/updateOrderStatus/', updateRequest)
      .then(response => {
        console.log(response.data);
        if(response.data !== undefined && response.data !== null){
          console.log('setting state');
          this.setState({
            orders: response.data,
          });
        }
      })
      .then(() => {
        this.props.navigation.navigate('Root', {refresh: true});
      })
      .catch(err => {
        console.error(err);
      });
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
          <View style={styles.container}>
            <Text style={styles.textInput}>Order Customer: {this.state.job.title}{"\n"}</Text>
            <Text style={styles.textInput}>Order Address: {this.state.job.description}{"\n"}</Text>
            <Text style={styles.textInput}>Order Type: {this.state.job.status}{"\n"}</Text>
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
