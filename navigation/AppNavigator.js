import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

// import the different screens
import Loading from '../screens/Loading'
import SignUp from '../screens/SignUp'
import Login from '../screens/Login'

export default createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main: MainTabNavigator
  },
  {
    initialRouteName: 'Loading'
  }
));