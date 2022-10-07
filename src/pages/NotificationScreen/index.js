import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, TextInput, ScrollView, SafeAreaView, Platform } from "react-native"
import { ConvertToUrlForm } from "../../Util/Util";
import { accountUrl } from "../../constants/BaseUrl";
const { width, height } = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;
let userImages = [
]

const _notifications = [
];

export default function NotificationScreen({ navigation, route }) {

  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(route.params?.id);
   // setNotifications(_notifications);
   console.log(route.params.id)
    getNotification();
  }, [])

  const getNotification = async () =>{
    const obj =  ConvertToUrlForm({
      func: "fetch_user_notifications",
      user_id: userId
    });
    const data =  await fetch(accountUrl, { 
     method: 'POST', 
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/x-www-form-urlencoded',
     }, 
     body: obj 
   })
     .then(response => response.json())
     .then(responseData => {
         console.log("responseData", responseData);
         const data = responseData && responseData.data?responseData.data:[];
         return data;
     })
     .catch(err => {
       console.log("catch", err);
     });
     setNotifications(data !==undefined?data:[])
    console.log("data", data);
 }

  clearNotifications = () => {
    setNotifications([]);
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { { navigation.goBack(); } }}
        />
        <Text style={styles.Txt432}>Notifications</Text>
        <Text style={styles.Txt433} onTouchEnd={() => clearNotifications()}>Clear</Text>
      </View>
      <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: 'column', height: height }} >
        {notifications.map((notification, index) => {
          return (
            <View style={{ width: '100%', height: 75, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 20 }} key={index}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={userImages[index % 6]} />
                  <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{notification.name}</Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>{notification.content}</Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>{notification.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
      {notifications.length == 0 && <Text style={{ fontSize: 16, color: 'white', alignSelf: 'center', position: 'absolute', top: '40%', zIndex: 1 }}>You have no notifications</Text>}
      <View style={{ flexDirection: 'row', position: 'absolute', height: width / 5, width: width, backgroundColor: 'white', opacity: .9, bottom: bottomNavBarHeight, alignItems: 'center', justifyContent: "space-around", paddingBottom: 20 }}>
        <Image source={require('./i_navbar1.png')} onTouchEnd={() => navigation.navigate('Home')} />
        <View onTouchEnd={() => navigation.navigate('Chatlist')}><Image source={require('./i_navbar2.png')} /><View style={styles.iconNumber}><Text style={{ fontSize: 7, color: 'white' }}>12</Text></View></View>
        <View><Image source={require('./i_navbar3.png')} onTouchEnd={() => navigation.navigate('Notification')} />{notifications.length !== 0 && <View style={styles.iconNumber}><Text style={{ fontSize: 7, color: 'white' }}>{notifications.length}</Text></View>}</View>
        <Image source={require('./i_navbar4.png')} onTouchEnd={() => navigation.navigate('EditProfile')} />
      </View>
    </SafeAreaView >
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
  Txt433: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    lineHeight: 30,
    color: "#1455F5",
    position: 'absolute',
    right: 20
  },
  iconNumber: {
    backgroundColor: 'red',
    width: 16, height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -5,
    right: 0,
    textAlign: 'center',
    paddingLeft: 3,
    paddingTop: 1
  },
})
