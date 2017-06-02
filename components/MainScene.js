import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'red',
  }
});

class MainScene extends React.Component {

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <Text>MainScene page</Text>
        <Button onPress={Actions.pop}>back</Button>
      </View>
    );
  }
}

module.exports = MainScene;
