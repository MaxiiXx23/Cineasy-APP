import React,{Component}from 'react';
import { FlatList, Image, ActivityIndicator, Text, View, Dimensions, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, ToastAndroid } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Thumbnail, Left, Body, Right } from 'native-base';

export default class Postimagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View></View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#000000'
    },
    card: {
      borderRadius: 20,
      backgroundColor: "#303030",
      borderColor: "#303030"
    },
    btnLike: {
      height: 40,
      width: 60
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      borderRadius: 2,
    },
    btnIcon: {
      height: 50,
      width: 35,
      marginTop: 5
    },
    btnIcon2: {
      height: 50,
      width: 35,
      marginTop: 23
  
    }
  })