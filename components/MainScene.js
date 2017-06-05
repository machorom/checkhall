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
    console.log("onMessage ", message);
    // Implement any custom loading logic here, don't forget to return!
  };

  onNavigationStateChange = async(navState) => {
    console.log("onNavigationStateChange ", navState);
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
    try{
        const value = await AsyncStorage.getItem('@CheckHallStore:pushToken');
        console.log("pushToken " + value);
    } catch(error) {
      console.log("getPushToken error ", error);
    }
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
