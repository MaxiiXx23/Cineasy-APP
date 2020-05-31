import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Perfil from '../telas/perfil';
import Amigos from './amigos';
import Perfilusuario from './perfilusuario';
import Perfilempresa from './perfilempresa'
import Notificacao from './notificacao';
const navegaUsuario = createStackNavigator({
    usuario: {
        screen: Perfilusuario,
        navigationOptions: {
            headerShown: false,
        }
    }
})
const NavegaPerfil = createStackNavigator({
    perfil: {
        screen: Perfilempresa,
        navigationOptions: {
            headerShown: false,
        },
    },
    amigos: {
        screen: Amigos,
        navigationOptions: {
            headerTitle:'Procurar usuários',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#191919',
            },
            headerTitleStyle: {
                color: 'white'
            },
        },
    },
    notificacao: {
        screen: Notificacao,
        navigationOptions: {
            headerTitle:'Notificação',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#191919',
            },
            headerTitleStyle: {
                color: 'white'
            },
        },
    },
    perfilusuario: {
        screen: navegaUsuario,
        navigationOptions: {
            headerTitle:'Perfil do Usuário',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#191919',
            },
            headerTitleStyle: {
                color: 'white'
            },
        },
    }
},
    {
        initialRouteName: 'perfil',
    }
);
export default createAppContainer(NavegaPerfil);