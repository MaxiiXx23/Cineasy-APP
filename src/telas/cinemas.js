import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image,
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'
import { PermissionsAndroid } from 'react-native';

import Geocoder from 'react-native-geocoding';

const GOOGLE_MAPS_APIKEY = 'AIzaSyANHo2FO1TIvJX49TJT_CYjmZWFFt3XMNk';

const backgroundColor = '#007256';

const { height, width } = Dimensions.get('window');

export default class Cinemas extends React.Component {

    state = {

        origin: { latitude: 42.3616132, longitude: -71.0672576 },
        destination: { latitude: 42.3730591, longitude: -71.033754 },
        originText: '',
        destinationText: '',
        longitude: '',
        latitude: '',
        KeyApiMaps : 'AIzaSyANHo2FO1TIvJX49TJT_CYjmZWFFt3XMNk'

    };

    async requestLocationPermission() {
        try {

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'App Location Permission',
                    'message': 'Maps App needs access to your map ' +
                        'so you can be navigated.'
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                return true;

            } else {
                console.log("location permission denied");
                return false;
            }

        } catch (err) {
            console.warn(err)
        }

    }

    async componentDidMount() {
        Geolocation.getCurrentPosition(info => {
            this.setState({
                origin:{latitude: info.coords.latitude, longitude: info.coords.longitude}
            })
            //console.log(this.state.origin)
        }

        );
    }
    handleButton = () => {

        if (this.state.originText != '') {

            Geocoder.init(GOOGLE_MAPS_APIKEY); // use a valid API key

            Geocoder.from(this.state.originText)
                .then(json => {
                    var location = json.results[0].geometry.location;
                    console.log(location);
                    this.setState({ origin: { latitude: location.lat, longitude: location.lng } });

                })
                .catch(error => console.warn(error));

        }

        else {

            alert("Digite a origem ! ")

        }

        if (this.state.destinationText != '') {

            Geocoder.init(GOOGLE_MAPS_APIKEY); // use a valid API key

            Geocoder.from(this.state.destinationText)
                .then(json => {
                    var location = json.results[0].geometry.location;
                    console.log(location);
                    this.setState({ destination: { latitude: location.lat, longitude: location.lng } });

                })
                .catch(error => console.warn(error));
        }

        else {

            alert("Digite o destino ! ")

        }

    }

    handleGetGoogleMapDirections = () => {

        const data = {

            source: this.state.origin,
            destination: this.state.destination,
            params: [
                {
                    key: "travelmode",
                    value: "driving"
                }
            ]

        };

        getDirections(data)

    };

    render() {
        console.log(this.state.origin.latitude)
        return (

            <View style={styles.container}>

                <MapView

                    ref={map => this.mapView = map}
                    style={styles.map}

                    region={{
                        latitude: this.state.origin.latitude,
                        longitude: this.state.origin.longitude,
                        longitudeDelta: 0.0143,
                        latitudeDelta: 0.134
                    }}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    toolbarEnabled={true}
                    zoomControlEnabled={true}

                >
                    <MapViewDirections
                        origin={this.state.origin}
                        destination={this.state.destination}
                        apikey={this.state.KeyApiMaps}
                    />

                </MapView>

            </View>

        );

    }

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },

    map: {

        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },

    button: {

        width: width - 100,
        height: 40,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 7,
        marginBottom: 15,
        marginHorizontal: 20,

    },

    buttonText: {

        color: '#000',
        fontWeight: 'bold',

    },

    inputContainer: {

        width: '100%',
        maxHeight: 200,

    },

    input: {

        width: width - 40,
        maxHeight: 200,
        backgroundColor: '#FFF',
        marginBottom: 15,
        marginHorizontal: 20,

    },

});