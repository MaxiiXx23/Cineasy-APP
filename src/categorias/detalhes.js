import React from 'react';
import { View, Text, Button, TouchableHighlight, Image, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip'
import YouTube from 'react-native-youtube';
export default class Detalhes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dadosFilme: [],
            statusplay: true,
            trailler: ''
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const idFilme = navigation.getParam('itemId', 'NO-ID');
        //console.log(idFilme)
        const api = ip;
        return fetch('http://' + api + ':3000/filmes/detalhes/' + idFilme)
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
            return <View style={[styles.livre]}>
                    <Text style={[styles.colorClass]}> L </Text>
                    </View>;
        }else if(this.state.classf == '10'){
            return <View style={[styles.class10]}>
                    <Text style={[styles.colorClass]}> 10 </Text>
                    </View>;
        } else if (this.state.classf == '12') {
            return <View style={[styles.class12]}>
                    <Text style={[styles.colorClass]}> 12 </Text>
                   </View>;
        }else if(this.state.classf == '14'){
            return <View style={[styles.class14]}>
                    <Text style={[styles.colorClass]}> 14 </Text>
                   </View>;
        }else if(this.state.classf == '16'){
            return <View style={[styles.class16]}>
                    <Text style={[styles.colorClass]}> 16 </Text>
                   </View>;
        }else{
            return <View style={[styles.class18]}>
                    <Text style={[styles.colorClass]}> 18 </Text>
                   </View>;
        }
    }

    render() {
        const api = ip;
        return (
            <Container style={[styles.container]}>
                <ScrollView >
                    <View style={[styles.viewImg]}>
                         <Text style={[styles.titulo]}>
                            {this.state.nome}
                        </Text>
                        <Image source={{ uri:'http://' + api + ':3000/filmes/poster/'+ this.state.foto}} style={[styles.img]} />
                    </View>
                    <View style={[styles.viewNome]}>
                        {this._classificacao()}
                        <Text style={[styles.duracao]}>
                            Duração: {this.state.duracao} Min
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.sinopse]}>
                            {this.state.sinopse}
                        </Text>
                        <Text style={[styles.nome]}>
                            Gênero: {this.state.genero}
                        </Text>
                        <Text style={[styles.nome]}>
                            Diretor: {this.state.diretor}
                        </Text>
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
    img: {
        height: 240,
        width: 200,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000000'
    },
    viewImg: {
        marginLeft: '2%',
        marginTop: '5%',
        alignItems:'center'
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
        marginBottom:2,
        marginTop:1
    },
    duracao: {
        color: '#FFFFFF',
        marginLeft: '10%'
    },
    sinopse: {
        lineHeight: 19,
        color: '#FFFFFF',
        marginTop:7
    },
    titulo: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 17,
        marginBottom:10
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
    classf:{
        color: '#FFFFFF'
    }

})
