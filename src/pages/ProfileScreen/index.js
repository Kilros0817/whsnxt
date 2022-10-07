import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { accountUrl, imageUrl, postUrl } from '../../constants/BaseUrl';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

function ProfileScreen({ navigation, userData, route }) {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(0);
  useEffect(() => {
    let userInfo = new FormData();
    userInfo.append('id', route.params?.userId);
    userInfo.append('func', 'fetchUser_id');
    fetch(accountUrl, {
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
          let fetchFollowInfo = new FormData();
          fetchFollowInfo.append('func', 'fetch_followers');
          fetchFollowInfo.append('user_id', userData.id);
          fetch(accountUrl, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: fetchFollowInfo,
          })
            .then((response1) => {
              return response1.json();
            })
            .then((responseData1) => {
              let idx = responseData1.data?.findIndex((e) => (e.target_user == route.params?.userId));
              if (idx > -1) setStatus(1);
              else setStatus(0);
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
          setUserProfile(responseData.data[0]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Sorry, try again.',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Sorry, try again.',
        });
      });
  }, []);

  const onToggleFollow = (newStatus) => {
    let followInfo = new FormData();
    followInfo.append('func', 'user_follower_update');
    followInfo.append('dest_user_id', userProfile?.id);
    followInfo.append('user_id', userData.id);
    followInfo.append('notes', null);
    if (newStatus == 1) {
      followInfo.append('status', 'follow');
    } else {
      followInfo.append('status', 'unfollow');
    }

    fetch(accountUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: followInfo,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.error == false) {
          setStatus(!status);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Sorry, try again.',
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Sorry, try again.',
        });
      });
  };

  const getUserImage = (uri) => {
    if (uri != undefined && uri != '') {
      return (
        <Image
          source={{ uri: uri }}
          style={{
            alignSelf: 'center',
            marginTop: 10,
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/img/default-avatar.png')}
          style={{
            alignSelf: 'center',
            marginTop: 10,
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      {isLoading ? (
        <ActivityIndicator
          color="white"
          size="large"
          style={{ alignSelf: 'center', flex: 1 }}
        />
      ) : (
        <>
          <View style={styles.Group642}>
            <Image
              style={styles.Group379}
              source={require('../PrivacyPolicyScreen/Group.png')}
              onTouchEnd={(e) => {
                {
                  e.stopPropagation();
                  navigation.goBack();
                }
              }}
            />
            <Text style={styles.Txt432}>
              {userProfile?.role == 1 ? 'Talent' : 'Normal User'}
            </Text>
            <Image
              source={require('./i_search.png')}
              style={{ position: 'absolute', right: 0, alignSelf: 'center' }}
              onTouchEnd={() => navigation.navigate('UserSearch')}
            />
          </View>
          {getUserImage( imageUrl + 'profile_pic/' + userProfile?.profile_pic)}
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: 'white',
              alignSelf: 'center',
              marginTop: 20,
            }}
          >
            {userProfile?.first_name + ' ' + userProfile?.last_name}
          </Text>
          <View style={{ display: 'flex', alignSelf: 'center' }}>
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <Image
                source={require('./i_location.png')}
                style={{ alignSelf: 'center' }}
              />
              <Text style={{ fontSize: 8.26, color: 'white', marginLeft: 10 }}>
                United Kindom, London
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <Image
                source={require('./i_position.png')}
                style={{ alignSelf: 'center' }}
              />
              <Text style={{ fontSize: 8.26, color: 'white', marginLeft: 10 }}>
                Portsoken
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <View
              onTouchEnd={() => onToggleFollow(status == 1 ? 0 : 1)}
              style={{
                backgroundColor: '#1455F5',
                borderRadius: 4,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 12, color: 'white' }}>
                {status == 1 ? 'Unfollow' : 'Follow'}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 4,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginHorizontal: 10,
              }}
              onTouchEnd={() =>
                navigation.navigate('Chat', { receiver: userProfile?.id })
              }
            >
              <Text style={{ fontSize: 12, color: 'black' }}>Message</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                borderRightColor: 'grey',
                borderRightWidth: 1,
                width: '25%',
              }}
            >
              <Text
                style={{ color: 'grey', fontSize: 12, alignSelf: 'center' }}
              >
                15
              </Text>
              <Text
                style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}
              >
                Posts
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderRightColor: 'grey',
                borderRightWidth: 1,
                width: '25%',
              }}
            >
              <Text
                style={{ color: 'grey', fontSize: 12, alignSelf: 'center' }}
              >
                15k
              </Text>
              <Text
                style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}
              >
                Followers
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderRightColor: 'grey',
                borderRightWidth: 1,
                width: '25%',
              }}
            >
              <Text
                style={{ color: 'grey', fontSize: 12, alignSelf: 'center' }}
              >
                23k
              </Text>
              <Text
                style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}
              >
                Following
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderRightColor: 'grey',
                borderRightWidth: 0,
                width: '25%',
              }}
            >
              <Text
                style={{ color: 'grey', fontSize: 12, alignSelf: 'center' }}
              >
                23k
              </Text>
              <Text
                style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}
              >
                Likes
              </Text>
            </View>
          </View>
          <ScrollView style={{ marginTop: 50, marginLeft: -20, width: width }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('./portfolio1.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
              <Image
                source={require('./portfolio2.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
              <Image
                source={require('./portfolio3.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('./portfolio4.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
              <Image
                source={require('./portfolio5.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
              <Image
                source={require('./portfolio6.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('./portfolio7.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
              <Image
                source={require('./portfolio8.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
              <Image
                source={require('./portfolio9.png')}
                style={{ width: width / 3, aspectRatio: 1, height: 'auto' }}
              />
            </View>
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
              <View style={styles.iconNumber}>
                <Text style={{ fontSize: 7, color: 'white' }}>12</Text>
              </View>
            </View>
            <Image
              source={require('../HomeScreen/i_navbar4.png')}
              onTouchEnd={() => navigation.navigate('EditProfile')}
            />
          </View>
        </>
      )}
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
    alignSelf: 'center',
  },
  Txt433: {
    fontSize: 14,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    lineHeight: 30,
    color: '#1455F5',
    position: 'absolute',
    right: 20,
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

const mapStateToProps = (state) => ({
  userData: state.accounts.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
