import React, { Component } from 'react';
import { View, Text, Button,Dimensions,StyleSheet,TouchableHighlight } from 'react-native';
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
    _navegaUpdate = async () =>{
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
                <View style={{  width: w.width, height: (w.height)/2, backgroundColor: "#191919", justifyContent: "center" }}>
                    <Button
                        onPress={() => this.props.navigation.goBack()}
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
    btnIcon:{
        color:'yellow'
    }
  });