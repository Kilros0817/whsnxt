import React, { useState, useRef  } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import Toast from 'react-native-toast-message';
import { accountUrl, httpHeaders } from '../../constants/BaseUrl';
import { ConvertToUrlForm } from '../../Util/Util';
const { width, height } = Dimensions.get('screen');

export default function EmailVerificationScreen({ navigation, route }) {
  const [otp, setOtp] = useState([null, null, null, null]);
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  onClickSubmit = () => {
    if (otp[0] == null || otp[1] == null || otp[2] == null || otp[3] == null) {
      return SweetAlert.showAlertWithOptions({
        title: 'Please fill out all fields',
        subTitle: '',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'warning',
        cancellable: true
      });
    }
    let code = otp[0] + otp[1] + otp[2] + otp[3];
    let sendData = ConvertToUrlForm({
      email: route.params?.email,
      code: code,
      func: 'email_verify',
    });
    fetch(accountUrl, { method: 'POST', headers: httpHeaders, body: sendData })
      .then(response => response.json())
      .then(responseData => {
        console.log("responseData", responseData)
        if (responseData['error'] == false) {
          navigation.navigate('SignIn');
          Toast.show({
            type: 'success',
            text1: 'Success to activate 👋.',
            // text2: ''
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Invalid Code, retry.',
            // text2: ''
          });
        }
      })
      .catch(err => Toast.show({
        type: 'error',
        text1: err,
        // text2: ''
      }));
  };

  setCode = (index, n) => {
    let _otp = otp.concat();
    _otp[index] = n;
    setOtp(_otp);
  };

  handleChange = (value, elmnt) =>{
    if (elmnt === "Delete" || elmnt === "Backspace") {
        if(value ==4){ ref_input3.current.focus(); }
        if(value ==3){ ref_input2.current.focus(); }
        if(value ==2){ ref_input1.current.focus(); }
    }
    else {
      if(value ==1){ ref_input2.current.focus(); }
      if(value ==2){ ref_input3.current.focus(); }
      if(value ==3){ ref_input4.current.focus(); }
    }
  }

  return (
    <View style={styles.Forgotpassword}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={e => navigation.goBack()}
        />
        <Text style={styles.Txt432}>Enter Code</Text>
      </View>
      <View style={{ height: 350 }}>
        <Text style={styles.Txt133}>
          Please enter Code that we have sent you on your email address
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginHorizontal: 40,
            paddingTop: 40,
          }}
        >
          <View style={styles.Rectangle92}>
            <TextInput
              style={{ color: 'white', textAlign: 'center' }}
              textContentType="oneTimeCode"
              autoFocus={true}
              ref={ref_input1}
              maxLength={1}
              onKeyPress={e => handleChange(1, e.nativeEvent.key)}
              onChangeText={n => setCode(0, n)}
            ></TextInput>
          </View>
          <View style={styles.Rectangle92}>
            <TextInput
              style={{ color: 'white', textAlign: 'center' }}
              textContentType="oneTimeCode"
              maxLength={1}
              ref={ref_input2}
              onKeyPress={e => handleChange(2, e.nativeEvent.key)}
              onChangeText={n => setCode(1, n)}
            ></TextInput>
          </View>
          <View style={styles.Rectangle92}>
            <TextInput
              style={{ color: 'white', textAlign: 'center' }}
              textContentType="oneTimeCode"
              maxLength={1}
              ref={ref_input3}
              onKeyPress={e => handleChange(3, e.nativeEvent.key)}
              onChangeText={n => setCode(2, n)}
            ></TextInput>
          </View>
          <View style={styles.Rectangle92}>
            <TextInput
              style={{ color: 'white', textAlign: 'center' }}
              textContentType="oneTimeCode"
              maxLength={1}
              ref={ref_input4}
              onKeyPress={e => handleChange(4, e.nativeEvent.key)}
              onChangeText={n => setCode(3, n)}
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.Group359} onTouchEnd={() => onClickSubmit()}>
        <Text style={styles.Txt676}>Submit</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Forgotpassword: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,1)',
    width: width,
    height: height,
  },
  Group642: {
    display: 'flex',
    flexDirection: 'row',
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
    fontWeight: '600',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt133: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '500',
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 1)',
    marginVertical: 25,
  },
  Txt853: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(189,189,189,1)',
    marginBottom: 1,
  },
  Group725: {
    marginTop: 20,
    paddingLeft: 20,
    borderRadius: 6,
    backgroundColor: 'rgba(242,242,242,1)',
    height: 40,
  },
  Group359: {
    borderRadius: 39,
    backgroundColor: 'rgba(0,93,227,1)',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Txt676: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  Rectangle92: {
    borderWidth: 1.3,
    borderStyle: 'solid',
    borderColor: 'white',
    width: 42,
    height: 42,
    borderRadius: 6,
  },
});
