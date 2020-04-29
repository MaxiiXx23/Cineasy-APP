import React from 'react';
import { StyleSheet, Text, ImageBackground, View, TouchableHighlight, Image, ToastAndroid, AsyncStorage, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { Container, Thumbnail, Label, Content, Form, Item, Input } from 'native-base';
import ip from '../components/ip';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class EditarPerfil extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Editar Perfil'
  };
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      frase: '',
      value: '',
      international: '',
      text: '',
      uriCelular: 'https://i1.wp.com/animasso.com.br/wp-content/uploads/2018/05/saitama-ok-aficionados-0.jpg?resize=600%2C384'
    };
  }
  // component para puxar os dados ao entrar na tela
  async componentDidMount() {
    this._loadDados();
  }
  //loadDados 
  _loadDados = async () => {
    const id = await AsyncStorage.getItem('idUsuario');
    //console.log(id)
    const api = ip;
    return fetch('http://' + api + ':3000/usuarios/dados/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          nome: responseJson[0].nome,
          fotoUser: responseJson[0].fotoUser,
          frase: responseJson[0].frase,
          capaUser: responseJson[0].capaUser,
          telefone: responseJson[0].telefone

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
  //função para editar dados
  _editar = async () =>{
    const id = await AsyncStorage.getItem('idUsuario');
    const api = ip
    if(this.state.TextInputNome==""){
      const nome = this.state.nome;
      this.setState({
        TextInputNome: nome
      })
    }else{
      const config = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: this.state.TextInputNome,
          frase: this.state.TextInputFrase,
  
        }),
      };
      fetch('http://' + api + ':3000/usuarios/editadados/' + id,config)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.mensagem == 'Ok') {
          ToastAndroid.showWithGravity(
            'Dados Atualizados com sucesso.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          this._loadDados();
        } else {
          ToastAndroid.showWithGravity(
            'Dados não atualizados.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      })
    }
  }
  _verificaeditar = async () =>{
    if(this.state.TextInputNome==""){
      const frase = this.state.frase;
      const nome = this.state.nome;
      this.setState({
        TextInputFrase: frase,
        TextInputNome: nome
      })
      this._editar();
      ToastAndroid.showWithGravity(
        'Seu nome não pode ser vázio.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }else if(this.state.TextInputFrase==""){
      const frase = this.state.frase;
      const nome = this.state.nome;
      this.setState({
        TextInputFrase: frase,
        TextInputNome: nome
      })
      this._editar();
    }else{
      this._editar();
    }
  }
  //função que escolhe a foto de capa
  _Escolhecapa = async () => {
    var options = {
      title: 'Selecione uma imagem',
      customButtons: [
      ],
      takePhotoButtonTitle: 'Tirar um foto pela Câmera',
      chooseFromLibraryButtonTitle: 'Selecionar uma foto da galeria',
      cancelButtonTitle: 'Cancelar',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {


      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

      } else {
        let source = response;
        this.setState({
          filePath: source,
          uriCelular: source.uri
        });
        this._uploadCapa();
        //console.log(this.state.filePath)
      }
    });

  };
  _uploadCapa = async () => {
    const id = await AsyncStorage.getItem('idUsuario');
    const api = ip
    const dadosImg = this.state.filePath
    const data = new FormData();
    data.append('fileCapa', {
      uri: dadosImg.uri,
      type: dadosImg.type,
      name: dadosImg.fileName,
    });
    const config = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,

    };
    fetch('http://' + api + ':3000/usuarios/uploadcapa/' + id, config)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.mensagem == 'Ok') {
          this._loadDados();
          ToastAndroid.showWithGravity(
            'Uplaod efetuado com sucesso',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        } else {
          ToastAndroid.showWithGravity(
            'Uplaod nao efetuado',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      })
  }
  // função para chamar a tirar foto ou selecionar imagem do celular
  _EscolheImg = async () => {
    var options = {
      title: 'Selecione uma imagem',
      customButtons: [
      ],
      takePhotoButtonTitle: 'Tirar um foto pela Câmera',
      chooseFromLibraryButtonTitle: 'Selecionar uma foto da galeria',
      cancelButtonTitle: 'Cancelar',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {


      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

      } else {
        let source = response;
        this.setState({
          filePath: source,
          uriCelular: source.uri
        });
        this._uploadImg();
        //console.log(this.state.filePath)
      }
    });

  };
  //função para upload de imagem
  _uploadImg = async () => {
    const id = await AsyncStorage.getItem('idUsuario');
    const api = ip
    const dadosImg = this.state.filePath
    const data = new FormData();
    data.append('fileData', {
      uri: dadosImg.uri,
      type: dadosImg.type,
      name: dadosImg.fileName,
    });
    const config = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,

    };
    fetch('http://' + api + ':3000/usuarios/uploadperfil/' + id, config)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.mensagem == 'Ok') {
          this._loadDados();
          ToastAndroid.showWithGravity(
            'Uplaod efetuado com sucesso',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        } else {
          ToastAndroid.showWithGravity(
            'Uplaod nao efetuado',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
        //console.log(this.state.Token);
      })

  }
  render() {
    const api = ip;
    return (
      <Container>
        <KeyboardAvoidingView style={styles.container}>
          <View>
            <View>
              <ImageBackground source={{ uri: 'http://' + api + ':3000/fotoperfil/' + this.state.capaUser }} style={styles.capa}>
                <Icon name="camera-alt" size={30} style={styles.icons2} onPress={this._Escolhecapa} />
              </ImageBackground>
            </View>
            <Thumbnail large source={{ uri: 'http://' + api + ':3000/fotoperfil/' + this.state.fotoUser }} style={styles.img} />
            <Icon name="camera-alt" size={30} style={styles.icons} onPress={this._EscolheImg} />
          </View>
          <ScrollView style={styles.lista}>
            <Text style={styles.text}> Nome </Text>
            <TextInput style={styles.input} defaultValue={this.state.nome}
             onChangeText={TextInputNome => this.setState({ TextInputNome })}/>
            <Text style={styles.text}> Frase </Text>
            <TextInput style={styles.input} defaultValue={this.state.frase} 
             onChangeText={TextInputFrase => this.setState({ TextInputFrase })}/>
            <View style={styles.viewfone}>
              <Text style={styles.text2}> Telefone: </Text>
              <Text style={styles.fone}>{this.state.telefone}</Text>
            </View>
            <TouchableHighlight
              onPress={this._verificaeditar}
              style={styles.btnClickContain}
              underlayColor='black'>
              <View
                style={styles.btnContainer}>
                <Icon
                  name='create'
                  size={35}
                  color='white'
                  style={styles.btnIcon} />
              </View>
            </TouchableHighlight>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  img: {
    marginLeft: '42%',
    marginTop: '-35%'
  },
  item: {
    marginBottom: 15,
  },
  input: {
    color: 'white',
    borderWidth: 1,
    borderBottomColor: '#FFD700',
    marginBottom: 5,
  },
  capa: {
    height: 200,
    width: 410
  },
  text: {
    color: '#FFD700',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  text2: {
    color: '#FFD700',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginTop: '2%'
  },
  fone: {
    color: 'white',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginTop: '2%'
  },
  lista: {
    marginTop: '22%',
    flex: 1
  },
  icons: {
    color: '#FFD700',
    marginTop: -35,
    marginLeft: '57%'
  },
  icons2: {
    color: '#FFD700',
    marginBottom: -60,
    marginTop: 40,
    marginLeft: '85%'
  },
  viewfone: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  btnClickContain: {
    backgroundColor: '#191919',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  btnIcon: {
    height: 50,
    width: 35,
  },

});
