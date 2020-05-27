
import React from 'react';
import { FlatList, Image, ActivityIndicator, Text, View, Dimensions, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Thumbnail, Left, Body, Right } from 'native-base';
import ip from '../components/ip';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      api: ip,
      page: 2,
      pause: true,
      fullscreen: false,
      idUser: ''
    }
  }

  componentDidMount() {
    this.loadRepositories();
    //this._tipoArquivo();
    this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
      this.loadRepositories();
    })
  }
  componentWillUnmount() {
    this.willBlurListener.remove();
  }
  loadRepositories = async () => {
    if (this.state.loading) return;
    const id = await AsyncStorage.getItem('idUsuario');
    this.setState({
      idUser: id
    })
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
      }).catch((error) => {
        //console.error(error);
        ToastAndroid.showWithGravity(
          'Falha na conexão.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
  }
  lastTap = null;
  _handleDoubleTap = async () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    const api = ip;
    const idUser = this.state.idUser
    const idPost = this.state.id
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      return fetch('http://' + api + ':3000/posts/confirmalike/' + idUser + '/' + idPost)
        .then((response) => response.json())
        .then((json) => {
          if (json.mensagem == '1') {
            this._deleteCurtida();
          } else {
            this._curtir();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.lastTap = now;
    }
  }
  _deleteCurtida = async () => {
    const api = ip;
    const idUser = this.state.idUser
    const idPost = this.state.id
    fetch(`http://${api}:3000/posts/deletelike`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id_usuario: idUser,
        Id_post: idPost,
      }),
    }).then((response) => response.json())
      .then((json) => {
        if (json.mensagem == '1') {
          ToastAndroid.showWithGravity(
            'Descurtido',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      }).catch((error) => {
        ToastAndroid.showWithGravity(
          'Falha na conexão.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
    this.loadRepositories();
  }

  _curtir = async () => {
    const api = ip;
    const idUser = this.state.idUser
    const idPost = this.state.id
    fetch(`http://${api}:3000/posts/addlike`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id_usuario: idUser,
        Id_post: idPost,
      }),
    }).then((response) => response.json())
      .then((json) => {
        if (json.mensagem == '1') {
          this._addlike();
        }
      }).catch((error) => {
        ToastAndroid.showWithGravity(
          'Falha ao curtir',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
    this.loadRepositories();
  }
  _addlike = async () =>{
    const api = ip;
    const like = this.state.like
    const idPost = this.state.id
    fetch(`http://${api}:3000/posts/like`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        like: like,
        id_post: idPost,
      }),
    }).then((response) => response.json())
      .then((json) => {
        if (json.mensagem == '1') {
          ToastAndroid.showWithGravity(
            'Post curtido',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      }).catch((error) => {
        ToastAndroid.showWithGravity(
          'Falha ao curtir',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
  }
  _pause = async () => {
    this.setState({
      pause: false
    })
  }
  _fullScrenn = async () => {
    this.setState({
      fullscreen: true
    })
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
    const w = Dimensions.get("window");
    return (
      <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#191919' }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
            if (item.tipo_file == 'image/jpeg' || item.tipo_file == 'image/png' || item.tipo_file == 'image/gif') {
              return <Card style={styles.card} >
                <CardItem style={styles.card} >
                  <Left>
                    <Thumbnail source={{ uri: 'http://' + this.state.api + ':3000/fotoperfil/cinr.jpg' }} />
                    <Body>
                      <Text style={{ fontWeight: 'bold', color: "#fff" }}>Cinemark</Text>
                      <Text style={{ color: "#fff" }} note>{item.note}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem style={{ borderRadius: 15 }} cardBody>
                  <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                      like: item.qntLikes,
                      id: item.id_post
                    }); this._handleDoubleTap();
                  }}>
                    <Image source={{ uri: 'http://' + api + ':3000/posts/' + item.img_post }} style={{ width: w.width, height: w.width, flex: 1, borderRadius: 15 }} />
                  </TouchableWithoutFeedback>
                </CardItem>
                <CardItem style={styles.card}>
                  <Left>

                    <TouchableHighlight onPress={() => {
                      this.setState({
                        like: item.qntLikes,
                        id: item.id_post
                      }); this._handleDoubleTap();
                    }}
                      style={styles.btnLike}
                      underlayColor='black'
                    >
                      <View style={styles.btnContainer}>
                        <Icon name="thumb-up" size={20} style={styles.btnIcon} />
                        <Text style={{ marginTop: 4, color: "#fff" }}>{item.qntLikes}</Text>
                      </View>
                    </TouchableHighlight>
                  </Left>
                  <Body>
                    <Button transparent onPress={() => this.props.navigation.navigate('Comentários', {
                      itemId: item.id_post,
                      qntComent: item.qntComent
                    })
                    }>
                      <Icon active name='question-answer' size={20} style={styles.btnIcon2} />
                      <Text style={{ marginRight: 45, marginTop: -5, color: "#fff" }}>{item.qntComent}</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text style={{ color: "#fff" }}>{item.data_post}</Text>
                  </Right>
                </CardItem>
              </Card>
            } else {
              return <Card style={styles.card} >
                <CardItem style={styles.card} >
                  <Left>
                    <Thumbnail source={{ uri: 'http://' + this.state.api + ':3000/fotoperfil/cinr.jpg' }} />
                    <Body>
                      <Text style={{ fontWeight: 'bold', color: "#fff" }}>Cinemark</Text>
                      <Text style={{ color: "#fff" }} note>{item.note}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <View style={{ borderRadius: 15, width: 410, height: 400, backgroundColor: '#303030' }}>
                  <TouchableWithoutFeedback onPress={() => {
                    this._pause();
                    this._fullScrenn();
                  }}>
                    <Video source={{ uri: 'http://' + api + ':3000/posts/' + item.img_post }}
                      ref={(ref) => {
                        this.player = ref
                      }}
                      fullscreen={true}
                      controls={true}
                      paused={this.state.pause}
                      onBuffer={this.onBuffer}
                      onError={this.videoError}
                      style={styles.backgroundVideo} />
                  </TouchableWithoutFeedback>
                </View>
                <CardItem style={styles.card}>
                  <Left>

                    <TouchableHighlight onPress={() => {
                      this.setState({
                        like: item.qntLikes,
                        id: item.id_post
                      }); this._handleDoubleTap();
                    }}
                      style={styles.btnLike}
                      underlayColor='black'
                    >
                      <View style={styles.btnContainer}>
                        <Icon name="thumb-up" size={20} style={styles.btnIcon} />
                        <Text style={{ marginTop: 4, color: "#fff" }}>{item.qntLikes}</Text>
                      </View>
                    </TouchableHighlight>
                  </Left>
                  <Body>
                    <Button transparent onPress={() => this.props.navigation.navigate('Comentários', {
                      itemId: item.id_post,
                      qntComent: item.qntComent
                    })
                    }>
                      <Icon active name='question-answer' size={20} style={styles.btnIcon2} />
                      <Text style={{ marginRight: 45, marginTop: -5, color: "#fff" }}>{item.qntComent}</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text style={{ color: "#fff" }}>{item.data_post}</Text>
                  </Right>
                </CardItem>
              </Card>
            }
          }
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
  },
  btnLike: {
    height: 40,
    width: 60
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 2,
  },
  btnIcon: {
    height: 50,
    width: 35,
    marginTop: 5,
    color: '#FFD700'
  },
  btnIcon2: {
    height: 50,
    width: 35,
    marginTop: 23,
    color: '#FFD700'

  },
  backgroundVideo: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1
  },
})
