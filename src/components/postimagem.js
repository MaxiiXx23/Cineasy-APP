import React, { Component } from 'react';
import { ScrollView, View, Image, StyleSheet, ToastAndroid } from 'react-native';
import { Container, Header, Button, Left, Body, Title, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GallerySwiper from "react-native-gallery-swiper";
import ip from '../components/ip'
export default class Postimagem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NomeFantasia: 'Cinepólis',
      note: '',
      img_post: 'fundoblack.jpg',
      tipo_file: '',
      data_post: ''
    };
  }
  async componentDidMount() {
    this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
      this.loadRepositories();
    })
  }
  async componentWillUnmount() {
    this.willBlurListener.remove();
  }
  loadRepositories = async () => {
    const { navigation } = this.props;
    const id_post = navigation.getParam('itemId', 'NO-ID');
    const api = ip;
    return fetch(api + '/posts/post/' + id_post)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].img_post)
        this.setState({
          note: responseJson[0].note,
          img_post: responseJson[0].img_post,
          tipo_file: responseJson[0].tipo_file,
          data_post: responseJson[0].data_post,
          qntLikes: responseJson[0].qntLikes
        });
      })
      .catch((error) => {
        ToastAndroid.showWithGravity(
          'Falha na conexão.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
  }
  render() {
    const api = ip
    return (
      <Container>
        <Header androidStatusBarColor="#191919" style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' size={25} color='white' onPress={() => this.props.navigation.goBack()} />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.NomeFantasia}</Title>
          </Body>
        </Header>
        <GallerySwiper
          images={[
            { uri: api + "/posts/"+this.state.img_post },

          ]}
        />
        <Text style={styles.Describe}>{this.state.note}</Text>
        <Text style={styles.Data}>{this.state.data_post}</Text>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#303030",
  },
  header: {
    backgroundColor: "#303030",
  },
  Describe: {
    backgroundColor: 'black',
    color: 'white'
  },
  Data: {
    backgroundColor: 'black',
    color: 'white',
    fontSize:10,
    fontWeight:'200'
  }
})