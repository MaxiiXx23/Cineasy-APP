import React, { Component } from 'react';
import { View, Text, ScrollView,StyleSheet } from 'react-native';
import { Container, Header, Content, Accordion,Left,Right,Button,Body,Title } from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from '../components/ip';
const dataArray = [
  { title: "Aceitação dos termos de uso",
     content: "Estes Termos de Uso disciplinam os termos e condições aplicáveis a seu uso dos Serviços. Ao utilizar os Serviços, você ratifica que leu, compreendeu e concordou em ser legalmente vinculado a estes Termos.Se você não concorda com estes Termos, por favor não utilize os Serviços.Sujeito às condições abaixo, a Ingresso.com poderá modificar estes Termos periodicamente e de modo não retroativo, e modificar, adicionar ou descontinuar qualquer aspecto, conteúdo ou característica dos Serviços, a seu próprio critério. Seu uso ou acesso continuado dos Serviços após a publicação de quaisquer mudanças nos Termos constitui sua aceitação de tais mudanças. Na medida em que uma lei ou decisão judicial aplicável determine que a aplicação de quaisquer mudanças a estes Termos seja inexequível, tais mudanças deverão ser aplicáveis apenas com relação a eventos ou circunstâncias que ocorrerem após a data de tais mudanças, na medida em que for necessário para evitar que estes Termos sejam considerados inexequíveis.Qualquer forma de transferência ou sublicença, ou acesso, distribuição, reprodução, cópia, retransmissão, publicação, venda ou exploração (comercial ou não) não autorizados de qualquer parte dos Serviços incluindo, mas não se limitando a todo conteúdo, serviços, produtos digitais, ferramentas ou produtos, é expressamente proibida por estes Termos." },
  { title: "Cadastros, contas e senhas", content: "Se você estabelecer uma conta pessoal conosco, você concorda em fornecer dados verdadeiros e precisos sobre você no formulário de cadastro de conta, e em atualizar e manter tais informações atualizadas. Você é o único responsável por manter a confidencialidade de sua senha e conta, e você é o único responsável por todo uso de sua senha ou conta, autorizado ou não. Você não deverá permitir que outras pessoas acessem ou utilizem seu nome de usuário ou senha. Você não deverá publicar seu nome de usuário ou senha em qualquer site, nem os transmitir através de sites não seguros. Você concorda em (a) imediatamente notificar a Cineasy acerca de qualquer uso não autorizado de sua senha ou conta ou qualquer outra violação de segurança através do endereço de e-mail avisosegurança@cineasy.com e (b) garantir que você saia de sua conta cada vez que utilizar os Serviços. O acesso e uso de áreas protegidas por senha e/ou seguras dos Serviços é restrita a usuários que tenham recebido senha válida pela Cineasy. Nós poderemos encerrar sua adesão e acesso aos Serviços se descobrirmos que você nos forneceu informações de cadastro falsas ou enganosas. Se acreditarmos que seu nome de usuário e senha não são seguros ou que são de qualquer outra forma problemáticos, poderemos solicitar que você os altere ou encerrar sua conta." },
  { title: "Política de privacidade", content: "Seu uso dos Serviços e qualquer informação fornecida por você ou recolhida pela Cineasy ou partes terceiras durante qualquer visita ou uso dos Serviços é regida pela Política de Privacidade aqui incorporada através desta referência. Você concorda com a coleta, uso e compartilhamento por parte da Cineasy de suas informações nos termos determinados na Política de Privacidade." },
  { title: "Menores", content: "Os Serviços não foram formulados nem são destinados para serem usados por indivíduos menores de 18 anos e, portanto, se você for menor de 18 anos, solicitamos que você não use os Serviços nem nos forneça qualquer informação." }
];
export default class TermosUso extends Component {
  static navigationOptions = {
    drawerLabel: 'Termos Uso'
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container style={Styles.cabecalho}>
        <Header androidStatusBarColor='#191919' style={Styles.cabecalho}>
          <Left>
            <Button transparent  onPress={() => this.props.navigation.navigate('Perfil')}>
              <Icon name='arrow-back' size={25} color='white' />
            </Button>
          </Left>
          <Body>
            <Title>Termos de Uso</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <ScrollView>
            <Accordion dataArray={dataArray}  icon="add" expandedIcon="remove"/>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const Styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: "#000000"
  }
});