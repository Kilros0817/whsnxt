import { identity } from "lodash";
import React, { useState, useEffect } from "react"
import { StyleSheet, Image, Text, View, Dimensions, Button, Modal, TouchableOpacity } from "react-native"
import PayPal from 'react-native-paypal-gateway';

const { width, height } = Dimensions.get('screen');
const client_id = process.env.REACT_APP_PAYPAL_CLIENT_ID

export default function ProductPaymentMethod({ navigation, route }) {

  const [planNo, setPlanNo] = useState(null);
  const [amount, setAmount] = useState('99');
  const [userId, setUserId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setAmount(route.params?.amount);
    setUserId(route.params?.id);
    console.log("route.params", route.params);
  }, [])

  const payPal = () => {
    PayPal.initialize(PayPal.NO_NETWORK, client_id);
    PayPal.pay({
      price: amount,
      currency: 'USD',
      description: 'Whats next payment integration',
    }).then(confirm => successMsg(confirm))
      .catch(error => console.log("error", error));

  }

  const successMsg = (response) =>{
    setIsSuccess(true);
  }

  onClickPaymentMethod = (id) => {
   navigation.navigate('PaymentPay', { method: id, total: route.params?.total, plan: planNo, id: userId, amount: amount })
  }

  return (
    <View style={styles.PrivacyPolicy}>
      <Modal
        visible={isSuccess}
        onRequestClose={() => setIsSuccess(!isSuccess)}
        coverScreen={false}
        backdropOpacity={0.7}
        backdropTransitionOutTiming={0}
        animationInTiming={1}
        animationOutTiming={1}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
      >
        <View style={styles.centeredView}>
          <Text style={styles.notification}>
            Payment Successful
          </Text>
          <Image style={styles.img} source={require('./success.png')} />
          <TouchableOpacity style={{ marginTop: 30, width: '80%', backgroundColor: '#1455F5', borderRadius: 85, paddingVertical: 10 }}><Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }} onPress={() => navigation.navigate('Home')}>Continue</Text></TouchableOpacity>
       </View>
      </Modal>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onStartShouldSetResponder={(e) => true}
          onTouchEnd={() => { navigation.goBack() }}
        />
        <Text style={styles.Txt432}>Payment Method</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
        <View style={{ backgroundColor: '#1455F5', height: 50, width: '100%', borderRadius: 10, marginVertical: 10 }} onTouchEnd={() => payPal()}><Image source={require('./i_paypal.png')} style={{ alignSelf: 'center', marginTop: 10 }} /></View>
        <View style={{ backgroundColor: '#1455F5', height: 50, width: '100%', borderRadius: 10, marginVertical: 10 }} onTouchEnd={() => onClickPaymentMethod(1)}><Image source={require('./i_mastercard.png')} style={{ alignSelf: 'center', marginTop: 10 }} /></View>
        <View style={{ backgroundColor: '#1455F5', height: 50, width: '100%', borderRadius: 10, marginVertical: 10 }} onTouchEnd={() => onClickPaymentMethod(2)}><Image source={require('./i_visa.png')} style={{ alignSelf: 'center', marginTop: 10 }} /></View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000000',
    borderRadius: 0.63,
    display: 'flex',
    flexDirection: 'column'
  },
  notification: {
    color: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 24,
    fontWeight: '500',
  },
  img:{
    marginTop: 20
  }
})
