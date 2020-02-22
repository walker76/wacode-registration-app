import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PostConfirmationScreen from '../screens/PostConfirmationScreen';
//import ComicSeriesScreen from '../screens/ComicSeriesScreen';
//import ComicInfoScreen from '../screens/ComicInfoScreen';
import PostScreen from '../screens/PostScreen';
import JobMapScreen from '../screens/JobMapScreen';
import FindJobInfoScreen from '../screens/FindJobInfo';
import JobInfoPage from '../screens/JobInfoPage';

/*
const ComicSeriesStack = createStackNavigator({
  ComicSeries: ComicSeriesScreen,
  ComicInfo: ComicInfoScreen
})

ComicSeriesStack.navigationOptions = {
  tabBarLabel: 'Series',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};*/

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-home' : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  JobInfo: FindJobInfoScreen,
  JobDetails: JobInfoPage,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Find Jobs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-construct' : 'md-construct'}
    />
  ),
};

const MapsStack = createStackNavigator({
  AllMaps: JobMapScreen,
});

MapsStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
    />
  ),
};

const PostStack = createStackNavigator({
  PostScreen: PostScreen,
  PostConfirmation: PostConfirmationScreen
})

PostStack.navigationOptions = {
  tabBarLabel: 'Post Job',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  //ComicSeriesStack,
  LinksStack,
  MapsStack,
  PostStack,
  SettingsStack,
});
