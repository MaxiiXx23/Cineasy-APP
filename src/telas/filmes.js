import React, { Component } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tabs, Tab, TabHeading, Container, Header, Button, Item, Input, Content, Card, CardItem, Body, Text } from 'native-base';
import Emcartaz from '../categorias/EmCartaz';
export default class filmes extends Component {
  render() {
    return (
      <Container>
        <View style={StyleList.cabecalho}>
          <Text style={style.title}>Cineasy</Text>
        </View>
        <Header searchBar rounded androidStatusBarColor="#000000" style={StyleList.cabecalho}>
          <Item>
            <Icon name="search" style={{ fontSize: 20, color: '#FFD700' }}/>
            <Input placeholder="Buscar Filme" />
            <Icon name="theaters" style={{ fontSize: 20, color: '#FFD700' }} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Tabs locked={true} tabBarUnderlineStyle={{ backgroundColor: "yellow" }}>
          <Tab heading={<TabHeading style={style.tabHeading}><Text>Em cartaz</Text></TabHeading>}>
            <Emcartaz />
          </Tab>
          <Tab heading={<TabHeading style={style.tabHeading}><Text>Em Alta</Text></TabHeading>}>
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#FFD700" />
            </View>
          </Tab>
          <Tab heading={<TabHeading style={style.tabHeading}><Text>Estreias</Text></TabHeading>}>
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#FFD700" />
            </View>
          </Tab>
        </Tabs>
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
  title:{
    color:'white',
    fontSize:25,
    fontFamily:'serif',
    marginLeft:'37%'
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
  }

})