import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../telas/home';
import Comentario from './comentario';
import Modaloptions from './modaloptions';
import Updatecomentario from './updatecomentario';

const NevegaHome = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        },
    },
    Comentários: {
        screen: Comentario,
    },
    Opcao: {
        screen: Modaloptions,
        navigationOptions: {
            headerShown: false,
        },
    },
    Editar: {
        screen: Updatecomentario,
    },
},
    {
        mode: 'modal',
        transparentCard:true,
    }
);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: NevegaHome,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

export default createAppContainer(RootStack);