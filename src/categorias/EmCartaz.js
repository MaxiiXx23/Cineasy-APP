import React from 'react';
import { FlatList, ActivityIndicator, View, Image, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import ip from '../components/ip';
console.disableYellowBox = true;
export default class EmCartaz extends React.Component {

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
        return fetch('http://' + api + ':3000/filmes/films/5')
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



    render() {

        if (this.state.isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#FFD700" />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#000000' }}>
                <FlatList
                    numColumns={2}
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: '#000000', height: 240, borderColor: 'transparent' }} >
                            <View style={{ backgroundColor: '#000000', height: 250, marginLeft: 5 }}><Image source={{ uri: item.foto }} style={{ height: 300, width: 200 }} /></View>
                        </View>
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
        backgroundColor: '#000000'
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