import React from 'react';
import { View, Text, ImageBackground, TouchableHighlight, Image, StyleSheet, ScrollView, AsyncStorage, ToastAndroid } from 'react-native';
import { Container, Header, Button, Left, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ip from '../components/ip';
export default class Detalhes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dadosFilme: [],
            statusplay: true,
            trailler: '',
            rating: '',
            idUser: '',
            idFilme: '',
            RatingTotal: '',
            UserRatingTotal:''
        };
    }
    async componentDidMount() {
        this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
            this.loadRepositories();
        })

    }
    async componentWillUnmount() {
        this.willBlurListener.remove();
    }
    loadRepositories = async () => {
        const id = await AsyncStorage.getItem('idUsuario');
        const { navigation } = this.props;
        const idFilme = navigation.getParam('itemId', 'NO-ID');
        this.setState({
            idUser: id,
            idFilme: idFilme
        })
        const api = ip;
        this._totalRating();
        return fetch(api + '/filmes/detalhes/' + idFilme)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    nome: responseJson[0].nome,
                    sinopse: responseJson[0].sinopse,
                    genero: responseJson[0].genero,
                    duracao: responseJson[0].duracao,
                    diretor: responseJson[0].diretor,
                    trailler: responseJson[0].trailler,
                    classf: responseJson[0].classficacao,
                    foto: responseJson[0].foto,

                }, function () {

                });
                //console.log(this.state.trailler)
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
    _classificacao() {
        if (this.state.classf == 'L') {
            return <View style={styles.livre}>
                <Text style={styles.colorClass}> L </Text>
            </View>;
        } else if (this.state.classf == '10') {
            return <View style={styles.class10}>
                <Text style={styles.colorClass}> 10 </Text>
            </View>;
        } else if (this.state.classf == '12') {
            return <View style={styles.class12}>
                <Text style={styles.colorClass}> 12 </Text>
            </View>;
        } else if (this.state.classf == '14') {
            return <View style={styles.class14}>
                <Text style={styles.colorClass}> 14 </Text>
            </View>;
        } else if (this.state.classf == '16') {
            return <View style={styles.class16}>
                <Text style={styles.colorClass}> 16 </Text>
            </View>;
        } else {
            return <View style={styles.class18}>
                <Text style={styles.colorClass}> 18 </Text>
            </View>;
        }
    }
    ratingCompleted = async (rating) => {
        const ratingValue = rating
        this.setState({
            rating: ratingValue
        });
        this._confirmaRating();
    }
    _confirmaRating = async () => {
        const api = ip;
        const id = this.state.idUser
        const idFilme = this.state.idFilme
        return fetch(api + '/filmes/confirmarating/' + id + '/' + idFilme)
            .then((response) => response.json())
            .then((json) => {
                if (json.mensagem == '1') {
                    this._upadteRating();
                } else {
                    this._addRating();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    _upadteRating = async () => {
        const id = this.state.idUser
        const idFilme = this.state.idFilme
        const ratingValue = this.state.rating
        const api = ip;
        fetch(`${api}/filmes/updaterating`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id_usuario: id,
                Id_filme: idFilme,
                rating: ratingValue
            }),
        }).then((response) => response.json())
            .then((json) => {
                if (json.mensagem == '1') {
                    ToastAndroid.showWithGravity(
                        'Filme Avaliado',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                    );
                    this._totalRating();
                } else {
                    ToastAndroid.showWithGravity(
                        'Falha na conexão.',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                    );
                }
            }).catch((error) => {
                //console.error(error);
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
    }
    _addRating = async () => {
        const id = this.state.idUser
        const idFilme = this.state.idFilme
        const ratingValue = this.state.rating
        const api = ip;
        fetch(`${api}/filmes/addrating`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id_usuario: id,
                Id_filme: idFilme,
                rating: ratingValue
            }),
        }).then((response) => response.json())
            .then((json) => {
                if (json.mensagem == '1') {
                    ToastAndroid.showWithGravity(
                        'Filme Avaliado.',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                    );
                    this._totalRating();
                } else {
                    ToastAndroid.showWithGravity(
                        'Falha na conexão.',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                    );
                }
            }).catch((error) => {
                //console.error(error);
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
        ToastAndroid.showWithGravity(
            'Filme avaliado.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }
    _totalRating = async () => {
        const api = ip;
        const idFilme = this.state.idFilme
        return fetch(api + '/filmes/totalrating/' + idFilme)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    RatingTotal: json.ratingFinal,
                    UserRatingTotal: json.totalusers,
                })
            })
            .catch((error) => {
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
    }
    render() {
        const api = ip;
        const ratingAvaliacao = this.state.RatingTotal
        const personAvaliacao = this.state.UserRatingTotal
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#191919" searchBar style={styles.header} rounded>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' size={25} color='white' onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.state.nome}</Title>
                    </Body>
                </Header>
                <ScrollView >
                    <ImageBackground source={{ uri: api + '/imgs/fundo.png' }} style={styles.image} >
                        <View style={styles.viewImg}>
                            <Text style={styles.titulo}>
                                {this.state.nome}
                            </Text>
                            <Image source={{ uri: api + '/filmes/poster/' + this.state.foto }} style={styles.img} />
                        </View>
                        <View style={styles.viewNome}>
                            {this._classificacao()}
                            <Text style={styles.duracao}>
                                Duração: {this.state.duracao} Min
                        </Text>
                        </View>
                    </ImageBackground>
                    <View>
                        <Text style={styles.sinopse}>
                            Sinopse: {this.state.sinopse}
                        </Text>
                        <Text style={styles.nome}>
                            Gênero: {this.state.genero}
                        </Text>
                        <Text style={styles.nome}>
                            Diretor: {this.state.diretor}
                        </Text>
                    </View>
                    <View style={styles.atualrating} >
                        <Text style={styles.avaliacaoText}>Avaliações:</Text>
                        <Text style={styles.avaliacao}>{ratingAvaliacao}</Text>
                        <Icon name='star' size={25} color='#000000' style={styles.IconStar} />
                        <Text style={styles.avaliacao}>{personAvaliacao}</Text>
                        <Icon name='people' size={25} color='#000000' style={styles.IconStar} />
                    </View>
                    <View style={styles.rating}>
                        <AirbnbRating
                            count={5}
                            reviews={["Muito ruim", "Ruim", "Okay", "Bom", "Espetacular"]}
                            defaultRating={5}
                            size={20}
                            onFinishRating={this.ratingCompleted}
                        />
                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.navigation.navigate('Trailer', {
                                    trailler: this.state.trailler,
                                });
                            }}
                            style={styles.btnClickContain}
                            underlayColor='#FFFF00'>
                            <View
                                style={styles.btnContainer}>
                                <Icon
                                    name='movie'
                                    size={25}
                                    color='#000000'
                                    style={styles.btnIcon} />
                                <Text style={styles.btnText}>Trailer</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.navigation.navigate('Sessao', {
                                    sessao: '1',
                                });
                            }}
                            style={styles.btnClickContain}
                            underlayColor='#FFFF00'>
                            <View
                                style={styles.btnContainer}>
                                <Icon
                                    name='local-activity'
                                    size={25}
                                    color='#000000'
                                    style={styles.btnIcon} />
                                <Text style={styles.btnText}>Comprar Ingresso</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </Container >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    header: {
        backgroundColor: "#000000",
    },
    img: {
        height: 300,
        width: 200,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white',
        marginTop: '11%',
    },
    viewImg: {
        marginLeft: '2%',
        marginTop: '3%',
        alignItems: 'center',

    },
    nome: {
        color: '#FFFFFF',
        marginBottom: 10,
    },
    btnClickContain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        backgroundColor: '#FFD700',
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
        height: 25,
        width: 25,
    },
    btnText: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 10,
        marginTop: 2,
    },
    viewNome: {
        flexDirection: 'row',
        marginBottom: 2,
        marginTop: 10
    },
    duracao: {
        color: 'black',
        marginLeft: '10%'
    },
    sinopse: {
        lineHeight: 19,
        color: '#FFFFFF',
        marginTop: 50,
        marginBottom: 10
    },
    titulo: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17,
        marginTop: 20
    },
    colorClass: {
        color: '#FFFFFF'
    },
    class16: {
        color: '#FFFFFF',
        backgroundColor: '#FF0000',
        borderWidth: 1,
        borderColor: '#FF0000',
        borderRadius: 2,
        marginLeft: '28%'
    },
    class12: {
        color: '#FFFFFF',
        backgroundColor: '#FFD700',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 2,
        marginLeft: '28%'
    },
    class14: {
        color: '#FFFFFF',
        backgroundColor: '#FFA500',
        borderWidth: 1,
        borderColor: '#FFA500',
        borderRadius: 2,
        marginLeft: '28%'
    },
    class18: {
        color: '#FFFFFF',
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 2,
        marginLeft: '28%'
    },
    class10: {
        color: '#FFFFFF',
        backgroundColor: '#1E90FF',
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 2,
        marginLeft: '28%'
    },
    livre: {
        color: '#FFFFFF',
        backgroundColor: '#00FF00',
        borderWidth: 1,
        borderColor: '#00FF00',
        borderRadius: 2,
        marginLeft: '28%'
    },
    classf: {
        color: '#FFFFFF'
    },
    atualrating: {
        alignContent: 'stretch',
        flexDirection: 'row',
    },
    avaliacaoText: {
        color: 'white'
    },
    IconStar: {
        color: '#FFD700',
        marginLeft: 4,
        marginTop: -2
    },
    avaliacao: {
        color: '#FFD700',
        marginLeft: 10
    },
    rating: {
        marginBottom: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        marginTop: '9%'
    }

})
