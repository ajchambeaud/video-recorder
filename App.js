import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';

import Home from './Home';
import MyVideos from './MyVideos';
import VideoRecorder from './VideoRecorder';

const Navigator = StackNavigator({
  Home: {
    screen: Home
  },
  MyVideos: {
    screen: MyVideos
  },
  VideoRecorder: {
    screen: VideoRecorder
  }
});

class Root extends React.Component {
  state = {
    loaded: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;

    console.log('render', loaded);

    return loaded ? <Navigator /> : <View />;
  }
}

export default Root;
