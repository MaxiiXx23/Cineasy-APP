import React, { Component } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, Alert,ToastAndroid } from 'react-native';
import ip from './ip';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class Modaloptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTitleStyle: {
            color: 'white'
        },

    };
    _Alertdeletar = async () => {
        Alert.alert(
            'Deseja realmente apagar este comentário?',
            '',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {text: 'OK', onPress: this._deletar},
            ],
            { cancelable: false }
        )
    }
    _deletar = async () => {
        const { navigation } = this.props;
        const api = ip;
        const idcomentario = navigation.getParam('id', 'NO-ID');
        fetch(`http://${api}:3000/comentarios/deletar/`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IdComentario: idcomentario,
            })
        }).catch((error) => {
            //console.error(error);
            ToastAndroid.showWithGravity(
                'Falha ao deletar comentário.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        });
        ToastAndroid.showWithGravity(
            'Comentário deletado.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
        this.props.navigation.navigate('comentario');
        //this.props.navigation.goBack()
    }
    _
    _navegaUpdate = async () => {
        const { navigation } = this.props;
        const idcomentario = navigation.getParam('id', 'NO-ID');
        this.props.navigation.navigate('editar', {
            id: idcomentario,
        });
    }
    render() {
        const w = Dimensions.get("window");
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                <View style={{ width: w.width, height: (w.height) / 2, backgroundColor: "#191919", justifyContent: "center" }}>
                    <Button
                        onPress={this._Alertdeletar}
                        title="Dismiss"
                    />
                    <Button
                        onPress={this._navegaUpdate}
                        title="navega"
                    />
                    <Icon name="thumb-up" size={20} style={styles.btnIcon} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    btnIcon: {
        color: 'yellow'
    }
});