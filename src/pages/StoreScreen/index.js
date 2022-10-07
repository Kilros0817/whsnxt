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
  Platform,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { productUrl, imageUrl, albumUrl } from '../../constants/BaseUrl';
import { ConvertToUrlForm } from '../../Util/Util';

const { width, height } = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

export default function Store({ navigation, route }) {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  const [filterN, setFilterN] = useState(0);
  const white = 'white';
  const gray = 'gray';

  useEffect(() => {
    setUserId(route.params?.id);
    getProduct();
  }, []);

  const getProduct = () => {
    const data = {
      func: 'products',
      user_id: userId,
    };
    let sendData = ConvertToUrlForm(data);
    fetch(productUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: sendData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData", responseData.data);

        if (responseData['error'] == false) {
          setProducts(responseData?.data);
        }
      })
      .catch((err) => {
        console.log('catch', err);
      });
  };

  const onToggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const addBookmark = (product_id, bookmarked) => {
    let data = {
      func: 'insert_product_bookmark',
      user_id: userId,
      product_id: product_id,
    };
    if (bookmarked === 1) {
      data.bookmark = 1;
    }
    let sendData = ConvertToUrlForm(data);
    fetch(productUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: sendData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('responseData', responseData);
        if (responseData['error'] == false) {
          Toast.show({
            type: 'success',
            text1: 'Bookmarked successfully 👋.',
          });
          getProduct();
        }
      })
      .catch((err) => {
        return Toast.show({
          type: 'error',
          text1: err,
        });
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
        <Text style={styles.Txt432}>Product</Text>
        <Image
          style={styles.Group380}
          source={require('./i_store.png')}
          onTouchEnd={(e) => {
            {
              navigation.navigate('CheckOut');
            }
          }}
        />
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
            width: '80%',
            borderRadius: 5,
            marginRight: 10,
            paddingLeft: 40,
            color: 'black',
          }}
          autoFocus={false}
        ></TextInput>
        <Image
          source={require('./i_search.png')}
          style={{
            position: 'absolute',
            left: 45,
            marginRight: 10,
            paddingRight: 10,
          }}
        />
        <Image
          source={require('./i_filter.png')}
          style={{ height: 40 }}
          onTouchEnd={() => onToggleFilterMenu()}
        />
      </View>
      {filterMenuVisible ? (
        <View
          style={{
            backgroundColor: 'white',
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            right: 40,
            top: 130,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: 40,
              borderBottomWidth: 1,
              width: '100%',
              backgroundColor: filterN == 0 ? gray : white,
            }}
            onTouchEnd={() => setFilterN(0)}
          >
            <Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }}>
              Type
            </Text>
          </View>
          <View
            style={{
              height: 40,
              borderBottomWidth: 1,
              width: '100%',
              backgroundColor: filterN == 1 ? gray : white,
            }}
            onTouchEnd={() => setFilterN(1)}
          >
            <Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }}>
              Category
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: '100%',
              backgroundColor: filterN == 2 ? gray : white,
            }}
            onTouchEnd={() => setFilterN(2)}
          >
            <Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }}>
              Name
            </Text>
          </View>
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {products?.map((item, index) => (
            <View
              key={index}
              style={{
                width: '40%',
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 10,
                marginRight: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    id: userId,
                    product: item,
                  })
                }
              >
                <Image
                  source={
                    item.product_data.album
                      ? { uri: `${albumUrl + item.product_data.album}` }
                      : require('./store1.png')
                  }
                  style={{ width: '90%', aspectRatio: 1, height: 'auto' }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      alignSelf: 'flex-start',
                      width: '30%',
                    }}
                  >
                    ${item.product_data.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      width: '60%',
                    }}
                  >
                    {item?.product_data?.audio_name &&
                    item.product_data.audio_name.length > 10
                      ? `${item.product_data.audio_name.substring(0, 10)}...`
                      : item.product_data.audio_name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    alignSelf: 'flex-start',
                    marginTop: 15,
                  }}
                >
                  {item?.product_data?.album_title &&
                  item?.product_data?.album_title.length > 15
                    ? `${item.product_data.album_title.substring(0, 15)}...`
                    : item.product_data.album_title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  bottom: 20,
                  marginRight: 10,
                }}
                onPress={() =>
                  addBookmark(item.product_data.id, item?.user_bookmarked)
                }
              >
                {item?.user_bookmarked === 1 ? (
                  <Image source={require('./i_heart_red.png')} />
                ) : (
                  <Image source={require('./i_heart_white.png')} />
                )}
              </TouchableOpacity>
            </View>
          ))}
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
