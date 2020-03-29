import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import login from './src/telas/login';
import AuthLoadingScreen from './src/telas/AuthLoadingScreen';
import home from './src/telas/home';
import cadastro from './src/telas/cadastro';
import filmes from './src/telas/filmes';
import drawer from './src/drawer/drawer';
import Cinemas from './src/telas/cinemas';
import Detalhes from './src/categorias/detalhes'

// rotas do aplicativo
// colocar o ID do usuario no asyncStorage e usar nas rotas
const Tabs = createBottomTabNavigator({
  Feed: {
    screen: home,
    navigationOptions: {
      tabBarLabel: 'Feed',
    },
  },
  Filmes: {
    screen: filmes,
    navigationOptions: {
      tabBarLabel: 'filmes',
    },
  },
  Cinemas:{
    screen: Cinemas,
    navigationOptions:{
      tabBarLabel:'Cinemas'
    }
  },
  Perfil: {
    screen: drawer,
    navigationOptions: {
      tabBarLabel: 'Perfil',
    },
  },
});

const Stacks = createStackNavigator({
  detalhes:
     Detalhes,
});

const cadastroStack = createStackNavigator({SignIn: login,SignUp: cadastro},{headerMode:'none'});
const AuthStack = createStackNavigator({ SignIn: login },{
  headerMode:'none'
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: Tabs,
      Auth: AuthStack,
      cadastro : cadastroStack,
      Detalhes: Stacks
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);