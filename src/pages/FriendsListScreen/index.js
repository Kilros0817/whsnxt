import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, TextInput, ScrollView, SafeAreaView } from "react-native"
import { ConvertToUrlForm } from "../../Util/Util";
import { accountUrl } from "../../constants/BaseUrl";

const { width, height } = Dimensions.get('screen');
let userImages = [
  require('./user1.png'),
  require('./user2.png'),
  require('./user3.png'),
  require('./user4.png'),
  require('./user5.png'),
  require('./user6.png'),
  require('./user7.png'),
];

const _friendsList = [
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
  { name: 'Magnolia', content: 'Commented on your post "Nice video"', time: '3 hours ago' },
];

export default function FriendsListScreen({ navigation, route }) {

  const [friendsList, setFriendsList] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(route.params?.id);
   // setFriendsList(_friendsList);
   getFriendList();
  }, []);

  const getFriendList = async () =>{
    const obj =  ConvertToUrlForm({
      func: "fetch_friends",
      user_id: userId
    });
    const data =  await fetch(accountUrl, { 
     method: 'POST', 
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/x-www-form-urlencoded',
     }, 
     body: obj 
   }).then(response => response.json())
     .then(responseData => {
      console.log("responseData", responseData);
         const data = responseData && responseData.data?responseData.data:[];
         return data;
     })
     .catch(err => {
       console.log("catch", err);
     });
     setFriendsList(data)
 }

  clearNotifications = () => {
    setFriendsList([]);
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { navigation.goBack() }}
        />
        <Text style={styles.Txt432}>Friends</Text>
        <Image source={require('./i_search.png')} style={{ position: 'absolute', right: 0, top: 5 }} onTouchEnd={() => navigation.navigate('UserSearch')} />
      </View>
      <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: 'column', height: height, paddingTop: 20 }} >
        {friendsList?.map((notification, index) => {
          return (
            <View style={{ width: '100%', height: 75, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 20 }} key={index} onTouchEnd={() => navigation.navigate('Chat')}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={userImages[index % 6]} />
                  <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{notification.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
      {friendsList.length == 0 && <Text style={{ fontSize: 16, color: 'white', alignSelf: 'center', position: 'absolute', top: '40%', zIndex: 1 }}>You have no friend</Text>}
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
