import React, { Component } from 'react';
import { View, Text, ScrollView,ToastAndroid,StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Button, Title, Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip';
export default class AlternarSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInputEmail: '',
            TextInputSenha: ''
        };
    }
    _senhaUpdate = async () => {
        const api = ip;
        if (this.state.TextInputEmail == '' && this.state.TextInputSenha =='') {
            ToastAndroid.showWithGravity(
                'Campos vazios.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        } else if (this.state.TextInputEmail == "") {
            ToastAndroid.showWithGravity(
                'Campo Email Vazio.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        } else if (this.state.TextInputSenha == "") {
            ToastAndroid.showWithGravity(
                'Campo Senha Vazio.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        } else {
            fetch(`${api}/usuarios/editapass`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.TextInputEmail,
                    newsenha: this.state.TextInputSenha,
                }),
            }).catch((error) => {
                //console.error(error);
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
            ToastAndroid.showWithGravity(
                'Senha Alterada com sucesso.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        }
    }
    render() {
        return (
            <Container style={Styles.cabecalho}>
                <Header androidStatusBarColor='#191919' style={Styles.cabecalho}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' color='white' size={25} onPress={() => this.props.navigation.navigate('Perfil')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Alterar Senha</Title>
                    </Body>
                </Header>
                <Form>
                    <Item floatingLabel>
                        <Label style={Styles.label}>Email para confirmação:</Label>
                        <Input 
                            style={Styles.Input}
                            onChangeText={(TextInputEmail) => this.setState({ TextInputEmail })}
                            value={this.state.TextInputEmail} />
                    </Item>
                    <Item floatingLabel>
                        <Label style={Styles.label}>Nova senha:</Label>
                        <Input
                            style={Styles.Input}
                            onChangeText={(TextInputSenha) => this.setState({ TextInputSenha })}
                            value={this.state.TextInputSenha} 
                        />
                    </Item>
                    <Button rounded success style={Styles.btn} onPress={this._senhaUpdate}>
                        <Icon name='create' color='white' size={25} style={Styles.Icone} />
                    </Button>
                </Form>
            </Container>
        );
    }
}
const Styles = StyleSheet.create({
    cabecalho: {
        backgroundColor: "#000000"
    },
    label: {
        color: "white"
    },
    Icone: {
        marginLeft: '55%'
    },
    btn: {
        marginTop: 10
    },
    Input:{
        color:'white'
    }
});