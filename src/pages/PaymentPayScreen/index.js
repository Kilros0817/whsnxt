import { async } from "@firebase/util";
import { identity } from "lodash";
import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, Button, TextInput, ScrollView, SafeAreaView } from "react-native"

const { width, height } = Dimensions.get('screen');

export default function PaymentPay({ navigation, route }) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  useEffect(() => {
  }, [])


  const paymentImage = () => {
    if (route.params?.method == 0) return (<Image source={require('./i_paypal.png')} style={{ position: 'absolute', right: 10, top: 20, backgroundColor: 'orange', borderRadius: 10 }} />);
    else if (route.params?.method == 1) return (<Image source={require('./i_mastercard.png')} style={{ position: 'absolute', right: 10, top: 15 }} />);
    else return (<Image source={require('./i_visa.png')} style={{ position: 'absolute', right: 10, top: 15 }} />);
  }

  onClickPay = (id) => {
    setSuccessModalVisible(true);
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.PrivacyPolicy} onTouchEnd={() => { if (successModalVisible) navigation.navigate('Store') }}>
        <View style={styles.Group642}>
          <Image
            style={styles.Group379}
            source={require('../PrivacyPolicyScreen/Group.png')}
            onStartShouldSetResponder={(e) => true}
            onTouchEnd={() => { navigation.goBack() }}
          />
          <Text style={styles.Txt432}>Payment Method</Text>
        </View>
        <ScrollView>
          <Text style={{ color: 'white', marginTop: 20, fontSize: 14 }}>Email</Text>
          <TextInput editable={false} selectTextOnFocus={false} placeholder="JohnDoe@gmail.com" style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, marginTop: 10 }} />
          <Text style={{ color: 'white', marginTop: 20, fontSize: 14 }}>Shipping address</Text>
          <TextInput editable={false} selectTextOnFocus={false} placeholder="John Doe" style={{ width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: 10, borderBottomColor: 'grey', borderBottomWidth: 1 }} />
          <TextInput editable={false} selectTextOnFocus={false} placeholder="7788 40th Avenue Notheast" style={{ width: '100%', backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1 }} />
          <TextInput editable={false} selectTextOnFocus={false} placeholder="Address line 2" style={{ width: '100%', backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1 }} />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <TextInput editable={false} selectTextOnFocus={false} placeholder="Seattle" style={{ width: '50%', backgroundColor: 'white', borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1 }}></TextInput>
            <TextInput editable={false} selectTextOnFocus={false} placeholder="08115" style={{ width: '50%', backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1 }} />
            {successModalVisible && <Image source={require('./m_payment_success.png')} style={{ position: 'absolute', zIndex: 1, alignSelf: 'center', top: -40 }} />}</View>
          <TextInput editable={false} selectTextOnFocus={false} placeholder="Washington" style={{ width: '100%', backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1 }} />
          <TextInput editable={false} selectTextOnFocus={false} placeholder="United States" style={{ width: '100%', backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1 }} />
          <Text style={{ color: 'white', marginTop: 20, fontSize: 14 }}>Card Information</Text>
          <View><TextInput editable={false} selectTextOnFocus={false} placeholder="4242 2424 2424 2424" style={{ width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: 10, borderBottomColor: 'grey', borderBottomWidth: 1 }} />
            {paymentImage()}</View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput editable={false} selectTextOnFocus={false} placeholder="12/24" style={{ width: '50%', backgroundColor: 'white', borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1 }} />
            <TextInput editable={false} selectTextOnFocus={false} placeholder="123" style={{ width: '50%', backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1 }} />
            <Image source={require('./i_calendar.png')} style={{ position: 'absolute', right: 10, top: 15, zIndex: 1 }} /></View>
          <View style={{ width: '100%', backgroundColor: "#1455F5", padding: 20, borderRadius: 10, alignSelf: 'center', marginTop: 30, marginBottom: 70 }} onTouchEnd={(e) => { e.stopPropagation(); onClickPay(); }}><Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>Pay ${route.params?.total}</Text></View>
        </ScrollView>
      </ScrollView>
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
