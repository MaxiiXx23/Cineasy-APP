import React, { Component } from 'react';
import { Container, Header, Item, Input, Button, Text, Thumbnail } from 'native-base';
import { StyleSheet, ToastAndroid, FlatList, View, TouchableHighlight, Image,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip';
export default class Amigos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInputSearch: '',
            DadosSearch: '',
            show: true,
        };
    }
     componentDidMount() {
        this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
          this._listAmigos();
        })
      }
    _listAmigos = async () => {
        const id = await AsyncStorage.getItem('idUsuario');
        const api = ip;
        return fetch(`http://${api}:3000/usuarios/listaramigos/${id}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({
                        DadosAmigos: responseJson,
                    });
                }).catch((error) => {
                    //console.error(error);
                    ToastAndroid.showWithGravity(
                        'Usuário não encontrado.',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                    );
                });
    }
    _search = (text) => {
        if(text ==""){
            this.setState({ show: true });
        }else{
            this.setState({ show: false });
        }
        this.setState({ TextInputSearch: text })
        let nome = this.state.TextInputSearch
        const api = ip;
        if (!nome == "") {
            return fetch(`http://${api}:3000/usuarios/buscarusuarios/${nome}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({
                        dataSource: responseJson,
                    }, function () {
                    });
                }).catch((error) => {
                    //console.error(error);
                    ToastAndroid.showWithGravity(
                        'Usuário não encontrado.',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                    );
                });
        }
    }
    render() {
        const api = ip;
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#191919" searchBar style={styles.header} rounded>
                    <Item>
                        <Icon name="people" size={30} />
                        <Input placeholder=" Procurar amigos"
                            onChangeText={(TextInputSearch) => this._search(TextInputSearch)}
                            
                        />
                        <Icon name="search" size={30} color='' OnPress />
                    </Item>
                </Header>
                {this.state.show ? (
                    <>
                    <Text style={styles.TextAmigos} >Amigos</Text>
                    <FlatList
                    data={this.state.DadosAmigos}
                    renderItem={({ item }) =>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.navigation.navigate('perfilusuario', {
                                    itemId: item.id_user,
                                    id_amigos: item.id_amigos
                                });
                            }}
                        >
                            <View style={styles.itemList}>
                                <Thumbnail small source={{ uri: 'http://' + api + ':3000/fotoperfil/' + item.fotoUser }} />
                                <Text style={styles.itemText} >{item.nome}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.id_user.toString()}
                /></>
                ) : 
                <>
                <Text style={styles.TextAmigos} >Resultado...</Text>
                <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) =>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.navigation.navigate('perfilusuario', {
                                        itemId: item.id_user,
                                    });
                                }}
                            >
                                <View style={styles.itemList}>
                                    <Thumbnail small source={{ uri: 'http://' + api + ':3000/fotoperfil/' + item.fotouser }} />
                                    <Text style={styles.itemText} >{item.nome}</Text>
                                </View>
                            </TouchableHighlight>
                        }
                        keyExtractor={item => item.id_user.toString()}
                    /></>
                    }
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#303030",
    },
    itemList: {
        alignContent: 'stretch',
        flexDirection: 'row',
        marginBottom: '3%',
        marginTop: 10,
        marginLeft: '3%'
    },
    itemText: {
        marginLeft: '2%',
        color: 'white'
    },
    container: {
        backgroundColor: "#303030"
    },
    TextAmigos:{
        marginLeft:'3.5%',
        fontWeight:'bold',
        color:'#FFD700'
    }
});