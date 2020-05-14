import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, View, StyleSheet, ImageBackground, TouchableHighlight, AsyncStorage, Button, ScrollView, ToastAndroid } from 'react-native';
import { Container, Thumbnail, Text, Picker, Form } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ip from '../components/ip';
export default class Perfilusuario extends Component {
    static navigationOptions = {
        drawerLabel: 'Perfil do usuário',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#191919',
        },
        headerTitleStyle: {
            color: 'white'
        },

    };
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            fotoUser: '',
            frase: '',
            capaUser: '',
            dadosAmizade: [],
            idUsuarioLogado: '',
            statusAmizade: ''
        }
    }
    async componentDidMount() {
        this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
            this.loadRepositories();
            this._verificaAmizade();
        })
    }
    componentWillUnmount() {
        this.willBlurListener.remove();
    }
    loadRepositories = async () => {
        const { navigation } = this.props;
        const idUserLogado = await AsyncStorage.getItem('idUsuario');
        this.setState({
            idUsuarioLogado:idUserLogado
        })
        const id = navigation.getParam('itemId', 'NO-ID');
        //console.log(id)
        const api = ip;
        return fetch('http://' + api + ':3000/usuarios/dados/' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    text: responseJson[0].nome,
                    fotoUser: responseJson[0].fotoUser,
                    frase: responseJson[0].frase,
                    capaUser: responseJson[0].capaUser

                });

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
    _fotousuario() {
        const api = ip;
        if (this.state.fotoUser == null) {
            return <Thumbnail source={{ uri: 'http://' + api + ':3000/imgs/avatarperfil.png' }} style={[perfil2.foto]} />
        } else {
            return <Thumbnail source={{ uri: 'http://' + api + ':3000/fotoperfil/' + this.state.fotoUser }} style={[perfil2.foto]} />
        }
    }
    _verificaAmizade = async () => {
        const idUserLogado = await AsyncStorage.getItem('idUsuario');
        const { navigation } = this.props;
        const id = navigation.getParam('itemId', 'NO-ID');
        const api = ip;
        return fetch('http://' + api + ':3000/usuarios/verificaamizade/' + id + '/' + idUserLogado)
            .then((response) => response.json())
            .then((responseJson) => {
                const dadosAmizade = responseJson
                if (dadosAmizade.mensagem == '1') {
                    this.setState({
                        statusAmizade: '1'
                    })
                    //console.log(this.state.statusAmizade)
                } else if (dadosAmizade.mensagem == '0') {
                    this.setState({
                        statusAmizade: '0'
                    })
                    //console.log(this.state.statusAmizade)
                } else {
                    this.setState({
                        statusAmizade: '2'
                    })
                }
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
    _RetornaBtn(){
        const verificaAmizade = this.state.statusAmizade
        const idUserLogado = this.state.idUsuarioLogado
        const { navigation } = this.props;
        const Pendente = navigation.getParam('Pendente', 'NO-ID');
        const idUser = navigation.getParam('itemId', 'NO-ID');
        console.log(idUser)
        if(idUserLogado == idUser){
            return <View style={perfil2.containerBtns}><Text></Text></View>
        }else if (Pendente == '3') {
            return (
                <View style={perfil2.containerBtns}>
                    <TouchableHighlight
                        onPress={this._confirmar}
                        style={perfil2.btnClickContain2}
                        underlayColor='#FFFF00'>
                        <View
                            style={perfil2.btnContainer}>
                            <Text style={perfil2.btnText2}>Confirmar</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this._excluirAmigo}
                        style={perfil2.btnClickContain2}
                        underlayColor='#FFFF00'>
                        <View
                            style={perfil2.btnContainer}>
                            <Text style={perfil2.btnText2}>Excluir</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        } else if (verificaAmizade === '0') {
            return (
                <TouchableHighlight
                    onPress={this._adiciona}
                    style={perfil2.btnClickContain}
                    underlayColor='#FFFF00'>
                    <View
                        style={perfil2.btnContainer}>
                        <Icon
                            name='person-add'
                            size={25}
                            color='#000000'
                            style={perfil2.btnIcon} />
                        <Text style={perfil2.btnText}>Adicionar aos amigos</Text>
                    </View>
                </TouchableHighlight>
            )
        } else if (verificaAmizade === '1') {
            return (
                <TouchableHighlight
                    onPress={this._excluirAmigo}
                    style={perfil2.btnClickContain}
                    underlayColor='#FFFF00'>
                    <View
                        style={perfil2.btnContainer}>
                        <Icon
                            name='cancel'
                            size={25}
                            color='#000000'
                            style={perfil2.btnIcon} />
                        <Text style={perfil2.btnText}>Desfazer Amizade</Text>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return (
                <TouchableHighlight
                    style={perfil2.btnClickContain}
                    underlayColor='#FFFF00'>
                    <View
                        style={perfil2.btnContainer}>
                        <Icon
                            name='done'
                            size={25}
                            color='#000000'
                            style={perfil2.btnIcon} />
                        <Text style={perfil2.btnText}>Solicitação enviada</Text>
                    </View>
                </TouchableHighlight>
            )
        }
    }
    _adiciona = async () => {
        //console.log('adicionar clicado')
        const idUserLogado = await AsyncStorage.getItem('idUsuario');
        const api = ip;
        const { navigation } = this.props;
        const id = navigation.getParam('itemId', 'NO-ID');
        fetch('http://' + api + ':3000/usuarios/adicionaramigos/' + idUserLogado, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idSolicitado: id
            }),
        }).catch((error) => {
            console.error(error);
            ToastAndroid.showWithGravity(
                'Falha na conexão.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        });

    }
    _excluirAmigo = async () => {
        const { navigation } = this.props;
        const id_amigos = navigation.getParam('id_amigos', 'NO-ID');
        const api = ip;
        //console.log(id_amigos)
        fetch('http://' + api + ':3000/usuarios/excluiramigos/' + id_amigos, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.mensagem == '1') {
                ToastAndroid.showWithGravity(
                    'Amizade desfeita.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
                this._verificaAmizade();
            }
        }).catch((error) => {
            console.error(error);
            ToastAndroid.showWithGravity(
                'Falha na conexão.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        });
    }
    _confirmar = async () => {
        const { navigation } = this.props;
        const id_amigos = navigation.getParam('id_amigos', 'NO-ID');
        const api = ip;
        fetch('http://' + api + ':3000/usuarios/confirmaramizade/' + id_amigos, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.mensagem == '1') {
                ToastAndroid.showWithGravity(
                    'Agora vocês são amigos.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
                this._verificaAmizade();
            }
        }).catch((error) => {
            console.error(error);
            ToastAndroid.showWithGravity(
                'Falha na conexão.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        });
    }
    render() {
        const api = ip;
        return (
            <>
                <Container style={{ backgroundColor: '#191919' }}>
                    <View>
                        <ImageBackground source={{ uri: 'http://' + api + ':3000/fotoperfil/' + this.state.capaUser }} style={[perfil2.capa]}>
                        </ImageBackground>
                        {this._fotousuario()}
                        <View>
                            <Text style={[perfil2.info]}>
                                {this.state.text}
                            </Text>
                            <Text style={[perfil2.frase]}> {this.state.frase}</Text>
                        </View>
                    </View>
                    {this._RetornaBtn()}
                    <Grid style={{ marginTop: 12 }}>
                        <ScrollView>
                            <Row size={75}>
                                <Col style={perfil2.bloco} onPress={() => this.props.navigation.navigate('amigos')}>
                                    <Icon name="people" size={80} style={perfil2.icons} />
                                    <Text style={perfil2.text}>Amigos</Text>
                                </Col>
                                <Col style={perfil2.bloco1}>
                                    <Icon name="star" size={80} style={perfil2.icons} />
                                    <Text style={perfil2.text}>Avaliações</Text>
                                </Col>
                            </Row>
                            <Row size={100}>
                                <Col style={perfil2.bloco}>
                                    <Icon name="star" size={80} style={perfil2.icons} />
                                    <Text style={perfil2.text}>Seguindo</Text>
                                </Col>
                                <Col style={perfil2.bloco1}>
                                    <Icon name="movie-creation" size={80} style={perfil2.icons} />
                                    <Text style={perfil2.text}>Assistidos</Text>
                                </Col>
                            </Row>

                        </ScrollView>
                    </Grid>
                </Container>
            </>
        );
    }
}


const perfil2 = StyleSheet.create({
    cabecalho: {
        backgroundColor: "#000000"
    },
    cog: {
        color: 'white',
        marginTop: '-5%',
        marginLeft: '90%',
        height: 20,
        width: 30,
        backgroundColor: 'transparent',
    },
    capa: {
        height: 200,
    },
    foto: {
        marginLeft: '42%',
        marginTop: '-35%'

    },
    info: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: '33%'
    },
    frase: {
        color: 'white',
        fontSize: 15,
        marginLeft: '30%',
        width: 300
    },
    addFriend: {
        color: 'white',
        marginLeft: 5,
        marginTop: '-45%',
        height: 20,
        width: 50,
        backgroundColor: 'transparent',
    },
    EspaceCapa: {
        marginTop: 29
    },
    icons: {
        color: '#FFD700',
        marginLeft: '30%',
        marginTop: '30%'
    },
    bloco1: {
        backgroundColor: '#303030',
        height: 200,
        width: 200,
        borderRadius: 15,
        marginLeft: 7,
        marginTop: 3
    },
    bloco: {
        backgroundColor: '#303030',
        height: 200,
        width: 200,
        borderRadius: 15,
        marginTop: 3,
        marginBottom: 5
    },
    text: {
        color: 'white',
        marginLeft: '30%'
    },
    notificacao: {
        color: '#FFD700',
        marginLeft: '2%',
        marginTop: '2%'
    },
    TextNotf: {
        color: 'white',
        marginLeft: '2%',
        marginTop: '10%',
        textAlign: 'center'
    },
    blocoNoft: {
        backgroundColor: '#303030',
        height: 200,
        width: 400,
        borderRadius: 15,
        marginTop: 3,
        marginLeft: 5
    },
    btnClickContain: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        backgroundColor: '#FFD700',
        borderRadius: 5,
        padding: 5,
        marginTop: 38,
        marginBottom: 5,
    },
    btnClickContain2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#FFD700',
        borderRadius: 5,
        padding: 8,
        marginTop: 38,
        marginBottom: 5,
        marginLeft:'18%'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        borderRadius: 10,
    },
    btnIcon: {
        height: 25,
        width: 25,
    },
    btnText: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 10,
        marginTop: 0,
    },
    btnText2: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 2,
        marginTop: 0,
    },
    containerBtns:{
        flexDirection:'row',
        
    }
});
