import React, { Component } from 'react';
import { View, Text, ImageBackground, ToastAndroid, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import ip from '../components/ip';
export default class cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputSenha2: '',
      TextInputNome: '',
      nome: '',
      text: '',
      international: '',
      value: '',
      checked: false,
      TextInputEmail: '',
      TextInputSenha: '',
    };
  }
  _test = async () => {
    if (this.state.TextInputEmail == "" && this.state.TextInputSenha == "") {
      ToastAndroid.showWithGravity(
        'Campos Vazios, por favor preencha-os.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  }
  _login = async () => {
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
        let result = responseJson.token;
        this.setState({ Token: result });
        this.setState({ idUsuario: responseJson.id })
        AsyncStorage.multiSet([['userToken', JSON.stringify(responseJson.token)], ['idUsuario', JSON.stringify(responseJson.id)]]);
      })
    this.props.navigation.navigate('App');
  }
  _InsertDados = async () => {
    const nome = this.state.TextInputNome
    const email = this.state.TextInputEmail
    const senha = this.state.TextInputSenha
    const senha2 = this.state.TextInputSenha2
    const phone = this.state.international
    const QntdNum = phone.length
    const QntdSenha = senha.length
    //console.log(QntdNum)
    if (nome == "" && email == "" && senha == "" && senha2 == "" && phone == "") {
      ToastAndroid.showWithGravity(
        'Campos Vazios, por favor preencha-os.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (nome == "") {
      ToastAndroid.showWithGravity(
        'Campo Nome vazio, por favor preencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (phone == "") {
      ToastAndroid.showWithGravity(
        'Campo Telefone vazio, por favor preencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (QntdNum < 14) {
      ToastAndroid.showWithGravity(
        'Número de telefone inválido',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (email == "") {
      ToastAndroid.showWithGravity(
        'Campo Email vazio, por favor preencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (senha == "") {
      ToastAndroid.showWithGravity(
        'Campo Senha vazio, por favor preencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (senha2 == "") {
      ToastAndroid.showWithGravity(
        'Campo Confirmar senha vazio, por favor preencha-o.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      const explode1 = phone.split('(')
      const phone2 = explode1[1]
      const explode2 = phone2.split(')')
      const dd = explode2[0]
      const phone3 = explode2[1]
      const explode3 = phone3.split('-');
      const firstPart = explode3[0].split(' ');
      const secondPart = explode3[1]
      const PhoneValidado = 55 + dd + firstPart + secondPart
      const api = ip
      fetch(`http://${api}:3000/usuarios/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.TextInputEmail,
          nome: this.state.TextInputNome,
          telefone: PhoneValidado,
          senha: this.state.TextInputSenha
        }),
      }).then((response) => response.json()).then((responseJon) => {
        if (responseJon.mensagem == "error validator") {
          const error = responseJon.ErrValidator[0].MsgError
          console.log(responseJon)
          if (error == "Email inválido") {
            ToastAndroid.showWithGravity(
              'Email inválido, por favor corrija e tente novamente.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          } else if (error == "Número inválido") {
            ToastAndroid.showWithGravity(
              'Formato telefone inválido, por favor corrija e tente novamente.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          } else {
            ToastAndroid.showWithGravity(
              'Senha muito pequena. Ela deve ter entre  8 à 14 caracteres.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          }
        } else {
          this._login()
        }
      })
        .catch((error) => {
          console.log(error)

        });

    }
  }
  render() {
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
              <TextInputMask style={styles.Inputs}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(11)',
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
              <TouchableOpacity style={styles.BtnLogar} onPress={this._InsertDados}>
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
    height: '43.5%'
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
