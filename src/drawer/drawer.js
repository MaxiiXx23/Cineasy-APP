import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Perfil from '../telas/perfil';
import EditarPerfil from './editarPerfil';
import drawerCustom from './drawerCustom';
import TermosUso from './termosUso';
const MyDrawerNavigator = createDrawerNavigator({
  Perfil: {
    screen: Perfil,
  },
  EditarPerfil: {
    screen: EditarPerfil,
  },
  TermosUso: {
    screen: TermosUso
  },
}, {
  //For the Custom sidebar menu we have to provide our CustomSidebarMenu
  contentComponent: drawerCustom,

});

export default Drawer = createAppContainer(MyDrawerNavigator);