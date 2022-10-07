import React, { useState } from "react"
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  SafeAreaView
} from "react-native";
const { width, height } = Dimensions.get('screen');
import { accountUrl, httpHeaders } from "../../constants/BaseUrl";
import { ConvertToUrlForm } from "../../Util/Util";
import SweetAlert from 'react-native-sweet-alert';
import Toast from 'react-native-toast-message';

export default function Forgotpassword({ navigation, route }) {

  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  onClickSubmit = () => {
    if (password.length < 5 || cpassword.length < 5) {
      return SweetAlert.showAlertWithOptions({
        title: 'Password must have minimum 5 chars',
        subTitle: '',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'warning',
        cancellable: true
      });
    }else if(password !== cpassword)
    {
      return SweetAlert.showAlertWithOptions({
        title: 'Password mismatch!',
        subTitle: '',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'warning',
        cancellable: true
      });
    }
    const email = route.params?.email;
    let sendData = ConvertToUrlForm({
      email: email,
      password: cpassword,
      func: 'forgot_password_third',
    });
    fetch(accountUrl, { method: 'POST', headers: httpHeaders, body: sendData })
      .then(response => response.json())
      .then(responseData => {
        console.log("responseData", responseData)
        if (responseData['error'] == false) {
          navigation.navigate('SignIn');
        } else {
          Toast.show({
            type: 'error',
            text1: responseData.msg,
            // text2: ''
          });
        }
      })
      .catch(err => Toast.show({
        type: 'error',
        text1: err,
        // text2: ''
      }));
    
  }

  return (
    <SafeAreaView style={styles.Forgotpassword}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { { e.stopPropagation(); navigation.navigate('ForgotPasswordEmail') } }}
        />
        <Text style={styles.Txt432}>Enter New Password</Text>
      </View>
      <View style={{ height: 350 }}>
        <Text style={styles.Txt133}>Let's reset your password</Text>
        <Text style={styles.Txt853} > New Password </Text>
        <View>
          <TextInput 
            value={password} 
            style={{ ...styles.Group725 }} 
            textContentType='password' 
            secureTextEntry={true}
            onChangeText={v => setPassword(v)}
          ></TextInput>
        </View>
        <Text style={styles.Txt853} > Retype Password </Text>
        <View>
          <TextInput 
            value={cpassword} 
            style={{ ...styles.Group725 }} 
            textContentType='password' 
            secureTextEntry={true}
            onChangeText={v => setCpassword(v)}
          ></TextInput>
        </View>
      </View>
      <View style={styles.Group359} onTouchEnd={() => onClickSubmit()}><Text style={styles.Txt676}>Save Password</Text></View>
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
    marginTop: 10
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