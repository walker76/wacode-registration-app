import React from 'react';
import { StyleSheet, Button } from 'react-native';
import MapView from 'react-native-web-maps';
import GallerySwiper from 'react-native-gallery-swiper';

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
          <GallerySwiper
              images={[
                { source: require("../assets/images/FullSizeRender.jpeg"),
                  width: 828,
                  height: 1450 },
              ]}
          />
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