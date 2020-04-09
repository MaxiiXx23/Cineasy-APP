import React, { Component } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, Alert, ToastAndroid,TouchableHighlight } from 'react-native';
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
                { text: 'OK', onPress: this._deletar },
            ],
            { cancelable: false }
        )
    }
    _deletar = async () => {
        const { navigation } = this.props;
        const api = ip;
        const idcomentario = navigation.getParam('id', 'NO-ID');
        const idPost = navigation.getParam('idPostModal', 'NO-ID');
        const qntComentarios = navigation.getParam('qntComentModal', 'NO-ID')
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
        fetch(`http://${api}:3000/posts/qntcomentnova/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qntcoment: qntComentarios,
                id_post: idPost,
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
        this.props.navigation.navigate('comentários');
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
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ width: w.width, height: (w.height) / 4, backgroundColor: "#191919",justifyContent:'center',alignContent:'space-between' }}>
                    <TouchableHighlight
                        onPress={this._Alertdeletar} style={styles.btnClickContain}
                        underlayColor='#FF0000'>
                        <View
                            style={styles.btnContainer}>
                            <Icon
                                name='delete-sweep'
                                size={25}
                                color='#FFFFFF'
                                style={styles.btnIcon} />
                            <Text style={styles.btnText}>Deletar comentário</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this._navegaUpdate} style={styles.btnClickContain2}
                        underlayColor='#042417'>
                        <View
                            style={styles.btnContainer}>
                            <Icon
                                name='edit'
                                size={25}
                                color='#FFFFFF'
                                style={styles.btnIcon} />
                            <Text style={styles.btnText2}>Atualizar comentário</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    btnClickContain: {
        width:'55%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        backgroundColor: '#FF0000',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        marginLeft:'22%'
      },
      btnClickContain2: {
        width:'55%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        backgroundColor: '#EEC900',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft:'22%'
      },
      btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        borderRadius: 10,
      },
      btnIcon: {
        height: 25,
        width: 25,
      },
      btnText: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 10,
        marginTop: 0,
      },
      btnText2: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 5,
        marginTop: 0,
      }
});