import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube';
export default class Trailler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusplay:true,
            trailler:''
        };
    }

    render() {
        const { navigation } = this.props;
        const idTrailer = navigation.getParam('trailler');
        return (
            <View style={styles.container}>
                <YouTube
                    videoId={idTrailer} 
                    apiKey="AIzaSyANHo2FO1TIvJX49TJT_CYjmZWFFt3XMNk"
                    play={this.state.statusplay}
                    fullscreen={true}
                    style={{ alignSelf: 'stretch', height: 300 }}
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
    }

})
