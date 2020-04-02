import React, { Component } from 'react';
import { View, Text } from 'react-native';
import YouTube from 'react-native-youtube';

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
        <YouTube
          videoId="adkmIMpHyfU" // The YouTube video ID
          apiKey="AIzaSyANHo2FO1TIvJX49TJT_CYjmZWFFt3XMNk"
          play={true}
          fullscreen={true}
          style={{ alignSelf: 'stretch', height: 300 }}
        />
      </View>
    );
  }
}
