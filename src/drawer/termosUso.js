import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TermosUso extends Component {
    static navigationOptions = {
        drawerLabel: 'Termos Uso'
      };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <View>
        <Text> Termos Uso </Text>
      </View>
    );
  }
}
