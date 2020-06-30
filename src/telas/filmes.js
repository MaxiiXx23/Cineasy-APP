import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { Tabs, Tab, TabHeading, Container, Header, Thumbnail, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cartaz from '../categorias/EmCartaz';
import EmAltaStack from '../categorias/EmAlta';
import EstreiaStack from '../categorias/Estreia';
import ip from '../components/ip';
export default class Filmes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputSearch: '',
      dataSource: [],
      show: true,
    };
  }
  _search = (text) => {
    if (text == "") {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
    this.setState({ TextInputSearch: text })
    let nome = this.state.TextInputSearch;
    const api = ip;
    if (!nome == "") {
      return fetch(`${api}/filmes/buscarfilmes/${nome}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson
          });
        }).catch((error) => {
          ToastAndroid.showWithGravity(
            'Filme não encontrado.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        });
    }
  }
  render() {
    const api = ip;
    return (
      <Container style={StyleList.cabecalho}>
        <View style={StyleList.cabecalho}>
          <Text style={style.title}>Cineasy</Text>
        </View>
        <Header searchBar rounded androidStatusBarColor="#000000" style={StyleList.cabecalho}>
          <Item>
            <Icon name="search" style={{ fontSize: 20, color: '#FFD700' }} />
            <Input placeholder="Buscar Filme" onChangeText={(TextInputSearch) => this._search(TextInputSearch)} />
            <Icon name="theaters" style={{ fontSize: 20, color: '#FFD700' }} />
          </Item>
        </Header>
        {this.state.show ? (
          <>
            <Tabs locked={true} tabBarUnderlineStyle={{ backgroundColor: "yellow" }}>
              <Tab heading={<TabHeading style={style.tabHeading}><Text>Em cartaz</Text></TabHeading>}>
                <Cartaz />
              </Tab>
              <Tab heading={<TabHeading style={style.tabHeading}><Text>Em Alta</Text></TabHeading>}>
                <View style={[styles.container, styles.horizontal]}>
                  <EmAltaStack />
                </View>
              </Tab>
              <Tab heading={<TabHeading style={style.tabHeading}><Text>Estreias</Text></TabHeading>}>
                <View style={[styles.container, styles.horizontal]}>
                  <EstreiaStack />
                </View>
              </Tab>
            </Tabs>
          </>
        ) :
          <>
            <Text style={styles.TextAmigos} >Resultado...</Text>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) =>
                <TouchableHighlight
                  onPress={() => {
                    this.props.navigation.navigate('details', {
                      itemId: item.id_films,
                    });
                  }}
                >

                  <View style={styles.itemList}>
                    <Thumbnail small source={{ uri: api + '/filmes/poster/' + item.foto }} />
                    <Text style={styles.itemText} >{item.nome}</Text>
                  </View>
                </TouchableHighlight>
              }
              keyExtractor={item => item.id_films.toString()}
            /></>
        }
      </Container>
    );
  }
}
const style = StyleSheet.create({
  tabHeading: {
    backgroundColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "yellow"
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'serif',
    marginLeft: '37%'
  }
});
const StyleList = StyleSheet.create({
  cabecalho: {
    backgroundColor: "#000000"
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  TextAmigos: {
    marginLeft: '3.5%',
    fontWeight: 'bold',
    color: '#FFD700'
  },
  itemText: {
    marginLeft: '2%',
    color: 'white'
  },
  itemList: {
    alignContent: 'stretch',
    flexDirection: 'row',
    marginBottom: '3%',
    marginTop: 10,
    marginLeft: '3%'
  },
})