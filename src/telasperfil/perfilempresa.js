import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Image, ToastAndroid, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { Container, Text, Header, Left, Body, Button, Title, Thumbnail, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip';
export default class Perfilempresa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            DadosEmpresa: [],
            NomeFantasia: '',
            fotoUser: '',
            statusSeguir: '',
            id_seguir: '',
            totalposts:'',
            totalsegui:''
        };
    }
    async componentDidMount() {
        this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
            this.loadRepositories();
            this._totalposts();
            this._totalsegui();
            this._verificaSeguir();
        })

    }
    async componentWillUnmount() {
        this.willBlurListener.remove();
    }
    loadRepositories = async () => {
        const { navigation } = this.props;
        const idEmpresa = navigation.getParam('itemId', 'NO-ID');
        const api = ip;
        return fetch( api + '/posts/postempresa/' + idEmpresa + '/4')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    DadosEmpresa: responseJson,
                    NomeFantasia: responseJson[0].nomeFantasia,
                    fotoUser: responseJson[0].fotoUser,
                    frase: responseJson[0].frase
                });
            })
            .catch((error) => {
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
    }
    _totalposts = async () => {
        const { navigation } = this.props;
        const idEmpresa = navigation.getParam('itemId', 'NO-ID');
        const api = ip;
        return fetch( api + '/posts/totalposts/' + idEmpresa)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    totalposts: responseJson.totalposts
                });
            })
            .catch((error) => {
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
    }
    _totalsegui = async () => {
        const { navigation } = this.props;
        const idEmpresa = navigation.getParam('itemId', 'NO-ID');
        const api = ip;
        return fetch( api + '/empresa/totalseguidores/' + idEmpresa)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    totalsegui: responseJson.totalseguidores
                });
            })
            .catch((error) => {
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
    }
    _verificaSeguir = async () => {
        const { navigation } = this.props;
        const idUserLogado = await AsyncStorage.getItem('idUsuario');
        const idEmpresa = navigation.getParam('itemId', 'NO-ID');
        const api = ip;
        return fetch( api + '/empresa/verificaseguir/' + idEmpresa + '/' + idUserLogado)
            .then((response) => response.json())
            .then((responseJson) => {
                const dadosSeguir = responseJson
                if (dadosSeguir.mensagem == '1') {
                    this.setState({
                        statusSeguir: '1',
                        id_seguir: dadosSeguir.id_seguir
                    })
                } else if (dadosSeguir.mensagem == '0') {
                    this.setState({
                        statusSeguir: '0'
                    })
                }
            })
            .catch((error) => {
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });

    }
    _retornaBtn() {
        const verificaSeguir = this.state.statusSeguir
        if (verificaSeguir == '0') {
            return (
                <Button style={styles.btnSeguir} onPress={this._Seguir} rounded success>
                    <Text style={styles.btnText}>Seguir</Text>
                </Button>
            )
        } else {
            return (
                <Button style={styles.btnSeguir} onPress={this._naoSeguir} rounded success>
                    <Text style={styles.btnText2}>Deixar de Seguir</Text>
                </Button>
            )
        }
    }
    _Seguir = async () => {
        const { navigation } = this.props;
        const idUserLogado = await AsyncStorage.getItem('idUsuario');
        const idEmpresa = navigation.getParam('itemId', 'NO-ID');
        const api = ip;
        fetch(api + '/empresa/seguir/' + idUserLogado, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idSolicitado: idEmpresa
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                const mensagem = responseJson.mensagem
                if (mensagem == '1') {
                    this._totalsegui();
                    this._verificaSeguir();
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
    _naoSeguir = async () => {
        const id_seguir = this.state.id_seguir;
        const api = ip;
        fetch(api + '/empresa/excluirseguir/' + id_seguir, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.mensagem == '1') {
                ToastAndroid.showWithGravity(
                    'Deixou de seguir.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
                this._totalsegui();
                this._verificaSeguir();
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
            <Container style={styles.Container}>
                <Header androidStatusBarColor="#191919" style={styles.header}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' size={25} color='white' onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.state.NomeFantasia}</Title>
                    </Body>
                </Header>
                <Content >
                    <View style={styles.ContainerInfos}>
                        <Thumbnail large source={{ uri:api + '/fotoperfil/' + this.state.fotoUser }} />
                        <View>
                        <Text style={styles.numberinfo}>{this.state.totalposts}</Text>
                            <Text style={styles.descinfo}>Publicações</Text>
                        </View>
                        <View>
                        <Text style={styles.numberinfo2}>{this.state.totalsegui}</Text>
                            <Text style={styles.descinfo2}>Seguidores</Text>
                        </View>
                    </View>
                    <View style={styles.describeText}>
                        <Text style={styles.nome}>{this.state.NomeFantasia}</Text>
                        <Text style={styles.TextInfo}>{this.state.frase}</Text>
                    </View>
                    {this._retornaBtn()}
                    <View style={styles.ContainerPubli}>
                        <Icon style={styles.IconPubli} name='view-module' size={25} color='white' />
                        <FlatList
                            data={this.state.DadosEmpresa}
                            numColumns={2}
                            renderItem={({ item }) => <TouchableWithoutFeedback 
                            onPress={() => this.props.navigation.navigate('Postagem', {
                                itemId: item.id_post
                                })}>
                                <Image
                                    style={styles.Img}
                                    source={{
                                        uri: api + '/posts/' + item.img_post,
                                    }}
                                />
                            </TouchableWithoutFeedback>
                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        backgroundColor: "#303030",
    },
    header: {
        backgroundColor: "#303030",
    },
    ContainerInfos: {
        alignContent: 'stretch',
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 12
    },
    numberinfo: {
        color: 'white',
        marginTop: 20,
        marginLeft: '35%',
        fontWeight: 'bold'
    },
    numberinfo2: {
        color: 'white',
        marginTop: 20,
        marginLeft: '8%',
        fontWeight: 'bold'
    },
    descinfo: {
        color: 'white',
        marginTop: 0,
        marginLeft: '28%',
    },
    descinfo2: {
        color: 'white',
        marginTop: 0,
        marginRight: 10
    },
    btnSeguir: {
        marginTop: 10
    },
    btnText: {
        marginLeft: '48%'
    },
    btnText2: {
        marginLeft: '38%'
    },
    describeText: {
        marginTop: 10,
        marginLeft: 12
    },
    nome: {
        color: 'white',
        fontWeight: 'bold',
    },
    TextInfo: {
        color: 'white',
        lineHeight: 19,
        marginTop: 7
    },
    ContainerPubli: {
        marginTop: 20,
        borderTopWidth: 0.3,
        borderTopColor: 'white'
    },
    IconPubli: {
        marginLeft: '48%'
    },
    Img: {
        width: 200,
        height: 200,
        marginRight: 1,
        marginLeft: 2
    }
});