import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native';
import { Container, Thumbnail, List, ListItem, Image } from 'native-base';
import ip from '../components/ip';
import { NavigationActions } from 'react-navigation';
export default class drawerCustom extends Component {
    static navigationOptions = {
        drawerLabel: 'DrawerCustom'
    };
    constructor(props) {
        super(props);
        this.state = {
            fotoUser: ''
        };
    }
    async componentDidMount() {
        this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
            this.loadRepositories();
        })
    }
    componentWillUnmount() {
        this.willBlurListener.remove();
    }
    loadRepositories = async () => {
        const id = await AsyncStorage.getItem('idUsuario');
        //console.log(id)
        const api = ip;
        return fetch(api + '/usuarios/dados/' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    fotoUser: responseJson[0].fotoUser,

                }, function () {

                });
                //console.log(this.state.fotoUser)
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
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };
    _voltar = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    _sair = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    render() {
        const api = ip;
        return (
            <Container style={{ backgroundColor: '#000000' }}>
                <View style={styles.ViewFoto}>
                    <Icon name="arrow-back" size={20} style={{ color: '#ffffff' }} onPress={this._voltar('Perfil')} />
                    <Thumbnail source={{ uri: api + '/fotoperfil/' + this.state.fotoUser }} style={styles.perfil} />
                </View>
                <View>
                    <Text style={styles.config}>
                        Configurações
                    </Text>
                </View>
                <List>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.conta}>
                            Conta
                        </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.texto} onPress={this.navigateToScreen('EditarPerfil')}>
                            Editar Perfil
                        </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.texto} onPress={this.navigateToScreen('Planos')}>
                            Planos Cineasy
                        </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.texto} onPress={this.navigateToScreen('AlternarSenha')}>
                            Alterar senha
                        </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.conta}>
                            Sobre
                        </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.texto} onPress={this.navigateToScreen('EditarPerfil')}>
                            Feedback
                        </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.texto} onPress={this.navigateToScreen('TermosUso')}>
                            Termos de Uso
                        </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <TouchableHighlight onPress={this._sair} style={styles.btnClickContain} underlayColor='#FFFF00'>
                            <View
                                style={styles.btnContainer}>
                                <Icon name="exit-to-app" size={30} style={styles.btnIcon} />
                                <Text style={styles.btnText}>Sair do App</Text>
                            </View>
                        </TouchableHighlight>
                    </ListItem>
                </List>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    perfil: {
        marginLeft: '37%',
        marginTop: 20
    },
    texto: {
        color: '#FFFFFF',
        padding: 8.5
    },
    listItem: {
        borderBottomColor: '#000000'
    },
    config: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'serif',
        marginLeft: 50,
        marginTop: 3
    },
    ViewFoto: {
        height: 120,
        backgroundColor: '#000000',
        borderBottomWidth: 0.3,
        borderBottomColor: '#FFFFFF'
    },
    conta: {
        fontSize: 15,
        color: '#FFD700',
        fontFamily: 'serif',
        marginLeft: 0,
        marginTop: 3,
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
    btnText: {
        fontSize: 18,
        color: '#000000',
        marginLeft: 10,
        marginTop: 2,
    },
    btnIcon: {
        height: 25,
        width: 25,
        color: '#000000'
    }
})