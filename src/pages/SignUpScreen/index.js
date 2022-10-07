import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Pressable,
} from 'react-native';
import { colors } from '../../styles';
import { RadioButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { accountUrl } from '../../constants/BaseUrl';
import { ConvertToUrlForm, daysInMonth } from '../../Util/Util';

import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
const { width, height } = Dimensions.get('screen');

const yearDropdownItems = new Array(60).fill(0).map((e, i) => ({
  label: (2019 - i).toString(),
  value: (2019 - i).toString(),
}));
const monthDropdownItems = [
  { label: 'Jan', value: '1' },
  { label: 'Feb', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'Jun', value: '6' },
  { label: 'Jul', value: '7' },
  { label: 'Aug', value: '8' },
  { label: 'Sep', value: '9' },
  { label: 'Oct', value: '10' },
  { label: 'Nov', value: '11' },
  { label: 'Dec', value: '12' },
];
const genderItem = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Not Both', value: 'Not Both' },
];
const categoryDropdownItems = [
  { label: 'Musician', value: 'Musician' },
  { label: 'Comedian', value: 'Comedian' },
  { label: 'Rythm', value: 'Rythm' },
  { label: 'Blues', value: 'Blues' },
  { label: 'Music', value: 'Music' },
];

function StyledInput({
  label,
  type,
  onChangeText,
  value,
  autoFocus,
  width,
  isPassword,
}) {
  return (
    <View style={styles.Group4}>
      <Text style={styles.Txt066}>{label}</Text>
      <View style={{ ...styles.Rectangle17_, width: width }} />
      <View style={styles.Rectangle14_}>
        <TextInput
          style={{
            color: 'white',
            width: '100%',
            textAlign: 'center',
            height: '100%',
            fontSize: 12,
          }}
          selectionColor={'orange'}
          autoFocus={autoFocus}
          textContentType={type}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
        />
      </View>
    </View>
  );
}

