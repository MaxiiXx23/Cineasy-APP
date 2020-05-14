import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
//import Perfil from '../telas/perfil';
import NavegaPerfil from '../telasperfil/navegaperfil';
import EditarPerfil from './editarPerfil';
import drawerCustom from './drawerCustom';
import TermosUso from './termosUso';
import Planos from './planos';
const MyDrawerNavigator = createDrawerNavigator({
  Perfil: {
    screen: NavegaPerfil,
  },
  EditarPerfil: {
    screen: EditarPerfil,
  },
  Planos: {
    screen: Planos,
  },
  TermosUso: {
    screen: TermosUso
  },
}, {
  //For the Custom sidebar menu we have to provide our CustomSidebarMenu
  contentComponent: drawerCustom,

});

export default Drawer = createAppContainer(MyDrawerNavigator);