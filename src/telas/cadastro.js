import React, { Component } from 'react';
import { View, Text, ImageBackground, Button, StatusBar, CheckBox, TouchableOpacity, KeyboardAvoidingView, Image, TextInput, StyleSheet, Picker } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default class cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputSenha2: '',
      TextInputUserName: '',
      TextInputNome: '',
      nome: '',
      language: '',
      text: '',
      cpf: '',
      international: '',
      value: '',
      checked: false,
      TextInputEmail: '',
      TextInputSenha: '',
      dados: {
        Logradouro: '',
        bairro: '',
        localidade: '',
        uf: ''
      },
      cep: ''
    };
    Cep = () => {
      console.log('olá mundo');
    }
    InsertDados = () => {
      fetch('http://192.168.11.4:3000/cadastro', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.TextInputEmail,
          senha: this.state.TextInputSenha,
        }),
      });

    }
  }

  render() {
    const { checked } = this.state;
    return (
      <>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <ImageBackground source={require('../assets/backlogo.jpg')} style={{ width: '100%', height: '100%' }}>
          <KeyboardAvoidingView style={styles.ContainerLogar}>
            <View style={styles.ContainerImg}>
            </View>
            <View style={
              styles.ContainerInputs}>
              <TextInput style={styles.Inputs}
                placeholder="Nome:"
                onChangeText={TextInputNome => this.setState({ TextInputNome })}
              />
              <TextInput style={styles.Inputs}
                placeholder="UserName:"
                onChangeText={TextInputUserName => this.setState({ TextInputUserName })}
              />
              <TextInputMask style={styles.Inputs}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={this.state.international}
                placeholder="Telefone"
                onChangeText={text => {
                  this.setState({
                    international: text
                  })
                }}
              />
              <TextInput style={styles.Inputs} keyboardType='email-address'
                placeholder="E-mail:"
                onChangeText={TextInputEmail => this.setState({ TextInputEmail })}
              />
              <TextInput style={styles.Inputs} secureTextEntry={true}
                placeholder="Senha:"
                onChangeText={TextInputSenha => this.setState({ TextInputSenha })}
              />
              <TextInput style={styles.Inputs} secureTextEntry={true}
                placeholder="Confirmar senha:"
                onChangeText={TextInputSenha2 => this.setState({ TextInputSenha2 })}
              />
              <TouchableOpacity style={styles.BtnLogar} onPress={this.InsertDataToServer}>
                <Text style={styles.SubmitText}>
                  Cadastrar
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>

      </>
    );
  }
}

//<Button style={styles.BtnCadastrar} onPress={this.InsertDados}><Text style={{ color: '#FFFFFF' }}>Cadastrar</Text></Button>

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
    height:'43.5%'
  },
  ContainerInputs: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  Inputs: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomColor: '#000000',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 25,
    padding: 10,
    paddingLeft: 20,
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
