import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage, StatusBar, KeyboardAvoidingView, Image, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import ip from '../components/ip';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TextInputEmail: '',
      TextInputSenha: '',
      icon: "eye-off"

    };

  }
  // tela de cadastro 
  _signInAsync = async () => {
    this.props.navigation.navigate('SignUp');
  };
  // Redefinir senha
  _recupera = async () => {
    if (this.state.TextInputEmail == "") {
      ToastAndroid.showWithGravity(
        'Coloque seu email no Campo de email, para poder solicitar uma redefinição de senha',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      const api = ip;
      const email = this.state.TextInputEmail
      fetch(`http://${api}:3000/usuarios/updatepass`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.TextInputEmail,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)

        })
        .catch((error) => {
          ToastAndroid.showWithGravity(
            'Falha ao solicitar redefinição.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        });
      ToastAndroid.showWithGravity(
        'Nova senha enviada para o email: ' + email,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }

  }
  //login
  InsertDataToServer = async () => {
    if (this.state.TextInputEmail == "" && this.state.TextInputSenha == "") {
      ToastAndroid.showWithGravity(
        'Campos Vazios, por favor preencha-os.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (this.state.TextInputSenha == "") {
      ToastAndroid.showWithGravity(
        'Campo Senha vazio, por favor preencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (this.state.TextInputEmail == "") {
      ToastAndroid.showWithGravity(
        'Campo Email vazio, por favor preencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      const api = ip;
      fetch('http://' + api + ':3000/usuarios/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.TextInputEmail,
          senha: this.state.TextInputSenha
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if (responseJson.mensagem == 'Falha na autenticação') {
            ToastAndroid.showWithGravity(
              'Email ou Senha incorretos, tente novamente.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          } else {
            let result = responseJson.token;
            this.setState({ Token: result });
            this.setState({ idUsuario: responseJson.id })
            AsyncStorage.multiSet([['userToken', JSON.stringify(responseJson.token)], ['idUsuario', JSON.stringify(responseJson.id)]]);
            this.props.navigation.navigate('App');
          }
        })
    }
  }
  _MudaIcon() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }

  render() {

    return (
      <>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <ImageBackground source={require('../assets/LoginDarkBasePng.png')} style={{ width: '100%', height: '100%' }}>
          <KeyboardAvoidingView style={styles.ContainerLogar}>
            <View style={styles.ContainerImg}>
            </View>
            <View style={
              styles.ContainerInputs}>
              <View style={styles.searchSection}>
                <Icon name="person" size={30} color="#FFD700" />
                <TextInput style={styles.Inputs} keyboardType='email-address'
                  placeholder="E-mail:"
                  onChangeText={TextInputEmail => this.setState({ TextInputEmail })}
                />
              </View>
              <View style={
                styles.searchSection}>
                <Icon name="lock" size={30} color="#FFD700" />
                <TextInput style={styles.Inputs} secureTextEntry={true}
                  placeholder="Senha:"
                  onChangeText={TextInputSenha => this.setState({ TextInputSenha })}
                />
              </View>
              <Text style={styles.Esqueceu} onPress={this._recupera}>Esqueceu sua senha?</Text>
              <TouchableOpacity style={styles.BtnLogar} onPress={this.InsertDataToServer}>
                <Text style={styles.SubmitText}>
                  Entrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BtnCadastrar} onPress={this._signInAsync} >
                <Text style={styles.SubmitText2} >
                  Cadastrar-se
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>

      </>
    );
  }
}



const styles = StyleSheet.create({
  ContainerLogar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo: {
    alignItems: 'center',
    marginTop: '6.5%'
  },
  ContainerImg: {
    flex: 1,
    alignItems: 'center',
  },
  ContainerInputs: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  Inputs: {
    backgroundColor: '#303030',
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
    width: '90%',
    marginBottom: 15,
    color: '#fff',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  Slogan: {
    color: '#FFD700',
    fontSize: 18,
    marginTop: '90%',
    alignItems: 'center',
    opacity: 0.8
  },
  BtnLogar: {
    backgroundColor: '#FFD700',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 2
  },
  SubmitText: {
    color: 'black',
    fontSize: 18
  },
  SubmitText2: {
    color: '#FFD700',
    fontSize: 18
  },
  BtnCadastrar: {
    marginTop: 10,
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',

  },
  Esqueceu: {
    color: '#FFD700',
    marginBottom: 7,
    marginLeft: '45%'

  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});