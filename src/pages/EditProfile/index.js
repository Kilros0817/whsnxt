import { placeholder } from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { setUserData } from '../../redux/actions/AccountsActions';
import DropDown from '../../components/Dropdown';
import { ConvertToUrlForm } from '../../Util/Util';
import { accountUrl, imageUrl } from '../../constants/BaseUrl';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const { width, height } = Dimensions.get('screen');

const genderItem = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Not Both', value: 'Not Both' },
];

const categoryDropdownItems = [
  { label: 'Rock', value: 'Rock' },
  { label: 'Pop', value: 'Pop' },
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
  editable = false,
  multiline,
  numberOfLines,
}) {
  return (
    <View style={styles.Group4}>
      <Text style={styles.Txt066}>{label}</Text>
      <View style={{ ...styles.Rectangle17_, width: width }} />
      <View style={styles.Rectangle14_}>
        <TextInput
          style={{ color: 'white', textAlignVertical: 'top' }}
          autoFocus={autoFocus}
          textContentType={type}
          value={value}
          onChange={onChangeText}
          multiline={multiline}
          editable={editable}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
}

function StyledDropDown({ items, label, value, width, placeholder }) {
  return (
    <View style={styles.Group4}>
      <Text style={styles.Txt066}>{label}</Text>
      <View style={{ ...styles.Rectangle17_, width: width }} />
      <View style={styles.Rectangle14_}>
        <DropDown
          items={items}
          style={{ marginRight: 20, width: '100%' }}
          color={'white'}
          placeholder={placeholder}
          borderColor={'black'}
          positionLeft={30}
          width
        ></DropDown>
      </View>
    </View>
  );
}

function RenderDropdown({
  items,
  label,
  value,
  width,
  placeholder,
  isFocus,
  setFocus,
  setValue,
}) {
  return (
    <View style={styles.Group4}>
      <Text style={styles.Txt066}>{label}</Text>
      <View style={{ ...styles.Rectangle17_, width: width }} />
      <View style={styles.Rectangle14_}>
        <Dropdown
          style={[styles.dropdown2, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={items}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? placeholder : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setFocus(false);
          }}
        />
      </View>
    </View>
  );
}

function EditProfileScreen({ navigation, route, setUserData, userData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditStatus, setIsEditStatus] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [profile, setProfile] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [genre, setGenre] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isGenderFocus, setIsGenderFocus] = useState(false);
  const [iscategoryFocus, setIsCategoryFocus] = useState(false);
  const [isGenreFocus, setIsGenreFocus] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = route.params?.data;
    const data = userData && userData !== undefined ? userData : null;
    const name =
      data && data.first_name ? data.first_name + ' ' + data.last_name : '';
    const id = data && data.id ? data.id : '';
    const email = data && data.email ? data.email : '';
    const mobile = data && data.phone ? data.phone : '';
    const gender = data && data.gender ? data.gender : '';
    const username = data && data.username ? data.username : '';
    const address = data && data.address ? data.address : '';
    const fname = data && data.first_name ? data.first_name : '';
    const lname = data && data.last_name ? data.last_name : '';
    const dob = data && data.dob ? data.dob : '';
    const profile =
      data && data.profile_pic
        ? `${imageUrl + 'profile_pic/' + data.profile_pic}`
        : '';
    // console.log("profile---->", imageUrl+profile);
    setData(data);
    setName(name);
    setEmail(email);
    setDob(dob);
    setFname(fname);
    setLname(lname);
    setMobile(mobile);
    setGender(gender);
    setAddress(address);
    setUsername(username);
    setUserId(id);
    setProfile(profile);
  }, []);

  const updateUser = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'PHPSESSID=68d1ff10bdf261e29f2c1b4005b439b3');
    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('first_name', fname);
    formdata.append('func', 'update_profile');
    formdata.append('last_name', lname);
    formdata.append('gender', gender);
    formdata.append('dob', dob);
    if (filePath && filePath.length > 0) {
      formdata.append('profile_pic', {
        name: filePath[0].fileName,
        type: filePath[0].type,
        uri:
          Platform.OS === 'ios'
            ? filePath[0].uri.replace('file://', '')
            : filePath[0].uri,
      });
      //  formdata.append("profile_pic", filePath[0], filePath[0].uri);
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(accountUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        if (result['error'] == false) {
          getUserData();
          Toast.show({
            type: 'success',
            text1: 'Profile updated successfully 👋.',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: result.msg,
            // text2: ''
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: error,
          // text2: ''
        });
      });

   
  };

  const getUserData = async () => {
    const obj = ConvertToUrlForm({
      func: 'fetchUser',
      id: userId,
    });
    await fetch(accountUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: obj,
    })
      .then((response) => response.json())
      .then((responseData) => {
        const data =
          responseData && responseData.data ? responseData.data[0] : null;
        if (responseData['error'] == false && data) {
          setUserData(data);
          signInWithEmailAndPassword(auth, data.email, data.email).catch(
            (error) => {
              const errorMessage = error.message;
              alert(errorMessage);
            },
          );

          auth.currentUser.updateProfile({
            displayName: fname + ' ' + lname,
          });
        }
        return responseData?.data;
      })
      .catch((err) => {
        console.log('catch', err);
      });
  };

  onChangeInput = () => {};

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        //  alert(response.customButton);
      } else {
        const assets = response && response.assets ? response.assets : null;
        const file = assets && assets.length > 0 ? assets[0] : null;
        const source = file && file.uri ? file.uri : null;
        setProfile(source);
        setFilePath(assets);
        console.log('response', JSON.stringify(response));
      }
    });
  };

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onStartShouldSetResponder={(e) => true}
          onTouchEnd={(e) => {
            {
              navigation.goBack();
            }
          }}
        />
        <Text style={styles.Txt432}>Profile</Text>
      </View>
      {
        // (route.params?.accountType ==2 || route.params?.accountType == 'talent') &&
        <ScrollView>
          <View style={{ alignSelf: 'center' }}>
            <TouchableOpacity onPress={launchCamera}>
              <Image
                source={profile ? { uri: profile } : require('./user.png')}
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
              <Image
                source={require('./i_online.png')}
                style={{ position: 'absolute', bottom: 0, right: 0 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>
            {name}
          </Text>
          <StyledInput
            label={'Description'}
            type={'name'}
            onChangeText={(d) => setDescription(d)}
            value={description}
            width={80}
            editable={true}
            multiline={true}
            numberOfLines={4}
          ></StyledInput>
          <StyledInput
            label={'User Name'}
            editable={true}
            value={username}
            type={'name'}
            onChangeText={(d) => setUsername(d)}
            width={80}
          ></StyledInput>
          <StyledInput
            label={'Email'}
            value={email}
            type={'emailAddress'}
            onChangeText={(d) => setEmail(d)}
            width={40}
          ></StyledInput>
          <StyledInput
            label={'Phone Number'}
            editable={true}
            value={mobile}
            type={'telephoneNumber'}
            onChangeText={(d) => setMobile(d)}
            width={100}
          ></StyledInput>
          <RenderDropdown
            label={'Gender'}
            width={50}
            items={genderItem}
            value={gender}
            placeholder={'Gender'}
            isFocus={isGenderFocus}
            setFocus={setIsGenderFocus}
            setValue={setGender}
          />
          <RenderDropdown
            label={'Category'}
            width={50}
            items={categoryDropdownItems}
            value={category}
            placeholder={'Category'}
            isFocus={iscategoryFocus}
            setFocus={setIsCategoryFocus}
            setValue={setCategory}
          />
          <RenderDropdown
            label={'Genre'}
            width={50}
            items={categoryDropdownItems}
            value={genre}
            placeholder={'Genre'}
            isFocus={isGenreFocus}
            setFocus={setIsGenreFocus}
            setValue={setGenre}
          />
          <TouchableOpacity onPress={() => (isLoading ? null : updateUser())}>
            <View
              style={{
                backgroundColor: '#1455F5',
                borderRadius: 51,
                marginTop: 20,
                marginHorizontal: 10,
                marginBottom: 70,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {isLoading && <ActivityIndicator size="small" color="yellow" />}
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  alignSelf: 'center',
                  paddingVertical: 10,
                }}
              >
                {isLoading ? 'Loading' : 'Update Profile'}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      }
      {/* {
        (route.params?.accountType == 'user' || route.params?.accountType == undefined) && <>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View>
              <Image source={profile? {uri: profile }: require('./user.png')} style={{ alignSelf: 'center', marginTop: 20, width: 90, height: 90, borderRadius: 50 }} />
              <Image source={require('./i_edit.png')} style={{ position: 'absolute', bottom: -10, right: -10 }} onTouchEnd={() => setIsEditStatus(!isEditStatus)} />
            </View>
            <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10, fontSize: 24, fontWeight: 'bold' }}>{name}</Text>
          </View>
          <TextInput
            style={{ width: '100%', backgroundColor: 'black', color: '#1455F5', borderColor: '#1455F5', borderWidth: 1, borderRadius: 10, paddingLeft: 20, marginTop: 50 }}
            placeholder={"Email@gmail.com"}
            placeholderTextColor="#1455F5"
            value={email}
            editable={isEditStatus}
            selectTextOnFocus={isEditStatus}
            autoFocus={isEditStatus}
          />
          <TextInput
            style={{ width: '100%', backgroundColor: 'black', color: '#1455F5', borderColor: '#1455F5', borderWidth: 1, borderRadius: 10, paddingLeft: 20, marginTop: 30 }}
            placeholder={"+9087665543322"}
            placeholderTextColor="#1455F5"
            value={mobile}
            editable={isEditStatus}
            selectTextOnFocus={isEditStatus}
          />
          <TextInput
            style={{ width: '100%', backgroundColor: 'black', color: '#1455F5', borderColor: '#1455F5', borderWidth: 1, borderRadius: 10, paddingLeft: 20, marginTop: 30 }}
            placeholder={"Address here, street 104"}
            placeholderTextColor="#1455F5"
            editable={isEditStatus}
            value={address}
            selectTextOnFocus={isEditStatus}
          />
          {isEditStatus && <View style={{ backgroundColor: '#1455F5', borderRadius: 20, paddingVertical: 10, position: 'absolute', bottom: 100, width: width - 40, left: 20 }} onTouchEnd={() => navigation.goBack()}><Text style={{ textAlign: 'center', color: 'white' }}>Save</Text></View>}
          {!isEditStatus && <View style={{ backgroundColor: '#1455F5', borderRadius: 20, paddingVertical: 10, position: 'absolute', bottom: 100, width: width - 40, left: 20 }} onTouchEnd={() => navigation.goBack()}><Text style={{ textAlign: 'center', color: 'white' }}>Back</Text></View>}
        </>
      } */}
      <KeyboardSpacer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
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
  Group4: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  Rectangle14_: {
    display: 'flex',
    backgroundColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#23437D',
    width: width - 60,
    borderRadius: 2,
  },
  Rectangle17_: {
    position: 'absolute',
    top: -5,
    left: 15,
    backgroundColor: 'black',
    height: 20,
    zIndex: 1,
  },
  Txt066: {
    position: 'absolute',
    top: -15,
    left: 15,
    fontSize: 12,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    color: '#23437D',
    height: 50,
    zIndex: 2,
  },
  dropdown2: {
    paddingHorizontal: 8,
    color: 'white',
    marginRight: 20,
    width: '100%',
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
});

const mapStateToProps = (state) => ({
  userData: state.accounts.userData,
});
const mapDispatchToProps = (dispatch) => ({
  setUserData: (user_data) => setUserData(dispatch, user_data),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
