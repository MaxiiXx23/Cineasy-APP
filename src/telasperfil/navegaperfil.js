import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Perfil from '../telas/perfil';
import Amigos from './amigos';
import Perfilusuario from './perfilusuario';
import Notificacao from './notificacao';
import Seguindo from './seguindo';
import Perfilempresa from './perfilempresa';
import Postimagem from '../components/postimagem'
const navegaUsuario = createStackNavigator({
    usuario: {
        screen: Perfilusuario,
        navigationOptions: {
            headerShown: false,
        }
    }
})
const navegaSeguindo = createStackNavigator({
    Seguindo: {
        screen: Seguindo,
        navigationOptions: {
            headerShown: false,
        }
    },
    Perfilempresa: {
        screen: Perfilempresa,
        navigationOptions: {
            headerShown: false,
        }
    },
    Postagem: {
        screen: Postimagem,
        navigationOptions: {
            headerShown: false,
        }
    },
},
    {
        initialRouteName: 'Seguindo',
    }
)
const NavegaPerfil = createStackNavigator({
    perfil: {
        screen: Perfil,
        navigationOptions: {
            headerShown: false,
        },
    },
    amigos: {
        screen: Amigos,
        navigationOptions: {
            headerTitle: 'Procurar usuários',
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
            headerTitle: 'Notificação',
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
            headerTitle: 'Perfil do Usuário',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#191919',
            },
            headerTitleStyle: {
                color: 'white'
            },
        },
    },
    abaSeguindo: {
        screen: navegaSeguindo,
        navigationOptions: {
            headerShown: false,
        }
    }
},
    {
        initialRouteName: 'perfil',
    }
);
export default createAppContainer(NavegaPerfil);