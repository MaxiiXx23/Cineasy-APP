
import React from 'react';
import { FlatList, Image, ActivityIndicator, Text, View, Alert, StyleSheet, ToastAndroid } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right } from 'native-base';
import ip from '../components/ip';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      api: ip,
      page: 2
    }
  }

  componentDidMount() {
    this.loadRepositories();
  }
  loadRepositories = async () => {
    if (this.state.loading) return;
    const { page } = this.state;
    const api = ip;
    return fetch(`http://${api}:3000/posts/ver/${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          page: page + 1,
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
    const api = ip;
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#191919' }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <Card style={styles.card} >
              <CardItem style={styles.card} >
                <Left>
                  <Thumbnail source={{ uri: 'http://' + this.state.api + ':3000/imgs/1583688845268-images.jpeg' }} />
                  <Body>
                    <Text style={{ fontWeight: 'bold', color: "#fff" }}>{item.nome}</Text>
                    <Text style={{ color: "#fff" }} note>{item.note}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={{ borderRadius: 15 }} cardBody>
                <Image source={{ uri: 'http://' + api + ':3000/posts/' + item.img_post }} style={{ height: 470, width: 300, flex: 1, borderRadius: 15 }} />
              </CardItem>
              <CardItem style={styles.card}>
                <Left>

                  <Button onPress={() => Alert.alert('Poste Curtido')} transparent>
                    <Icon name="thumb-up" size={20} style={{ color: '#FFD700' }} />
                    <Text style={{ marginLeft: 4, color: "#fff" }}>{item.qntLikes}</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent onPress={() => this.props.navigation.navigate('comentario', {
                                itemId: item.id_post,
                            })
                        }>
                    <Icon active name='question-answer' size={20} style={{ color: '#FFD700' }} />
                    <Text style={{ marginRight: 50, color: "#fff" }}>{item.qntComent}</Text>
                  </Button>
                </Body>
                <Right>
                  <Text style={{ color: "#fff" }}>{item.data_post}</Text>
                </Right>
              </CardItem>
            </Card>
          }
          keyExtractor={item => item.id_post.toString()}
          onEndReached={this.loadRepositories}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.1}
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
  card: {
    borderRadius: 20,
    backgroundColor: "#303030",
    borderColor: "#303030"
  }

})
