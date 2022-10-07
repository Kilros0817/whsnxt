import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, ScrollView, TextInput, SafeAreaView } from "react-native"
import { validateMeeting } from "../../api";
import { notifyMessage } from "../../utils";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingContainer from "../../components/MeetingContainer";
import { token } from "../../api";

const { width, height } = Dimensions.get('screen');

export default function VideoCallScreen({ navigation, route }) {

 // const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");

  useEffect(()=>{
    console.log("route", route);
  //  setToken(route.params?.token);
    setMeetingId(route.params?.meetingId);
    validateMeetingId();
  }, []);

  const validateMeetingId = async () => {
    if (meetingId) {
      const meetingId = await validateMeeting({ meetingId: meetingId, token: token });
      setMeetingId(meetingId);
      if (!token && !meetingId) {
        notifyMessage("Token or Meeting Id is invalid");
      }
    } else {
      notifyMessage("Please provide meetingId in textinput");
    }
  };

  const resetMeeting = () => {
    navigation.goBack();
  };

  console.log("meetingId", meetingId);
  console.log("token", token);

  return token && meetingId ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: "Test User",
          notification: {
            title: "Code Sample",
            message: "Meeting is running.",
          },
        }}
        token={token}
      >
        <MeetingContainer resetMeeting={resetMeeting} />
      </MeetingProvider>
    </SafeAreaView>
  ): (
    <SafeAreaView>
      <ImageBackground source={require('./user_me.png')} style={{ width: width, height: height, zIndex: -1 }}>
        <Image source={require('./logo.png')} style={{ position: 'absolute', left: 40, top: 40 }} />
        <Image source={require('./user_you.png')} style={{ position: 'absolute', right: 40, top: 40 }} />
        <Image source={require('./logo.png')} style={{ position: 'absolute', left: 40, top: 40 }} />
        <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold', position: 'absolute', bottom: 200, alignSelf: 'center' }}>Johny </Text>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', position: 'absolute', bottom: 180, alignSelf: 'center' }}>Calling... </Text>
        <View style={{ flexDirection: 'row', position: 'absolute', width: '100%', alignItems: 'center', bottom: 100, justifyContent: 'space-around', paddingHorizontal: 60 }}>
          <Image source={require('./i_audio.png')} />
          <Image source={require('./i_call.png')} onTouchEnd={() => navigation.navigate('Chat')} />
          <Image source={require('./i_voice.png')} />
        </View>
      </ImageBackground>
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
