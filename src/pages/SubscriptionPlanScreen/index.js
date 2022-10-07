import { identity } from "lodash";
import React, { useState, useEffect } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, Button, SafeAreaView } from "react-native"
import { ConvertToUrlForm } from "../../Util/Util";
import { accountUrl } from "../../constants/BaseUrl";

const { width, height } = Dimensions.get('screen');

export default function SubscriptionPlanScreen({ navigation, route }) {

  const [plans, setPlans] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(route.params?.id);
    getPlans();
  }, [])

  const getPlans = async () =>{
    const obj =  ConvertToUrlForm({
      func: "plans",
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
     setPlans(data !==undefined?data:[])
    console.log("data", data);
 }

  onClickSubscriptionScreen = (id) => {
    navigation.navigate('PaymentLogin', { method: id, total: route.params?.total })
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onTouchEnd={() => { navigation.goBack() }}
        />
        <Text style={styles.Txt432}>Subscription</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        {/* <View style={{ backgroundColor: 'white', marginTop: 0, width: '100%', borderRadius: 15, padding: 20 }} onTouchEnd={() => navigation.navigate('Subscription', { subscriptionPlan: 0 })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontSize: 18 }}>BRONZE</Text>
            <Text style={{ color: 'black', fontSize: 18 }}>{">"}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>FREE</Text>
            <Text style={{ color: 'black', fontSize: 10, alignSelf: 'center' }}>Free</Text>
          </View>
        </View> */}
        {plans?.map((item, index) =>(
        <View key={index} style={{ backgroundColor: 'white', marginTop: 20, width: '100%', borderRadius: 15, padding: 20 }} onTouchEnd={() => navigation.navigate('Subscription', { subscriptionPlan: item.id , id: userId, plan: item })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: 'black', fontSize: 18 }}>{">"}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>${item.price}</Text>
            <Text style={{ color: 'black', fontSize: 10, alignSelf: 'center' }}>A MONTH</Text>
          </View>
        </View>
        ))}
        {/* <View style={{ backgroundColor: 'white', marginTop: 20, width: '100%', borderRadius: 15, padding: 20 }} onTouchEnd={() => navigation.navigate('Subscription', { subscriptionPlan: 2 })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontSize: 18 }}>PLATINIUM</Text>
            <Text style={{ color: 'black', fontSize: 18 }}>{">"}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>$199</Text>
            <Text style={{ color: 'black', fontSize: 10, alignSelf: 'center' }}>A MONTH</Text>
          </View>
        </View> */}
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
    color: 'white'
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
