
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import login from './src/telas/login';
import AuthLoadingScreen from './src/telas/AuthLoadingScreen';
import cadastro from './src/telas/cadastro';
import filmes from './src/telas/filmes';
import drawer from './src/drawer/drawer';
import Cinemas from './src/telas/cinemas';
import Detalhes from './src/categorias/detalhes'
import RootStack from './src/components/navegaHome';

// rotas do aplicativo
// colocar o ID do usuario no asyncStorage e usar nas rotas
const Tabs = createBottomTabNavigator({
  Feed: {
    screen: RootStack,
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