import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Clipboard,
  AsyncStorage,
  StyleSheet
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import PushController from "../app/PushController";
import firebaseClient from  "../app/FirebaseClient";

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
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      tokenCopyFeedback: ""
    }
  }

  render(){

    let { token, tokenCopyFeedback } = this.state;

    return (
      <View {...this.props}  style={styles.container}>
        <PushController
          onChangeToken={async(token) => {
            try{
              const value = await AsyncStorage.getItem('@CheckHallStore:pushToken');
              console.log("pretokenKey" + value)

              console.log("copy token to AsyncStorage ", token);
              await AsyncStorage.setItem('@CheckHallStore:pushToken', token);
            } catch (error) {
              console.log("copy token to AsyncStorage error ", error);
            }
          }}
        />

        <Text>Launch page</Text>
        <Button onPress={Actions.mainscene}>시작하기</Button>
        <Button onPress={Actions.pop}>종료하기</Button>
      </View>
    );
  }
}

module.exports = Launch;
