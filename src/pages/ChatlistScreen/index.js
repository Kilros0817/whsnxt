import React, { useEffect, useState } from 'react';
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
  Platform,
} from 'react-native';
import { ConvertToUrlForm, isNullOrEmpty } from '../../Util/Util';
import { connect } from 'react-redux';
import { accountUrl, imageUrl } from '../../constants/BaseUrl';
import Toast from 'react-native-toast-message';
import Moment from 'moment';

const { width, height } = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

function ChatList({ navigation, userData }) {
  const [notifylen, setNotifyLen] = useState(0);
  const [totalF, setTotalF] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [searchW, setSearchW] = useState('');
  const getNotification = async () => {
    const obj = ConvertToUrlForm({
      func: 'fetch_user_notifications',
      user_id: userData.id,
    });
    const data = await fetch(accountUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: obj,
    })
      .then((response) => response.json())
      .then((responseData) => {
        const data = responseData && responseData.data ? responseData.data : [];
        return data;
      })
      .catch((err) => {
        console.log('catch', err);
      });
    setNotifyLen(data !== undefined ? data.length : 0);
  };

  const getFollowerList = async () => {
    let userInfo = new FormData();
    userInfo.append('user_id', userData.id);
    userInfo.append('func', 'fetch_followers');
    await fetch(accountUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: userInfo,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error == false) {
          let followers = responseData.data ? responseData.data : [];
          console.log(followers, "---------------------------")
          setFollowers(followers);
          setTotalF(followers);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Sorry, try again.',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Sorry, try again.',
        });
      });
  };

  const onClickChat = (id) => {
    navigation.navigate('Chat', { receiver: id });
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.day() == today.getDay() &&
      someDate.month() == today.getMonth() &&
      someDate.year() == today.getFullYear()
    );
  };

  const chatDate = (str) => {
    Moment.locale('en');
    var date = Moment(str);
    if (isToday(date)) {
      return date.format('hh:mm A');
    } else {
      return date.format('ddd');
    }
  };

  useEffect(() => {
    if (searchW == '') {
      setFollowers(totalF);
    } else {
      setFollowers(
        totalF.filter((a) =>
          (a.first_name + ' ' + a.last_name)
            .toLowerCase()
            .includes(searchW.toLowerCase()),
        ),
      );
    }
  }, [searchW]);

  useEffect(() => {
    getFollowerList();
    getNotification();
  }, []);

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => {
            {
              navigation.goBack();
            }
          }}
        />
        <Text style={styles.Txt432}>Chat</Text>
      </View>
      <View
        style={{
          width: '100%',
          paddingVertical: 20,
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'grey'}
          style={{
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 20,
            marginRight: 10,
            paddingLeft: 40,
            color: 'black',
            height: 40,
          }}
          onChangeText={(newText) => setSearchW(newText)}
          autoFocus={true}
        ></TextInput>
        <Image
          source={require('./i_search.png')}
          style={{ position: 'absolute', right: 5, height: 40, width: 40 }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ display: 'flex', flexDirection: 'column' }}
      >
        {followers.map((follower, index) => (
          <View
            style={{
              width: '100%',
              height: 75,
              marginTop: 10,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: 20,
            }}
            onTouchEnd={() => onClickChat(follower.target_user)}
            key={index}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {!isNullOrEmpty(follower.profile_pic) && (
                  <Image
                    source={{
                      uri: imageUrl + 'profile_pic/' + follower.profile_pic,
                    }}
                    style={{
                      alignSelf: 'center',
                      width: 45,
                      aspectRatio: 1,
                      borderRadius: 50,
                      height: 'auto',
                    }}
                  />
                )}
                {isNullOrEmpty(follower.profile_pic) && (
                  <Image
                    source={require('../../assets/img/default-avatar.png')}
                    style={{
                      alignSelf: 'center',
                      width: 45,
                      aspectRatio: 1,
                      borderRadius: 50,
                      height: 'auto',
                    }}
                  />
                )}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 20,
                  }}
                >
                  <Text style={{ fontSize: 14, color: 'white' }}>
                    {follower.first_name + ' ' + follower.last_name}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'grey' }}>
                    {follower.notes == 'null' ? '' : follower.notes}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  paddingRight: 30,
                  paddingTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: 'grey', textAlign: 'center' }}
                >
                  {chatDate(follower.modified)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          height: width / 5,
          width: width,
          backgroundColor: 'white',
          opacity: 0.9,
          bottom: bottomNavBarHeight,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 20,
        }}
      >
        <Image
          source={require('../HomeScreen/i_navbar1.png')}
          onTouchEnd={() => navigation.navigate('Home')}
        />
        <View onTouchEnd={() => navigation.navigate('Chatlist')}>
          <Image source={require('../HomeScreen/i_navbar2.png')} />
          <View style={styles.iconNumber}>
            <Text style={{ fontSize: 7, color: 'white' }}>12</Text>
          </View>
        </View>
        <View onTouchEnd={() => navigation.navigate('Notification')}>
          <Image source={require('../HomeScreen/i_navbar3.png')} />
          {notifylen != 0 && (
            <View style={styles.iconNumber}>
              <Text style={{ fontSize: 7, color: 'white' }}>{notifylen}</Text>
            </View>
          )}
        </View>
        <Image
          source={require('../HomeScreen/i_navbar4.png')}
          onTouchEnd={() => navigation.navigate('EditProfile')}
        />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  userData: state.accounts.userData,
});

const mapDispatchToProps = (dispatch) => ({});

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
  iconNumber: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -5,
    right: 0,
    textAlign: 'center',
    paddingLeft: 3,
    paddingTop: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
