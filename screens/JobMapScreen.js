import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class JobMapScreen extends React.Component {

    state = { mapRegion: {
        latitude: 31.5497,
        longitude: -97.1143,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03 },
        data: [],
        locationResult: null,
        location: { coords: {
            latitude: 31.5497,
            longitude: -97.1143,}}
    };

    componentDidMount() {
      this._getLocationAsync();
        
      fetch('https://wacode-hackathon-api.herokuapp.com/job/all')
      .then(response => {
        return response.json();
      }).then(responseJSON => {
        this.setState({ job: responseJSON }, () => console.log("State", this.state))
      }).catch(err => {
        console.err("There was an error");
        console.error(err);
      });
    }
    
    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if( status !== 'granted') {
            this.setState({ 
                locationResult: 'Location permission was denied!', location, });
        }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({locationResult: JSON.stringify(location), location, });
    };

  static navigationOptions = {
    title: 'Map',
  };


  render() {
    const list = this.state.data;

    let content;

    if(this.state.job !== undefined && this.state.job.length > 0){

      console.log(this.state.job);

      content = this.state.job.map((item, i) => {
        console.log(item);
        return (
          <MapView.Marker
            key={i}
            coordinate={{
              latitude: item.lat,
              longitude: item.lang,
            }}
            title={item.title}
            description={item.description}
          />
        );
      })
    }

    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        >

        {content}
          
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});