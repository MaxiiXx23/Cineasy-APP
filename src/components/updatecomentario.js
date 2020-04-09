import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableHighlight, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ip from './ip';
export default class Updatecomentario extends Component {
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTitleStyle: {
            color: 'white'
        },

    };
    constructor(props) {
        super(props);
        this.state = {
            TextInputComentar: ''
        };
    }
    _comentarUpdate = async () => {
        const api = ip;
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        //console.log(idcomentario)
        if (this.state.TextInputComentar == '') {
            ToastAndroid.showWithGravity(
                'Campo vazio.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        } else {
            fetch(`http://${api}:3000/comentarios/update`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comentario: this.state.TextInputComentar,
                    IdComentario: id,
                }),
            }).catch((error) => {
                //console.error(error);
                ToastAndroid.showWithGravity(
                    'Falha na conexão.',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            });
            ToastAndroid.showWithGravity(
                'Comentário editado com sucesso.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            this.props.navigation.navigate('comentários');
        }
    }

    render() {
        const w = Dimensions.get("window");
        return (
            <View style={{ flex: 1, backgroundColor: "#191919" }}>
                <View style={{ width: w.width, height: (w.height) / 2, backgroundColor: "#191919", justifyContent: "center" }}>
                    <View style={styles.form}>
                        <TextInput style={styles.input} placeholder="Comentário..."
                            placeholderTextColor="white"
                            multiline={true}
                            onChangeText={(TextInputComentar) => this.setState({ TextInputComentar })}
                            value={this.state.TextInputComentar}
                        />
                        <TouchableHighlight
                            onPress={this._comentarUpdate}
                            style={styles.btnClickContain}
                            underlayColor='black'>
                            <View
                                style={styles.btnContainer}>
                                <Icon
                                    name='send'
                                    size={35}
                                    color='white'
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#303030',
        color: 'white',
        borderWidth: 1,
        borderBottomColor: '#303030',
        borderRadius: 5,
        width: '88%',
        marginTop: 0
    },
    btnClickContain: {
        backgroundColor: '#191919',
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        width: 50,
        height: 50
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        borderRadius: 10,
    },
    form:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',

    }
});