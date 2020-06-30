import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import login from './src/telas/login';
import AuthLoadingScreen from './src/telas/AuthLoadingScreen';
import cadastro from './src/telas/cadastro';
import Filmes from './src/telas/filmes';
import drawer from './src/drawer/drawer';
import Cinemas from './src/telas/cinemas';
import Detalhes from './src/categorias/detalhes'
import RootStack from './src/components/navegaHome';
import Trailler from './src/categorias/trailler';
import Sessao from './src/compras/sessao';
import Icon from 'react-native-vector-icons/MaterialIcons';

// rotas do aplicativo
// colocar o ID do usuario no asyncStorage e usar nas rotas
const FilmStack = createStackNavigator({
  filmes: {
    screen: Filmes,
    navigationOptions: {
      tabBarLabel: 'filmes',
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="movie" size={20} color={tintColor} />
      )
    },
  },
    details:
      Detalhes,
    Trailer: 
      Trailler,
      Sessao:
        Sessao
  },{ headerMode: 'none' });
const Tabs = createBottomTabNavigator({
  Feed: {
    screen: RootStack,
    navigationOptions: {
      showIcon: true,
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={20} color={tintColor} />
      )
    },
  },
  Filmes: {
    screen: FilmStack,
    navigationOptions: {
      tabBarLabel: 'filmes',
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="movie" size={20} color={tintColor} />
      )
    },
  },
  Cinemas: {
    screen: Cinemas,
    navigationOptions: {
      tabBarLabel: 'Cinemas',
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="store" size={20} color={tintColor} />
      )
    }
  },
  Perfil: {
    screen: drawer,
    navigationOptions: {
      tabBarLabel: 'Perfil',
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={20} color={tintColor} />
      )
    },
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: 'black'
    },
    activeTintColor: '#FFD700',
  }
});


const cadastroStack = createStackNavigator({ SignIn: login, SignUp: cadastro }, { headerMode: 'none' });
const AuthStack = createStackNavigator({ SignIn: login }, {
  headerMode: 'none'
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: Tabs,
      Auth: AuthStack,
      cadastro: cadastroStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);