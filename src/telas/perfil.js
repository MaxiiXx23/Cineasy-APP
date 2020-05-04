import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, View, StyleSheet, ImageBackground, TouchableHighlight, AsyncStorage, Button, ScrollView, ToastAndroid } from 'react-native';
import { Container, Thumbnail, Text, } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ip from '../components/ip';
export default class Perfil extends Component {
  static navigationOptions = {
    drawerLabel: 'Perfil',

  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      fotoUser: '',
      frase: '',
      capaUser: ''
    }
  }
  async componentDidMount() {
    this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
      this.loadRepositories();
    })
  }
  componentWillUnmount() {
    this.willBlurListener.remove();
}
  loadRepositories = async () => {
    const id = await AsyncStorage.getItem('idUsuario');
    //console.log(id)
    const api = ip;
    return fetch('http://' + api + ':3000/usuarios/dados/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          text: responseJson[0].nome,
          fotoUser: responseJson[0].fotoUser,
          frase: responseJson[0].frase,
          capaUser: responseJson[0].capaUser

        }, function () {

        });
        //console.log(this.state.dataSource[0].nome)
      })
      .catch((error) => {
        //console.error(error);
        ToastAndroid.showWithGravity(
          'Falha na conexão.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    const api = ip;
    return (
      <>
        <Container style={{ backgroundColor: '#191919' }}>
          <View>
            <ImageBackground source={{ uri: 'http://' + api + ':3000/fotoperfil/' + this.state.capaUser }} style={[perfil2.capa]}>
            </ImageBackground>
            <Thumbnail source={{ uri: 'http://' + api + ':3000/fotoperfil/' + this.state.fotoUser }} style={[perfil2.foto]} />
            <View>
              <Text style={[perfil2.info]}>
                {this.state.text}
              </Text>
              <Text style={[perfil2.frase]}> {this.state.frase}</Text>
            </View>
          </View>
          <Grid style={{ marginTop: 45 }}>
            <ScrollView>
              <Row size={75}>
                <Col style={perfil2.blocoNoft}>
                  <Icon name="notifications" size={40} style={perfil2.notificacao} />
                  <Text style={perfil2.TextNotf}>Pré-venda de Viuva-Negra já disponível!</Text>
                </Col>
              </Row>
              <Row size={75}>
                <Col style={perfil2.bloco} onPress={() => this.props.navigation.navigate('amigos')}>
                  <Icon name="people" size={80} style={perfil2.icons} />
                  <Text style={perfil2.text}>Amigos</Text>
                </Col>
                <Col style={perfil2.bloco1}>
                  <Icon name="local-activity" size={80} style={perfil2.icons} />
                  <Text style={perfil2.text}>Descontos</Text>
                </Col>
              </Row>
              <Row size={100}>
                <Col style={perfil2.bloco}>
                  <Icon name="star" size={80} style={perfil2.icons} />
                  <Text style={perfil2.text}>Seguindo</Text>
                </Col>
                <Col style={perfil2.bloco1}>
                  <Icon name="movie-creation" size={80} style={perfil2.icons} />
                  <Text style={perfil2.text}>Assistidos</Text>
                </Col>
              </Row>

            </ScrollView>
          </Grid>
        </Container>
      </>
    );
  }
}


const perfil2 = StyleSheet.create({
  cabecalho: {
    backgroundColor: "#000000"
  },
  cog: {
    color: 'white',
    marginTop: '-5%',
    marginLeft: '90%',
    height: 20,
    width: 30,
    backgroundColor: 'transparent',
  },
  capa: {
    height: 200,
  },
  foto: {
    marginLeft: '42%',
    marginTop: '-35%'

  },
  info: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: '34%'
  },
  frase: {
    color: 'white',
    fontSize: 15,
    marginLeft: '30%',
    width: 300
  },
  addFriend: {
    color: 'white',
    marginLeft: 5,
    marginTop: '-45%',
    height: 20,
    width: 50,
    backgroundColor: 'transparent',
  },
  EspaceCapa: {
    marginTop: 29
  },
  icons: {
    color: '#FFD700',
    marginLeft: '30%',
    marginTop: '30%'
  },
  bloco1: {
    backgroundColor: '#303030',
    height: 200,
    width: 200,
    borderRadius: 15,
    marginLeft: 7,
    marginTop: 3
  },
  bloco: {
    backgroundColor: '#303030',
    height: 200,
    width: 200,
    borderRadius: 15,
    marginTop: 3
  },
  text: {
    color: 'white',
    marginLeft: '30%'
  },
  notificacao: {
    color: '#FFD700',
    marginLeft: '2%',
    marginTop: '2%'
  },
  TextNotf: {
    color: 'white',
    marginLeft: '2%',
    marginTop: '10%',
    textAlign: 'center'
  },
  blocoNoft: {
    backgroundColor: '#303030',
    height: 200,
    width: 400,
    borderRadius: 15,
    marginTop: 3,
    marginLeft: 5
  }



});