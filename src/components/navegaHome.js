
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../telas/home';
import Comentario from './comentario';
import Modaloptions from './modaloptions';
import Updatecomentario from './updatecomentario';
import Perfilempresa from '../telasperfil/perfilempresa';
import Postimagem from '../components/postimagem';

const NevegaHome = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        },
    },
    PerfilEmpresa:{
        screen: Perfilempresa,
        navigationOptions: {
            headerShown: false,
        },
    },
    Postagem:{
        screen: Postimagem,
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
            cardStyle:{
                 backgroundColor: 'transparent' 
            }
        },
    },
    Editar: {
        screen: Updatecomentario,
    },
},
    {
        mode: 'modal',
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