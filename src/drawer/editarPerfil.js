import React from 'react';
import { StyleSheet, Text, View, Button, Image, ToastAndroid } from 'react-native';
import ip from '../components/ip';
import ImagePicker from 'react-native-image-picker';
export default class EditarPerfil extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Editar Perfil'
  };
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }
  chooseFile = () => {
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
      //console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
        //alert(response.customButton);
      } else {
        let source = response;
        //console.log(source)
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
        // console.log(this.state.filePath)
      }
    });
  };
  _uploadImg = async () => {
    const api = ip
    dadosImg = this.state.filePath
    //console.log(dadosImg)
    const data = new FormData();
    data.append('name', 'avatar');
    data.append('fileData', {
      uri: dadosImg.uri,
      type: dadosImg.type,
      name: dadosImg.fileName
    });
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    fetch('http://' + api + ':3000/posts/upload', config)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.mensagem == 'Ok') {
          ToastAndroid.showWithGravity(
            'Uplaod efetuado com sucesso',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }else{
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
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {/*<Image 
          source={{ uri: this.state.filePath.path}} 
          style={{width: 100, height: 100}} />*/}
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </Text>
          <Button title="Foto" onPress={this.chooseFile.bind(this)} />
          <Button title="Upload" onPress={this._uploadImg} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
