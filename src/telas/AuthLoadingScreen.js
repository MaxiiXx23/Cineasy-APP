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
      const idUsuario = response[1][1]
      const userToken = response[0][1]
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    })

  };

  render() {
    return (
      <View style={{ backgroundColor: "#000000", justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#FFFF00" style={{ justifyContent: 'center', alignItems: 'center' }} />
        <StatusBar barStyle="default" />

      </View>
    );
  }
}