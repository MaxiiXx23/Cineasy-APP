import React, { Component } from 'react';
import { View, Text, Button, FlatList, ToastAndroid, TextInput, TouchableHighlight, AsyncStorage, StyleSheet,Image } from 'react-native';
import { Container, Header, Content, Thumbnail } from 'native-base';
import ip from './ip';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class Comentario extends Component {
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTitleStyle: {
            color: 'white'
        },

    };
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            TextInputComentar: '',
            clearInput: false
        };
    }
    componentDidMount() {
        this.loadRepositories();
    }
    loadRepositories = async () => {
        const { page } = this.state;
        const { navigation } = this.props;
        const idPost = navigation.getParam('itemId', 'NO-ID');
        const api = ip;
        return fetch(`http://${api}:3000/comentarios/ver/${idPost}/${page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    page: page + 1,
                    api: api
                }, function () {

                });
                //console.log(responseJson)
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
    _comentar = async () => {
        const api = ip;
        const { navigation } = this.props;
        const idPost = navigation.getParam('itemId', 'NO-ID');
        const id = await AsyncStorage.getItem('idUsuario');
        if (this.state.TextInputComentar == "") {
            ToastAndroid.showWithGravity(
                'Campo Comentario vazio, por favor reencha-o.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        } else {
            fetch(`http://${api}:3000/comentarios/comentar/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FkPost: idPost,
                    FkUsuario: id,
                    comentario: this.state.TextInputComentar
                }),
            });
            ToastAndroid.showWithGravity(
                'Comentario efetuado',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            this.loadRepositories();
            this.setState({ TextInputComentar: '' })
        }
    }
    render() {
        const api = ip;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.containerComentario}>
                            <View>
                                <Thumbnail
                                    source={{
                                        uri: 'http://' + api + ':3000/fotoperfil/maxPuch.jpg'
                                    }}
                                />
                            </View>
                            <Text style={styles.nome} numberOfLines={15}>{item.nome}</Text>
                            <Text style={styles.texto}>{item.comentario}</Text>
                        </View>
                    }
                    keyExtractor={item => item.id_comentario.toString()}
                    onEndReached={this.loadRepositories}
                    onEndReachedThreshold={0.1}
                />
                <View style={styles.containerInput}>
                    <TextInput style={styles.input} placeholder="Adicione um comentário..."
                        placeholderTextColor="white"
                        multiline={true}
                        onChangeText={(TextInputComentar) => this.setState({ TextInputComentar })}
                        value={this.state.TextInputComentar}
                    />
                    <TouchableHighlight
                        onPress={this._comentar}
                        style={styles.btnClickContain}
                        underlayColor='black'>
                        <View
                            style={styles.btnContainer}>
                            <Icon
                                name='send'
                                size={35}
                                color='white'
                                style={styles.btnIcon} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    texto: {
        color: 'white',
        padding: 15,
        marginLeft: '2%'
    },
    input: {
        backgroundColor: '#303030',
        color: 'white',
        borderWidth: 1,
        borderBottomColor: '#303030',
        borderRadius: 5,
        width: '88%'
    },
    containerInput: {
        flexDirection: 'row',
    },
    btnClickContain: {
        backgroundColor: 'black',
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
    thumbnail:{
        borderWidth: 1,
        borderRadius: 10,
        height:40,
        width:50,
    },
    containerComentario:{
        flexDirection: 'row',
        marginBottom:5
    },
    nome:{
        fontWeight:'bold',
        color:'white',
        marginLeft:8,
        marginTop:15
    }
});
