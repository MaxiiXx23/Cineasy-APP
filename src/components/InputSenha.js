import React, { Component } from 'react';
import { View, Text,TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class InputSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _MudaIcon() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }
  render() {
    return (
      <View style={{borderBottomWidth:1,flexDirection:'row'}}>
        <TextInput {...this.props}
            secureTextEntry={this.state.secureTextEntry}
        />
        <TouchableOpacity></TouchableOpacity>
      </View>
    );
  }
}
