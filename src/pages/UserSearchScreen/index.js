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
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { User } from 'stream-chat-react-native';
import { accountUrl } from '../../constants/BaseUrl';

import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('screen');

export default function UserSearchScreen({ navigation }) {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchW, setSearchW] = useState('');

  const searchUsers = () => {
    let reqdata = new FormData();
    if (searchW == '') {
      reqdata.append('func', 'fetchUsers');
    } else {
      reqdata.append('func', 'searchUsers');
      reqdata.append('keyword', searchW);
    }

    fetch(accountUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: reqdata,
    })
      .then(res => res.json())
      .then(res => {
        if (res.error == false) {
          setUsers(res.data);
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Sorry, try again.',
          });
        }
      });
  };

  useEffect(() => {
    searchUsers();
  }, [searchUsers]);

  onToggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      {loading ? (
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
              onStartShouldSetResponder={e => true}
              onTouchEnd={e => {
                {
                  navigation.goBack();
                }
              }}
            />
            <Text style={styles.Txt432}>Search</Text>
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
              placeholder="Search for products, brands"
              placeholderTextColor={'grey'}
              onChangeText={newText => setSearchW(newText)}
              style={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 5,
                paddingLeft: 60,
                color: 'black',
              }}
              autoFocus={false}
            ></TextInput>
            <Image
              source={require('./i_search.png')}
              style={{ position: 'absolute', left: 20 }}
            />
          </View>

          {users && (
            <ScrollView
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {users.map((user, index) => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >{`${user.first_name} ${user.last_name}`}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate('Profile', { userId: user.id })
                    }
                  >
                    <Image
                      source={require('./i_up.png')}
                      style={{ alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          {!users && (
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
              <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>
                No results.
              </Text>
            </View>
          )}

          <View style={{ marginBottom: 250 }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Trending</Text>
            <View
              style={{
                flexDirection: 'row',
                color: 'blue',
                justifyContent: 'space-around',
                marginTop: 30,
              }}
            >
              <Text style={{ color: '#1455F5' }}>mac miller</Text>
              <Text style={{ color: '#1455F5' }}>dolly</Text>
              <Text style={{ color: '#1455F5' }}>Ariana Grande</Text>
            </View>
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
  Group380: {
    position: 'absolute',
    right: 0,
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
