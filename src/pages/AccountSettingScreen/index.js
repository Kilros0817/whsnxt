import React, { useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, Switch } from "react-native"
import { TabRouter } from "react-navigation";

const { width, height } = Dimensions.get('screen');

export default function AccountSettingScreen({ navigation, route }) {

  const [isEnabled, setIsEnabled] = useState(false);

  toggleSwitch = () => {
    setIsEnabled(!isEnabled)
  }

  return (
    <View style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onTouchEnd={(e) => { { navigation.goBack() } }}
        />
        <Text style={styles.Txt432} />
      </View>
      <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 20 }}>Here are your all settings</Text>
      <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 10 }} onTouchEnd={() => navigation.navigate('NotificationSetting')}>
        <Image source={require('./i_notification.png')} />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>Notification</Text>
        <Image source={require('./i_right.png')} style={{ position: 'absolute', right: 0 }} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
        <Image source={require('./i_location.png')} />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>Location</Text>
        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ position: 'absolute', right: 5, alignSelf: 'center' }}
        >
        </Switch>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }} onTouchEnd={() => navigation.navigate('ForgotPasswordEmail', { method: 'change' })}>
        <Image source={require('./i_key.png')} />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>Change Password</Text>
        <Image source={require('./i_right.png')} style={{ position: 'absolute', right: 0 }} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }} onTouchEnd={() => navigation.navigate('EditProfile', { accoutType: route.params?.accoutType, data: route.params?.userData })}>
        <Image source={require('./i_face.png')} />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>Face Recognition</Text>
        <Image source={require('./i_right.png')} style={{ position: 'absolute', right: 0 }} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }} onTouchEnd={() => navigation.navigate('FriendsList', { id: route.params?.id })}>
        <Image source={require('./i_contact.png')} />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>Contact Information</Text>
        <Image source={require('./i_right.png')} style={{ position: 'absolute', right: 0 }} />
      </View>
      <View style={{ position: 'absolute', bottom: 70, left: 20, backgroundColor: '#1455F5', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 10, width: '100%', marginBottom: 50 }} onTouchEnd={() => navigation.goBack()}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "rgba(0,0,0,1)",
    width: width,
    height: height,
  },
  Group642: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
  },
  Group379: {
    position: 'absolute',
    left: 0,
    width: 33.57,
    height: 33.57,
    zIndex: 1,
  },
  Txt432: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    lineHeight: 30,
    color: "rgba(255, 255, 255, 1)",
  },
})
