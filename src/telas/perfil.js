import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, View, StyleSheet, ImageBackground, TouchableHighlight,StatusBar,TouchableOpacity, AsyncStorage, Button, ScrollView, ToastAndroid } from 'react-native';
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
      nome: '',
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
    return fetch(api + '/usuarios/dados/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          nome: responseJson[0].nome,
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
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Container style={{ backgroundColor: '#191919' }}>
          <ImageBackground
            source={{ uri: api +'/fotoperfil/' + this.state.capaUser }}
            style={[perfil2.capa]}
          >
          </ImageBackground>
          <View style={perfil2.main}>
            <Image
              source={{ uri: api + '/fotoperfil/' + this.state.fotoUser }}
              style={[perfil2.foto]} />
            <View>
              <Text style={perfil2.nome}>{this.state.nome}</Text>
              <Text style={perfil2.frase}>{this.state.frase}</Text>
            </View>
          </View>

          <ScrollView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('notificacao')}
            >
              <View style={perfil2.cardFull}>
                <Icon name="notifications" size={40} color="#FFD700" />
                <Text style={[perfil2.TextNotf, { marginTop: "5%" }]} >#FiqueEmCasa</Text>
              </View>
            </TouchableOpacity>

            <Row size={100} style={perfil2.cardRow}>
              <TouchableOpacity
                style={perfil2.cardMiddle}
                onPress={() => this.props.navigation.navigate('amigos')}
              >
                <View>
                  <Icon name="people" size={80} color="#FFD700" style={perfil2.IconCardMiddle} />
                  <Text style={perfil2.TextNotf}>Amigos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={perfil2.cardMiddle}
                onPress={() => { }}
              >
                <View>
                  <Icon name="local-activity" size={80} color="#FFD700" style={perfil2.IconCardMiddle} />
                  <Text style={perfil2.TextNotf}>Ingressos</Text>
                </View>
              </TouchableOpacity>
            </Row>

            <Row size={100} style={perfil2.cardRow}>
              <TouchableOpacity style={perfil2.cardMiddle} onPress={() => this.props.navigation.navigate('abaSeguindo')}>
                <View>
                  <Icon name="star" size={80} color="#FFD700" style={perfil2.IconCardMiddle} />
                  <Text style={perfil2.TextNotf}>Seguindo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={perfil2.cardMiddle} onPress={() => { }}>
                <View>
                  <Icon name="movie-creation" size={80} color="#FFD700" style={perfil2.IconCardMiddle} />
                  <Text style={perfil2.TextNotf}>Assistidos</Text>
                </View>
              </TouchableOpacity>
            </Row>

          </ScrollView>
        </Container>
      </>
    );
  }
}


const perfil2 = StyleSheet.create({
  main: {
    display: "flex",
    alignItems: "center"
  },
  capa: {
    height: 250,
  },
  foto: {
    position: "relative",
    height: 80,
    width: 80,
    borderRadius: 4,
    marginTop: -40
  },
  nome: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
    textAlign:'center',
    marginBottom: 10,
  },
  frase: {
    color: 'white',
    fontSize: 15,
    textAlign:'center',
    marginBottom: 20,
  },
  cardFull: {
    color: 'white',
    height: 150,
    backgroundColor: '#303030',
    padding: 10,
    borderRadius: 4,
    margin: 15
  },
  cardRow: {
    color: 'white',
    height: 150,
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  cardMiddle: {
    color: 'white',
    height: 150,
    width: "48%",
    backgroundColor: '#303030',
    padding: 10,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  IconCardMiddle: {
    paddingBottom: 0
  },
  TextNotf: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  }
});