import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  WebView
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";


var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'http://www.checkhall.com';

class MainScene extends React.Component {
  state = {
      url: DEFAULT_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
  };

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <WebView
          ref={WEBVIEW_REF}
          style={styles.webView}
          automaticallyAdjustContentInsets={false}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          onMessage={this.onMessage}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
      </View>
    );
  }

  onMessage = (message) => {
    console.log("onMessage ", "1231412312");
    console.log("onMessage ", message);
    // Implement any custom loading logic here, don't forget to return!
  };

  onNavigationStateChange = (navState) => {
    //console.log("onNavigationStateChange ", navState);
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
    this.postTokenId("A0D9C7C23491D46E04E4BF0CBAD7BAD7");

  };

  postTokenId = async(deviceid) => {
    var tokenValue = "";
    try{
        tokenValue = await AsyncStorage.getItem('@CheckHallStore:pushToken');
        console.log("getDeviceTokenId " + tokenValue);
    } catch(error) {
        console.log("getDeviceTokenId error ", error);
        return;
    }

    var params = {
      'idx': deviceid,
      'device_id': '0f365b39-c33d-39be-bdfc-74aaf5534470',
      'push_type': 'fcm',
      'push_token': tokenValue
    };

    console.log("postTokenId params ", params);

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    var request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    };
    fetch("http://m.checkhall.com/member/setPushToken.jsp", request)
      .then((response) =>{
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  onShouldStartLoadWithRequest = (event) => {
    console.log("onShouldStartLoadWithRequest ", event);
    // Implement any custom loading logic here, don't forget to return!
    return true;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b5998",
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  }
});

module.exports = MainScene;
