import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Clipboard,
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
          onChangeToken={token => this.setState({token: token || ""})}
        />
        <Text selectable={true} onPress={() => this.setClipboardContent(this.state.token)}>
          Token: {this.state.token}
        </Text>
        <Text >
          {this.state.tokenCopyFeedback}
        </Text>

        <TouchableOpacity onPress={() => firebaseClient.sendNotification(token)} >
          <Text>Send Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => firebaseClient.sendData(token)} >
          <Text >Send Data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => firebaseClient.sendNotificationWithData(token)} >
          <Text >Send Notification With Data</Text>
        </TouchableOpacity>

        <Text>Launch page</Text>
        <Button onPress={Actions.mainscene}>시작하기</Button>
        <Button onPress={Actions.pop}>종료하기</Button>
      </View>
    );
  }
}

module.exports = Launch;
