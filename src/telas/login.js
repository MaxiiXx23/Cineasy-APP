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
      fetch(`${api}/usuarios/updatepass`, {
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
      fetch( api + '/usuarios/login', {
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
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ImageBackground source={require('../assets/LoginDarkBasePng.png')} style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.ContainerLogar}>
            <View style={styles.ContainerImg}>
            </View>
            <View style={
              styles.ContainerInputs}>
              <TextInput style={styles.Inputs} keyboardType='email-address'
                placeholder="Email"
                onChangeText={TextInputEmail => this.setState({ TextInputEmail })}
                placeholderTextColor="black"
              />
              <TextInput style={styles.Inputs} secureTextEntry={true}
                placeholder="Senha"
                onChangeText={TextInputSenha => this.setState({ TextInputSenha })}
                placeholderTextColor="black"
              />
              <View style={styles.ContainerEsqueceu}>
                <Text style={styles.Esqueceu} onPress={this._recupera}>Esqueceu sua senha?</Text>
              </View>
              <TouchableOpacity style={styles.BtnLogar} onPress={this.InsertDataToServer}>
                <Text style={styles.SubmitText}>
                  Entrar
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BtnCadastrar} onPress={this._signInAsync} >
                <Text style={styles.SubmitText2} >
                  Não tem uma conta ? Cadastra-se
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
    backgroundColor: '#fff',
    borderColor: '#000',
    width: '90%',
    marginTop: 15,
    color: '#000',
    fontSize: 17,
    borderRadius: 4,
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
    borderRadius: 4,
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
  ContainerEsqueceu: {
    width: '90%',
    display: 'flex',
  },
  Esqueceu: {
    color: '#fff',
    marginTop: 5,
    marginBottom: 15,
    textAlign: "right"
  }
});