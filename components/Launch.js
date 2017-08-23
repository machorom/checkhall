import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Clipboard,
  AsyncStorage,
  StyleSheet,
  Image
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import PushController from "../app/PushController";
import firebaseClient from  "../app/FirebaseClient";
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    marginBottom: 40
  },
  footer: {
    height: 95,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  startButton : {
    width: 350,
    height: 60,
  },
});

class Launch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      tokenCopyFeedback: ""
    }

    FCM.getInitialNotification().then(notif => {
      console.log("[Launch]INITIAL NOTIFICATION", notif);
      if( notif.click_action != null ){
        Actions.mainscene({linkUrl : notif.click_action});
      }
    });

    // this.setDeviceUniqueId(DeviceInfo.getUniqueID());
    // console.log("[Launch] DeviceInfo");
    // console.log("getVersion = " + DeviceInfo.getVersion());
    // console.log("getUniqueID = " + DeviceInfo.getUniqueID());
    // console.log("getManufacturer = " + DeviceInfo.getManufacturer());
    // console.log("getBrand = " + DeviceInfo.getBrand());
    // console.log("getModel = " + DeviceInfo.getModel());
    // console.log("getDeviceId = " + DeviceInfo.getDeviceId());
    // console.log("getSystemName = " + DeviceInfo.getSystemName());
    // console.log("getSystemVersion = " + DeviceInfo.getSystemVersion());
    // console.log("getBundleId = " + DeviceInfo.getBundleId());
    // console.log("getBuildNumber = " + DeviceInfo.getBuildNumber());
    // console.log("getDeviceName = " + DeviceInfo.getDeviceName());
    // console.log("getUserAgent = " + DeviceInfo.getUserAgent());
    console.log("================================================");
  }



  setDeviceUniqueId = async(uniqueId) => {
    if( uniqueId != null ){
      const value = await AsyncStorage.getItem('@CheckHallStore:deviceUniqueId');
      console.log("[Launch]pre deviceUniqueId", value);
      await AsyncStorage.setItem('@CheckHallStore:deviceUniqueId', uniqueId);
      console.log("[Launch]copy deviceUniqueId to AsyncStorage", uniqueId);
    }
  }

  render(){
    let { token, tokenCopyFeedback } = this.state;
    return (
        <Image style={styles.backgroundImage}
            source={require('./image/launcher_bg.png')}>
          <PushController
            onChangeToken={async(token) => {
              try{
                const value = await AsyncStorage.getItem('@CheckHallStore:pushToken');
                console.log("[Launch] pre token ", value)
                console.log("[Launch] copy token to AsyncStorage ", token);
                if (typeof token != "undefined"){
                  await AsyncStorage.setItem('@CheckHallStore:pushToken', token);
                }
              } catch (error) {
                console.log("[Launch] copy token to AsyncStorage error ", error);
              }
            }}
          />
          <View style={styles.container}>
            <View style={[styles.content]} />
            <View style={[styles.footer]}>
              <View style={[styles.box]}>
                <TouchableOpacity onPress={Actions.mainscene}>
                  <Image source={require('./image/bt_start.png')}
                        style={styles.startButton}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Image>
    );
  }
}
module.exports = Launch;
