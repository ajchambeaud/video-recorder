import React from 'react';
import { Button, Text, Header, Body, Icon, Title, Left, Right, Card, CardItem } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { FileSystem, Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import Layout from './Layout';
import shortid from 'shortid';

class RedirectTo extends React.Component {
  componentDidMount() {
    const { scene, navigation } = this.props;
    navigation.navigate(scene);
  }

  render() {
    return <View />;
  }
}

export default class MyVideos extends React.Component {
  static navigationOptions = {
    header: () => (
      <Header>
        <Body>
          <Title>My videos</Title>
        </Body>
      </Header>
    )
  };

  state = {
    videos: [],
    play: null,
    redirect: false
  };

  async componentDidMount() {
    const videos = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'videos');
    this.setState({ videos: videos.reverse() });
  }

  playVideo(video) {
    this.setState({ play: video });
  }

  render() {
    const { videos, play, redirect } = this.state;

    if (redirect) {
      return <RedirectTo scene={redirect} navigation={this.props.navigation} />;
    }

    return (
      <Layout style={styles.container}>
        <View style={styles.videoContainer}>
          {play && (
            <VideoPlayer
              videoProps={{
                shouldPlay: true,
                source: {
                  uri: `${FileSystem.documentDirectory}videos/${play}`
                }
              }}
              isPortrait={true}
              key={shortid.generate()}
            />
          )}

          <Card>
            {videos.map(video => (
              <CardItem key={video}>
                <Left>
                  <Text>{video}</Text>
                </Left>
                <Right>
                  <Button danger onPress={() => this.playVideo(video)}>
                    <Icon ios="ios-play" android="md-play" />
                  </Button>
                </Right>
              </CardItem>
            ))}
          </Card>
        </View>
        <View style={styles.actionButtons}>
          <Button iconRight small onPress={() => this.setState({ redirect: 'Home' })}>
            <Text>Back to</Text>
            <Icon ios="ios-home" android="md-home" />
          </Button>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  videoContainer: {
    flexDirection: 'column',
    flexGrow: 1
  }
});
