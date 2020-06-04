import React, { Component } from 'react';
import { Container, Header, Item, Input, Button, Text, Thumbnail,Left } from 'native-base';
import { StyleSheet, ToastAndroid, FlatList, View, TouchableHighlight, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip';
export default class Seguindo extends Component {
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
            this._listSeguindo();
        })
    }
    _listSeguindo = async () => {
        const id = await AsyncStorage.getItem('idUsuario');
        const api = ip;
        return fetch(`http://${api}:3000/empresa/listarseguindo/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    DadosSeguindo: responseJson,
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
        if (text == "") {
            this.setState({ show: true });
        } else {
            this.setState({ show: false });
        }
        this.setState({ TextInputSearch: text })
        let nome = this.state.TextInputSearch
        const api = ip;
        if (!nome == "") {
            return fetch(`http://${api}:3000/empresa/buscarredes/${nome}`)
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
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' size={25} color='white'onPress={() => this.props.navigation.navigate('perfil')} />
                        </Button>
                    </Left>
                    <Item>
                        <Icon name="people" size={30} />
                        <Input placeholder=" Procurar Redes"
                            onChangeText={(TextInputSearch) => this._search(TextInputSearch)}

                        />
                        <Icon name="search" size={30} color='' />
                    </Item>
                </Header>
                {this.state.show ? (
                    <>
                        <Text style={styles.TextAmigos} >Redes de Cinema</Text>
                        <FlatList
                            data={this.state.DadosSeguindo}
                            renderItem={({ item }) =>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.props.navigation.navigate('Perfilempresa', {
                                            itemId: item.id_user,
                                        });
                                    }}
                                >
                                    <View style={styles.itemList}>
                                        <Thumbnail small source={{ uri: 'http://' + api + ':3000/fotoperfil/' + item.fotoUser }} />
                                        <Text style={styles.itemText} >{item.nomeFantasia}</Text>
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
                                        this.props.navigation.navigate('Perfilempresa', {
                                            itemId: item.id_user,
                                        });
                                    }}
                                >
                                    <View style={styles.itemList}>
                                        <Thumbnail small source={{ uri: 'http://' + api + ':3000/fotoperfil/' + item.fotouser }} />
                                        <Text style={styles.itemText} >{item.nomeFantasia}</Text>
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
    TextAmigos: {
        marginLeft: '3.5%',
        fontWeight: 'bold',
        color: '#FFD700'
    }
});