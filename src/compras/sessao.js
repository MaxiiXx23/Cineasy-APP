import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Button, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import ip from '../components/ip';
export default class Sessao extends Component {
    static navigationOptions = {
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
            sessao :'',
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
    loadRepositories = async () =>{
        const id = await AsyncStorage.getItem('idUsuario');
        const { navigation } = this.props;
        const idSessao = navigation.getParam('Sessao', 'NO-ID');
        this.setState({
            sessao: idSessao
        })
    }
    render() {
        const api = ip
        return (
            <Container>
                <Header androidStatusBarColor="black" style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon size={25} color='white' name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sessão</Title>
                    </Body>
                </Header>
                <WebView
                    source={{
                        uri: `${api}/sessao/sessao`
                    }}
                />
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#000000",
    }
});