import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, TextInput, ScrollView } from "react-native"
import { getUser } from "../../redux/actions/user";
import { ConvertToUrlForm } from "../../Util/Util";
import { accountUrl } from "../../constants/BaseUrl";
const { width, height } = Dimensions.get('screen');
let userImages = [
  require('./user1.png'),
  require('./user2.png'),
  require('./user3.png'),
  require('./user4.png'),
  require('./user5.png'),
]

export default function Hot5Screen({ navigation, route }) {

  const [hot5, setHot5] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(route.params?.id);
    getHot5();
  }, [])

  const getHot5 = async () =>{
     const obj =  ConvertToUrlForm({
       func: "hot5_users",
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
        return responseData?.data;
      })
      .catch(err => {
        console.log("catch", err);
      });
     setHot5(data !==undefined?data:[])
     console.log("data", data);
  }

  return (
    <View style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { { navigation.goBack(); } }}
        />
        <Text style={styles.Txt432}>Hot 5</Text>
        <Image source={require('./emojione_fire.png')} style={{ alignSelf: 'center', marginLeft: 10 }} />
      </View>
      <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: 'column', height: height }} >
        {hot5?.map((hot, index) => {
          return (
            <View style={{ width: '100%', height: 75, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 20 }} key={index} onTouchEnd={() => navigation.navigate('Profile', {userId: hot.userId})}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={userImages[index]} />
                  <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                    <Text style={{ fontSize: 13, color: 'white' }}>{hot.name}</Text>
                    <Text style={{ fontSize: 9, color: 'grey' }}>{hot.category}</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
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
    fontSize: 18,
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
