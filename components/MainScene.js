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

var DEFAULT_URL = 'http://www.checkhall.com/member/login.jsp';

class MainScene extends React.Component {
  constructor(props) {
    super(props);
    console.log("[MainScene] props = "+  JSON.stringify(props) );
    if (props.linkUrl != null){
      DEFAULT_URL = props.linkUrl;
    }
  }

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
          ref={webview => { this.webview = webview; }}
          style={styles.webView}
          automaticallyAdjustContentInsets={false}
          source={{uri: DEFAULT_URL}}
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

  parsingDeviceId = (param) => {
    console.log("[MainScene] parsing DeviceId param", param);
    deviceid = param.replace('function f_get_idx(){\n\tconsole.log("{\\"idx\\":\\"','');
    deviceid = deviceid.replace('\\"}");\t\n}','');
    console.log("[MainScene] parsing DeviceId result", deviceid);
    return deviceid;
  };

  onMessage = (message) => {
    if (typeof(message.nativeEvent.data) != 'undefined' && message.nativeEvent.data != null){
      console.log("[MainScene] onMessage ", message.nativeEvent.data);
      if(message.nativeEvent.data.indexOf("f_get_idx") > 0 ){
        this.postTokenId(this.parsingDeviceId(message.nativeEvent.data));
      }
    }
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
    if(navState.url == "http://www.checkhall.com/plan/search/"){
      console.info("[MainScene] call injectJavaScript ", navState);
      this.webview.injectJavaScript("window.postMessage(window.f_get_idx);");
    }
  };

  postTokenId = async(deviceid) => {
    var tokenValue = "";
    var deviceUniqueValue = "";
    try{
        tokenValue = await AsyncStorage.getItem('@CheckHallStore:pushToken');
        deviceUniqueValue = await AsyncStorage.getItem('@CheckHallStore:deviceUniqueId');
        console.log("[MainScene] tokenValue ", tokenValue);
        console.log("[MainScene] deviceUniqueValue ", deviceUniqueValue);
    } catch(error) {
        console.log("[MainScene] getDeviceTokenId error ", error);
        return;
    }

    var params = {
      'idx': deviceid,
      'device_id': deviceUniqueValue,
      'push_type': 'fcm',
      'push_token': tokenValue
    };

    console.log("[MainScene] postTokenId params ", params);

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
        console.info("[MainScene] setPushToken result ", response);
      })
      .catch((error) => {
        console.error("[MainScene] setPushToken error ",error);
      });
  };


  onShouldStartLoadWithRequest = (event) => {
    console.log("[MainScene] onShouldStartLoadWithRequest ", event);
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
