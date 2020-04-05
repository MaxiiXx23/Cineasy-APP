import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../telas/home';
import Comentario from './comentario';

const NevegaHome = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false, // only this works
        },
    },
    comentario: {
        screen: Comentario,
    },
},
);

export default createAppContainer(NevegaHome);