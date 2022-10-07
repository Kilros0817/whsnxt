import { identity } from "lodash";
import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, Button, TextInput } from "react-native"
import { uses24HourClock } from "react-native-localize";
import { TouchableOpacity } from "react-native-ui-lib";
import iHide from './i_hide.svg';

const { width, height } = Dimensions.get('screen');

export default function PaymentLogin({ navigation, route }) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const method = () => {
    if (route.params?.method == 0) return ('Paypal');
    else if (route.params?.method == 1) return ('MasterCard');
    else return ('Visa');
  }

  useEffect(() => {
  }, [])

  const paymentImage = () => {
    if (route.params?.method == 0) return (<Image source={require('./i_paypal.png')} style={{ marginTop: 100, backgroundColor: 'orange', borderRadius: 10 }} />);
    else if (route.params?.method == 1) return (<Image source={require('./i_mastercard.png')} style={{ marginTop: 100 }} />);
    else return (<Image source={require('./i_visa.png')} style={{ marginTop: 100 }} />);
  }

  onClickPay = (id) => {
    setSuccessModalVisible(true);
  }

  return (
    <View style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onStartShouldSetResponder={(e) => true}
          onTouchEnd={() => { navigation.goBack() }}
        />
        <Text style={styles.Txt432}>Payment Method</Text>
      </View>
      {paymentImage()}
      <TextInput placeholder="Enter your account name" style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, marginTop: 100, paddingLeft: 20 }} />
      <View>
        <TextInput placeholder="Enter Password" textContentType='password' secureTextEntry style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, marginTop: 30, paddingLeft: 20 }} />
        <Image source={require('./i_hide.png')} style={{ position: 'absolute', right: 20, top: 45, zIndex: 1, backgroundColor: 'white' }} />
      </View>
      <TouchableOpacity onPressOut={() => navigation.navigate('PaymentPay', { total: route.params?.total })}><View style={{ width: '100%', backgroundColor: "#1455F5", padding: 20, borderRadius: 10, alignSelf: 'center', marginTop: 30 }}><Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>Login to {method()}</Text></View></TouchableOpacity>
    </View>
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
