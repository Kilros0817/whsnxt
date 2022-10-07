import React, { useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, Switch, SafeAreaView } from "react-native"

const { width, height } = Dimensions.get('screen');

export default function NotificationSettingScreen({ navigation }) {

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);

  toggleSwitch = () => {
    setIsEnabled(!isEnabled)
  }

  toggleSwitch1 = () => {
    setIsEnabled1(!isEnabled1)
  }
  toggleSwitch2 = () => {
    setIsEnabled2(!isEnabled2)
  }
  toggleSwitch3 = () => {
    setIsEnabled3(!isEnabled3)
  }
  toggleSwitch4 = () => {
    setIsEnabled4(!isEnabled4)
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onTouchEnd={(e) => { { e.stopPropagation(); navigation.goBack() } }}
        />
        <Text style={styles.Txt432}>Notification Setting</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 50, marginHorizontal: 10 }}>
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10 }}>Receive direct message</Text>
        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ position: 'absolute', right: 5, alignSelf: 'center' }}
        >
        </Switch>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10 }}>Comments on your profile</Text>
        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch1}
          value={isEnabled1}
          style={{ position: 'absolute', right: 5, alignSelf: 'center' }}
        >
        </Switch>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10 }}>Tag in a post</Text>
        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch2}
          value={isEnabled2}
          style={{ position: 'absolute', right: 5, alignSelf: 'center' }}
        >
        </Switch>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10 }}>Receive friend requests</Text>
        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled3 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch3}
          value={isEnabled3}
          style={{ position: 'absolute', right: 5, alignSelf: 'center' }}
        >
        </Switch>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10 }}>New Booking</Text>
        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled4 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch4}
          value={isEnabled4}
          style={{ position: 'absolute', right: 5, alignSelf: 'center' }}
        >
        </Switch>
      </View>
      <View style={{ position: 'absolute', bottom: 70, left: 20, backgroundColor: '#1455F5', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 10, width: '100%', marginBottom: 50 }} onTouchEnd={() => navigation.goBack()}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
      </View>
    </SafeAreaView>
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
