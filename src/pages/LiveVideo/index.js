import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, ScrollView, TextInput, SafeAreaView } from "react-native"

const { width, height } = Dimensions.get('screen');

export default function LiveVideoScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ImageBackground source={require('./background.png')} style={{ width: width, height: height, zIndex: -1 }}>
        <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 30 }}>
          <Image source={require('./user_you.png')} />
          <View style={{ flexDirection: 'column', marginLeft: 20 }}>
            <Text style={{ fontSize: 18, color: 'black' }}>John King</Text>
            <Text style={{ fontSize: 9, color: 'black' }}>2 hours ago</Text>
          </View>
          <View style={{ backgroundColor: '#FF0000', borderRadius: 10, paddingHorizontal: 10, height: 30, alignSelf: 'center', marginLeft: 20 }}><Text style={{ color: 'black', alignSelf: 'center' }}>Live</Text></View>
          <View onTouchEnd={() => navigation.goBack()} style={{ alignSelf: 'center', position: 'absolute', right: 30 }}><Text style={{ alignSelf: 'center', fontSize: 30 }}>X</Text></View>
        </View>
        <View style={{ flexDirection: 'column', position: 'absolute', left: 30, bottom: 130 }}>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 80, flexDirection: 'row', paddingRight: 20, marginBottom: 30 }}>
            <Image source={require('./user1.png')} />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={{ fontSize: 12, color: '#2F2D2D' }}>Amir</Text>
              <Text style={{ fontSize: 14, color: 'black' }}>Awesome.LOve it</Text>
            </View>
          </View>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 80, flexDirection: 'row', paddingRight: 20, marginBottom: 30 }}>
            <Image source={require('./user2.png')} />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={{ fontSize: 12, color: '#2F2D2D' }}>Amir</Text>
              <Text style={{ fontSize: 14, color: 'black' }}>Awesome.LOve it</Text>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 70, width: '70%', marginHorizontal: 30 }}>
          <TextInput
            style={{ marginLeft: 10, backgroundColor: 'white', borderRadius: 20, paddingLeft: 20 }}
            placeholder={"Write a comment."}
            placeholderTextColor="grey"
          />
          <Image source={require('./i_send.png')} style={{ position: 'absolute', right: -50, top: 5 }} />
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
