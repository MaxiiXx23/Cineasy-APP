import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import NavegaPerfil from '../telasperfil/navegaperfil';
import EditarPerfil from './editarPerfil';
import drawerCustom from './drawerCustom';
import TermosUso from './termosUso';
import Planos from './planos';
import AlternarSenha from './alterarsenha'
import Checkout from '../compras/checkout';
const StackCompra = createStackNavigator({
  checkout :{
    screen: Checkout,
    navigationOptions: {
      headerShown: false,
  }
  }
});
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
  AlternarSenha: {
    screen: AlternarSenha
  },
  StackCompras:{
    screen: StackCompra,
    navigationOptions: {
      headerShown: false,
  }
  }
}, {
  //For the Custom sidebar menu we have to provide our CustomSidebarMenu
  contentComponent: drawerCustom,

});

export default Drawer = createAppContainer(MyDrawerNavigator);