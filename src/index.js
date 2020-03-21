import React, { Component, useState, useEffect } from 'react';
import { Icon } from 'native-base'
import { View, Text, StatusBar, KeyboardAvoidingView, Image, ImageBackground, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
//Navegation para tela de cadastro e tela inicial após login

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import cadastro from './src/telas/cadastro';


 class login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TextInputNome: '',
      TextInputSocial: '',
      icon: "eye-off"

    };

  }
  //inserir dados
  InsertDataToServer = () => {
    fetch('http://192.168.11.4:3000/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.TextInputEmail,
        senha: this.state.TextInputSenha,
        secureTextEntry: true
      }),
    });
    // função para mostrar e ocultar senha


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
        <ImageBackground source={require('./src/assets/backlogo.jpg')} style={{width: '100%', height: '100%'}}>
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
              <TouchableOpacity style={styles.BtnCadastrar} onPress={() => this.props.navigation.navigate('Cadastro')} >
                <Text style={styles.SubmitText} >
                  Cadastrar-se
              </Text>
              </TouchableOpacity>
              <Text>Logado</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>

      </>
    );
  }
}


const RootStack = createStackNavigator(
  {
    ScreenLogin:login,
    Cadastro: cadastro,
  }, {
  headerMode: 'none'
},
  {
    initialRouteName: 'ScreenLogin',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class Tabs extends React.Component {
  render() {
    return <AppContainer />;
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
    borderBottomWidth: 1,
    borderBottomColor:'#000000',
    width: '90%',
    marginBottom: 15,
    color: '#222',
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
  Esqueceu:{
    color:'black',
    marginBottom:3,
    marginLeft:'45%'
  }
});