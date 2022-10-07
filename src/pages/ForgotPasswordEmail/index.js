import React, { useState } from "react"
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  SafeAreaView,
  Alert
} from "react-native";
const { width, height } = Dimensions.get('screen');
import { accountUrl, httpHeaders } from "../../constants/BaseUrl";
import { ConvertToUrlForm } from "../../Util/Util";

export default function Forgotpassword({ navigation, route }) {

  const [email, setEmail] = useState('')

  onClickSubmit = () => {
    let sendData = ConvertToUrlForm({
      email: email,
      func: 'forgot_password_one',
    });
    fetch(accountUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: sendData,
    }).then(response => response.json())
      .then(responseData => {
        Alert.alert('', 'Check your email, code sent successfully', [
          {
            text: 'OK',
            style: 'OK',
            onPress: () => navigation.navigate('ForgotPasswordOtp', { email }),
          },
        ]);
      })
      .catch(error => {
        console.log('Error', error);
        Alert.alert(
          '',
          'Failed, please retry',
          [
            {
              text: 'OK',
              style: 'OK',
            },
          ],
          {
            cancelable: true,
          },
        );
      });
    
  }

  return (
    <SafeAreaView style={styles.Forgotpassword}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { { e.stopPropagation(); navigation.goBack() } }}
        />
        {route.params?.method == 'change' && <Text style={styles.Txt432}>Change Password</Text>}
        {route.params?.method == 'forgot' && <Text style={styles.Txt432}>Forgot Password</Text>}
      </View>
      <View style={{ height: 350 }}>
        {route.params?.method == 'change' && <Text style={styles.Txt133}>Enter your registered email and we will send instructions to reset your password</Text>}
        {route.params?.method == 'forgot' && <Text style={styles.Txt133}>Don’ t worry.We have got you covered.Enter your registered email and we will send instructions to reset your password</Text>}
        <Text style={styles.Txt853} > Email </Text>
        <View>
          <TextInput 
              value={email}  
              style={styles.Group725}
              onChangeText = {value => setEmail(value)}
          ></TextInput>
        </View>
      </View>
      <View style={styles.Group359} onTouchEnd={() => onClickSubmit()}><Text style={styles.Txt676}>Submit</Text></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Forgotpassword: {
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
  Txt133: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    lineHeight: 20,
    color: "rgba(255, 255, 255, 1)",
    marginVertical: 25,
  },
  Txt853: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "400",
    color: "rgba(189,189,189,1)",
    marginBottom: 1,
  },
  Group725: {
    marginTop: 20,
    paddingLeft: 20,
    borderRadius: 6,
    backgroundColor: "rgba(242,242,242,1)",
    height: 40,
    color: 'black'
  },
  Group359: {
    marginTop: 20,
    borderRadius: 39,
    backgroundColor: "rgba(0,93,227,1)",
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Txt676: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 1)",
  },
})