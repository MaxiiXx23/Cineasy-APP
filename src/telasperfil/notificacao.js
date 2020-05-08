import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, View, TouchableHighlight, AsyncStorage, FlatList } from 'react-native';
import { Container, Header, Body, Button, Segment, Content, Text, Thumbnail } from 'native-base';
import ip from '../components/ip';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class Notificacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
        };
    }
    componentDidMount() {
        this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
            this._loadPendentes();
        })
    }
    componentWillUnmount() {
        this.willBlurListener.remove();
    }
    _loadPendentes = async () => {
        const id = await AsyncStorage.getItem('idUsuario');
        const api = ip;
        return fetch(`http://${api}:3000/usuarios/listarpendentes/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                this.setState({
                    dataSource: responseJson,
                });
            }).catch((error) => {
                //console.error(error);
                ToastAndroid.showWithGravity(
                    'falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
    }
    selectComponent = (activePage) => () => this.setState({ activePage })

    _renderComponent() {
        if (this.state.activePage === 1) {
            return <Text>Geral</Text> //... Your Component 1 to display
        } else {
            console.log(this.state.dataSource)
            const api = ip;
            return <>
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
                                <Thumbnail small source={{ uri: 'http://' + api + ':3000/fotoperfil/' + item.fotoUser }} />
                                <Text style={styles.Text}>{item.nome}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.id_amigos.toString()}
                /></>
        }
    }
    render() {

        return (
            <Container>
                <Header androidStatusBarColor="#191919"  style={styles.header} hasSegment>
                    <Body>
                        <Segment  style={styles.header}>
                            <Button first active={this.state.activePage === 1} onPress={this.selectComponent(1)}>
                                <Text>Geral</Text>
                            </Button>
                            <Button last active={this.state.activePage === 2} onPress={this.selectComponent(2)}>
                                <Text>Solicitações de amizade</Text>
                            </Button>
                        </Segment>
                    </Body>
                </Header>
                <Content padder>
                    {this._renderComponent()}
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#191919",
    },
    itemList: {
        flexDirection:'row',
        alignContent:'stretch'
    },
    Text:{
        marginLeft: '3.5%',
        color: 'black'
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