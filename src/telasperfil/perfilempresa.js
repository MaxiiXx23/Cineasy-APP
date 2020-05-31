import React, { Component } from 'react';
import { View, StyleSheet, FlatList,Image} from 'react-native';
import { Container, Text, Header, Left, Body, Button, Title, Thumbnail, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip';
export default class Perfilempresa extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        DATA = [
            {
                id: '1',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
            {
                id: '2',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
            {
                id: '3',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
            {
                id: '4',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
            {
                id: '5',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
            {
                id: '6',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
            {
                id: '7',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
            {
                id: '8',
                img: 'https://img.freepik.com/fotos-gratis/arvore-3d-contra-um-ceu-do-por-do-sol_1048-9754.jpg?size=626&ext=jpg',
            },
        ];
        const api = ip;
        return (
            <Container style={styles.Container}>
                <Header androidStatusBarColor="#191919" style={styles.header}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' size={25} color='white' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Cinemark</Title>
                    </Body>
                </Header>
                <Content >
                    <View style={styles.ContainerInfos}>
                        <Thumbnail large source={{ uri: 'http://' + api + ':3000/fotoperfil/cinr.jpg' }} />
                        <View>
                            <Text style={styles.numberinfo}>155</Text>
                            <Text style={styles.descinfo}>Publicações</Text>
                        </View>
                        <View>
                            <Text style={styles.numberinfo2}>20k</Text>
                            <Text style={styles.descinfo2}>Seguidores</Text>
                        </View>
                    </View>
                    <View style={styles.describeText}>
                        <Text style={styles.nome}>Cinemark Brasil</Text>
                        <Text style={styles.TextInfo}>É mais que cinema.É Cinemark.</Text>
                    </View>
                    <Button style={styles.btnSeguir} rounded success>
                        <Text style={styles.btnText}>Seguir</Text>
                    </Button>
                    <View style={styles.ContainerPubli}>
                        <Icon style={styles.IconPubli} name='view-module' size={25} color='white' />
                        <FlatList
                            data={DATA}
                            numColumns={2}
                            renderItem={({ item }) => <Image
                            style={styles.Img}
                            source={{
                              uri: item.img,
                            }}
                          />}
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
    Img:{
        width: 200,
        height: 200,
        marginRight:1,
        marginLeft:2
    }
});