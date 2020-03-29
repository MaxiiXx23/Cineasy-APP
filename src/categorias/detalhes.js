import React from 'react';
import { View, Text, Button,TouchableHighlight } from 'react-native';
import ip from '../components/ip'
import YouTube from 'react-native-youtube';
export default class Detalhes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dadosFilme: [],
            statusplay:true
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const idFilme = navigation.getParam('itemId', 'NO-ID');
        //console.log(idFilme)
        const api = ip;
        return fetch('http://' + api + ':3000/filmes/detalhes/' + idFilme)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    nome: responseJson[0].nome,
                    trailler:responseJson[0].trailler
                }, function () {

                });
                console.log(this.state.nome)
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
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{this.state.nome}</Text>
                <YouTube
                    videoId={this.state.trailler} // The YouTube video ID
                    apiKey="AIzaSyANHo2FO1TIvJX49TJT_CYjmZWFFt3XMNk"
                    play={this.state.statusplay}
                    fullscreen={true}
                    style={{ alignSelf: 'stretch', height: 300 }}
                />
            </View>
        );
    }
}
