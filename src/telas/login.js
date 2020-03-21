import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage, StatusBar, KeyboardAvoidingView, Image, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import ip from '../components/ip';

export default class login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TextInputEmail: '',
      TextInputSenha: '',
      icon: "eye-off"

    };

  }
  // login 
  _signInAsync = async () => {
    this.props.navigation.navigate('SignUp');
  };
  //inserir dados
  InsertDataToServer = async () => {
    if (this.state.TextInputEmail == "" && this.state.TextInputSenha == "") {
      ToastAndroid.showWithGravity(
        'Campos Vazios, por favor reencha-os.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (this.state.TextInputSenha == "") {
      ToastAndroid.showWithGravity(
        'Campo Senha vazio, por favor reencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (this.state.TextInputEmail == "") {
      ToastAndroid.showWithGravity(
        'Campo Email vazio, por favor reencha-o.',
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
          }
          let result = responseJson.token;
          this.setState({ Token: result });
          //console.log(this.state.Token);
        })
      await AsyncStorage.setItem('userToken', this.state.Token);
      this.props.navigation.navigate('App');
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
              <TextInput style={styles.Inputs} keyboardType='email-address'
                placeholder="E-mail:"
                onChangeText={TextInputEmail => this.setState({ TextInputEmail })}
              />
              <TextInput style={styles.Inputs} secureTextEntry={true}
                placeholder="Senha:"
                onChangeText={TextInputSenha => this.setState({ TextInputSenha })}
              />
              <Text style={styles.Esqueceu}>Esqueceu sua senha?</Text>
              <TouchableOpacity style={styles.BtnLogar} onPress={this.InsertDataToServer}>
                <Text style={styles.SubmitText}>
                  Entrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BtnCadastrar} onPress={this._signInAsync} >
                <Text style={styles.SubmitText} >
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
  BtnCadastrar: {
    marginTop: 10,
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',

  },
  Esqueceu: {
    color: 'black',
    marginBottom: 3,
    marginLeft: '45%'
  }
});