import React from 'react';
import { Button, Text, Header, Body, Icon, Title } from 'native-base';
import { StyleSheet, View } from 'react-native';
import Layout from './Layout';

export default class App extends React.Component {
  static navigationOptions = {
    header: () => (
      <Header>
        <Body>
          <Title>Video recorder</Title>
        </Body>
      </Header>
    )
  };

  render() {
    return (
      <Layout style={styles.container}>
        <View style={styles.actionButtons}>
          <Button primary onPress={() => this.props.navigation.navigate('VideoRecorder')}>
            <Text>Record Video</Text>
          </Button>
          <Button primary onPress={() => this.props.navigation.navigate('MyVideos')}>
            <Text>My Videos</Text>
          </Button>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
