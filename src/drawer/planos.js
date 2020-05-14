import React, { Component } from "react";
import { Container, Header, Content, Accordion, Text, View, Left, Body, Right, Title, Button, Segment, Card, CardItem } from "native-base";
import { StyleSheet, AsyncStorage, Image, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip';
export default class planos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            api: ip
        };
    }
    selectComponent = (activePage) => () => this.setState({ activePage })
    _renderComponent() {
        if (this.state.activePage === 1) {
            return <><Card>
                <CardItem header bordered>
                    <Text style={styles.TitlePlano}> Plano Free</Text>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>
                            O plano free não lhe oferece nenhum benefício na plataforma,
                            mas poderá:
                        </Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Avaliar Filmes na plataforma.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Acesso as comunidades de publicações.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Chance de ganhar cupons em sorteios.</Text>
                </CardItem>
                <CardItem bordered>
                    <Button style={styles.AlingBtn} success rounded>
                        <Text >Plano Atual</Text>
                    </Button>
                </CardItem>
            </Card>
            </>
        } else if (this.state.activePage === 2) {
            return <><Card>
                <CardItem header bordered>
                    <View style={styles.ContainerInfos}>
                        <Text style={styles.TitlePlano}> Plano Hero</Text>
                        <Text style={styles.ValorPlano}>Apartir de R$18,00/mês </Text>
                    </View>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>
                            Com o plano hero você tem acesso a tudo que teria no planos free e os seguintes benefícios:
                    </Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Dois Descontos garantidos para ingressos.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Participará de sorteios extras para ganhar cupons.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Desconto na primeira assinatura do pacote Hero.</Text>
                </CardItem>
                <CardItem bordered>
                    <Button style={styles.AlingBtn} success rounded>
                        <Text >Adquira já!</Text>
                    </Button>
                </CardItem>
            </Card>
                <Text style={styles.TextInfo}>
                    Apenas R$18,00/mês após o período da oferta. Cancele quando quiser. Sujeito a Termos e condições.
                </Text>
            </>
        } else {
            return <><Card>
                <CardItem header bordered>
                    <Text style={styles.TitlePlano}> Plano Super-Hero</Text>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>
                            Com o plano Super Hero, você tem acesso a tudo dos planos free e Hero,e os seguintes benefícios:
                    </Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> 4 descontos garantidoss para ingressos.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Participará de sorteios extras para ganhar cupons.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Descontos especiais para acompanhantes.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Seus descontos irão variar entre 45% e 60%.</Text>
                </CardItem>
                <CardItem bordered>
                    <Icon name='check-circle' size={25} color='#000000' style={styles.btnIcon} />
                    <Text> Desconto na primeira assinatura do pacote Super Hero.</Text>
                </CardItem>
                <CardItem bordered>
                    <Button style={styles.AlingBtn} success rounded>
                        <Text >Adquira já!</Text>
                    </Button>
                </CardItem>
            </Card>
                <Text style={styles.TextInfo}>
                    Apenas R$22,00/mês após o período da oferta. Cancele quando quiser. Sujeito a Termos e condições.
        </Text></>
        }
    }
    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#191919" style={styles.header} hasSegment>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' size={25} color="white" onPress={() => this.props.navigation.navigate('Perfil')} />
                        </Button>
                    </Left>
                    <Body>
                        <Segment style={styles.header}>
                            <Button first active={this.state.activePage === 1} onPress={this.selectComponent(1)}>
                                <Text>Free</Text>
                            </Button>
                            <Button active={this.state.activePage === 2} onPress={this.selectComponent(2)}>
                                <Text>Hero</Text>
                            </Button>
                            <Button last active={this.state.activePage === 3} onPress={this.selectComponent(3)}>
                                <Text>Super-Hero</Text>
                            </Button>
                        </Segment>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content style={{ backgroundColor: "#191919" }}>
                    {this._renderComponent()}
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#303030",
    },
    itemList: {
        alignContent: 'stretch',
        flexDirection: 'row',
        marginBottom: '3%',
        marginTop: 10,
        marginLeft: '3%'
    },
    itemText: {
        marginLeft: '2%',
        color: 'white'
    },
    container: {
        backgroundColor: "#303030"
    },
    TextAmigos: {
        marginLeft: '3.5%',
        fontWeight: 'bold',
        color: '#FFD700'
    },
    btnIcon: {
        height: 25,
        width: 25,
    },
    btnText: {
        marginLeft: '42%'
    },
    ContainerCard: {
        backgroundColor: 'black'
    },
    AlingBtn: {
        marginLeft: '35%'
    },
    TextInfo: {
        color: 'white',
        lineHeight: 17,
        marginTop: 5
    },
    TitlePlano: {
        color: '#FFD700'
    },
    ContainerInfos:{
        flexDirection:'row',
        alignItems: 'stretch',
    },
    ValorPlano:{
        marginLeft:'22%'
    }
});