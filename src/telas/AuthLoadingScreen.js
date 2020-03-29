import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    AsyncStorage.multiGet(["userToken", "idUsuario"]).then(response => {
      //console.log(response[0][0]) // Key1
      //console.log(response[0][1]) // Value1
      //console.log(response[1][0]) // Key2
      //console.log(response[1][1]) // Value2
      const idUsuario = response[1][1]
      const userToken = response[0][1]
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    })
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ backgroundColor: "#000000", justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#FFFF00" style={{ justifyContent: 'center', alignItems: 'center' }} />
        <StatusBar barStyle="default" />

      </View>
    );
  }
}