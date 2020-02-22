import React from 'react';
import { StyleSheet, Button } from 'react-native';
import MapView from 'react-native-web-maps';

export default class MapScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state ={
      tabTitle: ''
    };
    this.toTakenSurveys = this.toTakenSurveys.bind(this);
  }

  getInitialState() {
    return {
      region: {
        latitude: 31.5497,
        longitude: -97.1143,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
    };
  }
   
  onRegionChange(region) {
    // this.setState({ region });
  }
   
  // When tab is pressed go to corresponding page
  toTakenSurveys(){
    console.log("yikes");
    this.props.navigation.navigate('Home');
    console.log("yikes 2");
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: 31.5497,
          longitude: -97.1143,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 31.5467,
            longitude: -97.1043
          }}
          title={"Sample Mission #1"}
          description={"Sample Description"}
          pinColor='green'
        >
        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 31.5487,
            longitude: -97.1143
          }}
          title={"Sample Mission #2"}
          description={"Sample Description"}
          pinColor='yellow'
        >
        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 31.5507,
            longitude: -97.1243
          }}
          title={"Sample Mission #3"}
          description={"Sample Description"}
          pinColor='red'
        >
        </MapView.Marker>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutThatRedirects: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
});