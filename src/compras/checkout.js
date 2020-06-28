import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Button, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import ip from '../components/ip';
export default class Checkout extends Component {
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
            iduser :'',
            idplano:''
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
        const idPlano = navigation.getParam('idplano', 'NO-ID');
        this.setState({
            iduser :  id,
            idplano: idPlano
        })
    }
    render() {
        const api = ip
        const iduser = this.state.iduser
        const idplano = this.state.idplano
        return (
            <Container>
                <Header androidStatusBarColor="#191919" style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Planos')}>
                            <Icon size={25} color='white' name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Pagamento</Title>
                    </Body>
                </Header>
                <WebView
                    source={{
                        uri: `${api}/pagamento/checkout/${iduser}/${idplano}`
                    }}
                />
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#303030",
    }
});