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

class Launch extends React.Component {

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <Text>Launch page</Text>
        <Button onPress={Actions.mainscene}>시작하기</Button>
        <Button onPress={Actions.pop}>종료하기</Button>
      </View>
    );
  }
}

module.exports = Launch;