export default function SignUp({ navigation }) {
  const [dayDropdownItems, setDayDropdownItems] = useState([]);
  const [accountType, setAccountType] = useState('talent');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthYear, setBirthYear] = useState('2019');
  const [birthMonth, setBirthMonth] = useState(null);
  const [birthDay, setBirthDay] = useState('1');
  const [gender, setGender] = useState(0);
  const [dob, setDob] = useState(0);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isDayFocus, setIsDayFocus] = useState(false);
  const [isMonthFocus, setIsMonthFocus] = useState(false);
  const [isYearFocus, setIsYearFocus] = useState(false);
  const [isGenderFocus, setIsGenderFocus] = useState(false);
  const [isGenreFocus, setIsGenreFocus] = useState(false);

  useEffect(() => {
    let daysLength = daysInMonth(
      birthMonth ? parseInt(birthMonth) + 1 : birthMonth,
      parseInt(birthYear) + 1,
    );
    console.log('daysLength', daysLength);
    setDayDropdownItems(
      new Array(daysLength).fill(0).map((e, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
      })),
    );
  }, [birthMonth, birthYear]);

  const onSignUpClick = () => {
    if (!acceptPolicy) return;
    if (
      accountType == 'talent' &&
      (firstName == '' ||
        lastName == '' ||
        userName == '' ||
        category == '' ||
        email == '' ||
        password == '')
    ) {
      return alert('Please fill out mandatory fields');
    }
    if (
      accountType == 'user' &&
      (firstName == '' || lastName == '' || email == '' || password == '')
    ) {
      return alert('Please fill out mandatory fields');
    }
    var details = {
      email: email,
      password: password,
      func: 'signup',
      role: accountType == 'talent' ? 1 : 2,
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      gender: gender,
    };

    let formBody = ConvertToUrlForm(details);

    fetch(accountUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((responseData) => {
        createUserWithEmailAndPassword(auth, email, email)
          .then((userCredential) => {
            // Registered
            const user = userCredential.user;
            updateProfile(user, {
              displayName: firstName + ' ' + lastName,
            }).catch((error) => {
              alert(error.message);
            });
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });

        Alert.alert('', 'Signup Successfully', [
          {
            text: 'OK',
            style: 'OK',
            onPress: () => navigation.navigate('SignIn'),
          },
        ]);
      })
      .catch((error) => {
        console.log('Error', error);
        Alert.alert(
          '',
          'SignUp Failed, please retry',
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
  };

  return (
    <SafeAreaView style={styles.SignUp}>
      <Image style={styles.Group2} source={require('./Group.png')} />
      <View style={styles.Group579}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.Txt161}> Account Type </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <RadioButton
              value="talent"
              status={accountType === 'talent' ? 'checked' : 'unchecked'}
              onPress={() => setAccountType('talent')}
            />
            <Text style={styles.Txt7103_}> Talent </Text>
            <RadioButton
              value="user"
              status={accountType === 'user' ? 'checked' : 'unchecked'}
              onPress={() => setAccountType('user')}
            />
            <Text style={styles.Txt7104}> User </Text>
          </View>
          <StyledInput
            label={'First Name'}
            type={'name'}
            onChangeText={(d) => setFirstName(d)}
            value={firstName}
            width={80}
            autoFocus
          ></StyledInput>
          <StyledInput
            label={'Last Name'}
            type={'name'}
            onChangeText={(d) => setLastName(d)}
            value={lastName}
            width={80}
          ></StyledInput>
          {accountType == 'talent' && (
            <>
              <StyledInput
                label={'User Name'}
                type={'name'}
                onChangeText={(d) => setUserName(d)}
                value={userName}
                width={80}
              ></StyledInput>
              <StyledInput
                label={'Category'}
                type={'name'}
                onChangeText={(d) => setCategory(d)}
                value={category}
                width={80}
              ></StyledInput>
            </>
          )}
          <StyledInput
            label={'Email'}
            type={'emailAddress'}
            onChangeText={(d) => setEmail(d)}
            value={email}
            width={50}
          ></StyledInput>
          <StyledInput
            label={'Password'}
            type={'password'}
            onChangeText={(d) => setPassword(d)}
            value={password}
            width={80}
            isPassword={true}
          ></StyledInput>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.Txt594}> Date of Birth </Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginTop: 5,
              }}
            >
              <Dropdown
                style={[
                  styles.dropdown,
                  isMonthFocus && { borderColor: 'blue' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={monthDropdownItems}
                search
                labelField="label"
                valueField="value"
                placeholder={!isMonthFocus ? 'Month' : '...'}
                searchPlaceholder="Search..."
                value={birthMonth}
                onFocus={() => setIsMonthFocus(true)}
                onBlur={() => setIsMonthFocus(false)}
                onChange={(item) => {
                  setBirthMonth(item.value);
                  setIsMonthFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdown, isDayFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={dayDropdownItems}
                search
                labelField="label"
                valueField="value"
                placeholder={!isDayFocus ? 'Day' : '...'}
                searchPlaceholder="Search..."
                value={birthDay}
                onFocus={() => setIsDayFocus(true)}
                onBlur={() => setIsDayFocus(false)}
                onChange={(item) => {
                  setBirthDay(item.value);
                  setIsDayFocus(false);
                }}
              />
              <Dropdown
                style={[
                  styles.dropdown,
                  isYearFocus && { borderColor: 'blue' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={yearDropdownItems}
                search
                labelField="label"
                valueField="value"
                placeholder={!isYearFocus ? 'Year' : '...'}
                searchPlaceholder="Search..."
                value={birthYear}
                onFocus={() => setIsYearFocus(true)}
                onBlur={() => setIsYearFocus(false)}
                onChange={(item) => {
                  setBirthYear(item.value);
                  setIsYearFocus(false);
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.Txt594}> Gender </Text>
            <Dropdown
              style={[
                styles.dropdown2,
                isGenderFocus && { borderColor: 'blue' },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={genderItem}
              labelField="label"
              valueField="value"
              placeholder={!isGenderFocus ? 'Gender' : '...'}
              searchPlaceholder="Search..."
              value={gender}
              onFocus={() => setIsGenderFocus(true)}
              onBlur={() => setIsGenderFocus(false)}
              onChange={(item) => {
                setGender(item.value);
                setIsGenderFocus(false);
              }}
            />
          </View>
          {accountType == 'talent' && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.Txt594}> Genre </Text>
              <Dropdown
                style={[
                  styles.dropdown2,
                  isGenreFocus && { borderColor: 'blue' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={categoryDropdownItems}
                labelField="label"
                valueField="value"
                placeholder={!isGenreFocus ? 'Genre' : '...'}
                searchPlaceholder="Search..."
                value={dob}
                onFocus={() => setIsGenreFocus(true)}
                onBlur={() => setIsGenreFocus(false)}
                onChange={(item) => {
                  setDob(item.value);
                  setIsGenreFocus(false);
                }}
              />
            </View>
          )}

          <View
            style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}
          >
            <RadioButton
              value="acceptPolicy"
              status={acceptPolicy ? 'checked' : 'unchecked'}
              onPress={() => setAcceptPolicy(acceptPolicy ? false : true)}
            />
            <Text style={styles.Txt7103}>
              By clicking Sign Up, you agree to our{' '}
              <Text style={{ color: 'black' }}>Terms</Text> and that you have
              read our <Text style={{ color: 'black' }}>Data Policy</Text>,
              including our <Text style={{ color: 'black' }}>Cookie</Text> Use.{' '}
            </Text>
          </View>
          <View style={styles.Group3}>
            <Pressable
              android_ripple={{ color: acceptPolicy ? 'white' : '' }}
              onPress={() => onSignUpClick()}
              style={{
                alignSelf: 'stretch',
                borderRadius: 42,
                elevation: 25,
              }}
            >
              <Text style={styles.Txt864}> Sign up </Text>
            </Pressable>
          </View>
          <Text style={styles.multiple1}>
            {' '}
            Already have an Account{' '}
            <Text
              style={{ color: 'black' }}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SignUp: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.93)',
    width: width,
    height: height,
  },
  mine1: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 250,
  },
  Txt1024: {
    position: 'absolute',
    top: height / 3.5,
    left: width / 2.5,
    fontSize: 14,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  Unsplash0polbhssf80: {
    position: 'absolute',
    top: 227,
    left: 205,
    width: 36,
    height: 36,
  },
  Group2: {
    position: 'absolute',
    top: 0,
    width: width,
    height: (382 / 375) * width,
    zIndex: -1,
  },
  Group892: {
    paddingTop: 39,
    paddingBottom: 39,
    paddingLeft: 39,
    paddingRight: 39,
    borderRadius: 174.5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(20,85,245,1)',
    width: 349,
    height: 349,
  },
  Group5710: {
    paddingTop: 35,
    paddingBottom: 36,
    paddingLeft: 35,
    paddingRight: 36,
    borderRadius: 134.5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(20,85,245,1)',
    width: 269,
    height: 269,
  },
  Ellipse4: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(20,85,245,1)',
    width: 196,
    height: 196,
    borderRadius: 98,
  },

  Rectangle13: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: width,
    height: 600,
  },
  Group3: {
    marginTop: 15,
    // borderRadius: 42,
    // backgroundColor: 'rgba(0,0,0,1)',
    // height: 50,
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: 'rgba(0,0,0,1)',
    width: width / 1.2,
    height: 53,
    overflow: 'hidden',
  },
  Txt864: {
    // fontSize: 18,
    // fontFamily: 'Inter, sans-serif',
    // fontWeight: '600',
    // color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    lineHeight: 48,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'center',
  },

  multiple1: {
    fontSize: 10,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    lineHeight: 12,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  multiple2: {
    position: 'absolute',
    left: 20,
    bottom: 130,
    fontSize: 10,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    color: '#fff',
  },

  Rectangle12: {
    position: 'absolute',
    bottom: 330,
    left: 20,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: width / 1.2,
    height: 40,
    borderRadius: 42,
  },
  Rectangle1283: {
    position: 'absolute',
    bottom: 380,
    left: 20,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: width / 1.2,
    height: 40,
    borderRadius: 42,
  },
  Rectangle14: {
    position: 'absolute',
    bottom: 450,
    left: 20,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: width / 1.2,
    height: 40,
    borderRadius: 42,
  },
  Rectangle15: {
    position: 'absolute',
    bottom: 360,
    left: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    width: 80,
    height: 20,
  },
  Rectangle1284: {
    position: 'absolute',
    bottom: 410,
    left: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    width: 50,
    height: 20,
    zIndex: 3,
  },
  Group226: {
    position: 'absolute',
    bottom: 430,
    left: 20,
    paddingTop: 31,
    paddingBottom: 3,
    paddingLeft: 30,
    paddingRight: 234,
    borderRadius: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: width / 1.2,
    height: 40,
  },
  Rectangle17: {
    backgroundColor: 'rgba(20,0,245,1)',
    width: 60,
    height: 20,
    left: 0,
  },

  Group676: {
    position: 'absolute',
    bottom: 480,
    left: 20,
    paddingTop: 31,
    paddingBottom: 3,
    paddingLeft: 30,
    paddingRight: 234,
    borderRadius: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: width / 1.2,
    height: 40,
  },
  Rectangle1288: {
    position: 'absolute',
    left: 40,
    bottom: 460,
    backgroundColor: 'rgba(20,85,245,1)',
    width: 85,
    height: 20,
  },

  Group887: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    paddingTop: 7,
    paddingBottom: 11,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: 81,
    height: 40,
  },
  Txt0010: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginRight: 13,
  },
  DashiconsArrowDownAlt2: {
    width: 10,
    height: 10,
  },

  Group314: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 170,
    paddingTop: 7,
    paddingBottom: 11,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: 80,
    height: 40,
  },
  Txt243: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginRight: 8,
  },
  DashiconsArrowDownAlt2: {
    width: 12,
    height: 12,
  },

  Group293: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 913,
    // none: "0px",
    paddingTop: 13,
    paddingBottom: 11,
    paddingLeft: 19,
    paddingRight: 8,
    borderRadius: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: 81,
    height: 40,
  },
  Txt243: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginRight: 8,
  },
  DashiconsArrowDownAlt2: {
    width: 12,
    height: 12,
  },

  Group725: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 11,
    paddingLeft: 12,
    paddingRight: 8,
    marginRight: 40,
    borderRadius: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: 81,
    height: 40,
  },
  Txt0010: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginRight: 13,
  },
  DashiconsArrowDownAlt2: {
    width: 12,
    height: 12,
  },

  Group1078: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 11,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: 81,
    height: 40,
  },
  Txt178: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  DashiconsArrowDownAlt2: {
    width: 12,
    height: 12,
  },
  Rectangle1287: {
    position: 'absolute',
    bottom: 510,
    left: 40,
    backgroundColor: 'rgba(20,85,245,1)',
    width: 85,
    height: 20,
  },
  Txt464: {
    position: 'absolute',
    bottom: 520,
    left: 45,
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt7103: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt7103_: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt7104: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    lineHeight: 30,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt471: {
    position: 'absolute',
    bottom: 527,
    left: 45,
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt857: {
    position: 'absolute',
    bottom: 465,
    left: 45,
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt986: {
    position: 'absolute',
    bottom: 466,
    left: 45,
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt467: {
    position: 'absolute',
    bottom: 415,
    left: 45,
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    zIndex: 3,
  },
  Txt613: {
    position: 'absolute',
    bottom: 365,
    left: 45,
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt594: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt161: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    height: 20,
  },
  Txt989: {
    position: 'absolute',
    bottom: 220,
    left: 20,
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  Txt585: {
    position: 'absolute',
    top: 204,
    left: 154,
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
    width: 67,
    height: 18,
  },
  UnsplashCwy7qoyv9me: {
    position: 'absolute',
    top: 9,
    left: 4,
    width: 36,
    height: 36,
  },
  Ellipse11: {
    position: 'absolute',
    top: 169,
    left: 343,
    width: 36,
    height: 36,
  },
  Ellipse10: {
    position: 'absolute',
    top: 80,
    left: 96,
    width: 36,
    height: 36,
  },
  Unsplash7rie9dpdo80: {
    position: 'absolute',
    top: 191,
    left: 46,
    width: 36,
    height: 36,
  },
  Unsplash2egnqazbamk: {
    position: 'absolute',
    top: 62,
    left: 270,
    width: 36,
    height: 36,
  },
  Rectangle1282: {
    position: 'absolute',
    top: 989,
    left: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: 16,
    height: 16,
    borderRadius: 31,
  },
  Component7: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 287,
    left: 18,
    borderRadius: 54,
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,1)',
    width: 10,
    height: 10,
  },

  Group48095674: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 287,
    left: 104,
    width: 43,
    height: 10,
  },
  Component71: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 6,
    borderRadius: 54,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
  },

  Txt907: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },

  Frame48095663: {
    position: 'absolute',
    top: 134,
    left: 154,
    width: 66.52,
    height: 67.34,
  },

  Group579: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(20,85,245,1)',
    width: width,
    padding: 20,
    maxHeight: height / 1.3,
  },
  Group4: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  Rectangle14_: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,85,245,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255, 255, 9)',
    width: width - 40,
    height: 40,
    borderRadius: 42,
  },
  Rectangle17_: {
    position: 'absolute',
    top: -5,
    left: 60,
    backgroundColor: 'rgba(20,85,245,1)',
    height: 20,
    zIndex: 1,
  },
  Txt066: {
    position: 'absolute',
    top: -15,
    left: 65,
    fontSize: 12,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    height: 50,
    zIndex: 2,
  },
  dropdown: {
    margin: 4,
    height: 40,
    width: '30%',
    borderColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 42,
    color: 'white',
  },
  dropdown2: {
    margin: 4,
    height: 40,
    width: '40%',
    borderColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 42,
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
