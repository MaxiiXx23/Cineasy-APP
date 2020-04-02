import React from 'react';
import { FlatList, ActivityIndicator, View, Image, StyleSheet, Alert, ToastAndroid, Text, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Detalhes from './detalhes';
import Trailler from './trailler';
import ip from '../components/ip';
import { TouchableHighlight } from 'react-native-gesture-handler';
console.disableYellowBox = true;

class EmCartaz extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true, load: 2 }
    }
    Loading = () => {
        if (this.onEndReachedThreshold < 0, 1) {
            this.setState({
                load: 10
            })
        }
    }
    componentDidMount() {
        const api = ip;
        return fetch('http://' + api + ':3000/filmes/films/2')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {

                });
            })
            .catch((error) => {
                //console.error(error);
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
    }

    _detalhes = async () => {
        this.props.navigation.navigate('Details');
        console.log('confimacao')
    };

    render() {
        const api = ip;
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#FFD700" />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#191919' }}>
                <FlatList
                    numColumns={2}
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <TouchableHighlight onPress={() => {
                            this.props.navigation.navigate('Details', {
                                itemId: item.id_films,
                            });
                        }}>
                            <View style={{ backgroundColor: '#191919', height: 240, borderColor: 'transparent' }} >
                                <View style={{ backgroundColor: '#191919', height: 250, marginLeft: 5 }} >
                                    <Image source={{ uri:'http://' + api + ':3000/filmes/poster/' + item.foto }} style={{ height: 240, width: 200 }} /></View>
                            </View>
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.id_films}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#191919'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    textCat: {
        fontWeight: 'bold',
        color: 'white',
        marginHorizontal: 2
    }

})
const RootStack = createStackNavigator(
    {
        Emcartaz: EmCartaz,
        Details: Detalhes,
        Trailer: Trailler
    },
    {
        initialRouteName: 'Emcartaz',
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(RootStack);

export default class Cartaz extends React.Component {
    render() {
        return <AppContainer />;
    }
}