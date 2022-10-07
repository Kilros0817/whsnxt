import React, { useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, TextInput, ScrollView, SafeAreaView } from "react-native"
import { eventUrl } from "../../constants/BaseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConvertToUrlForm } from '../../Util/Util';

const { width, height } = Dimensions.get('screen');

export default function EventScreen({ navigation }) {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [events, setEvent] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('whsnxt_user_data').then(res => {
      console.log(res);
      if (res) {
        // console.log(JSON.parse(res));
        let userData = JSON.parse(res);
        setUserId(userData?.id);
      }
    }).catch(err => {
      console.log(err);
    })
    getEvents();
  }, [])

  onToggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  }
  
  const getEvents = () =>{
    const data = {
      func: 'events',
      lat: '11.016844',
      lng: '76.955833',
    }
    let sendData = ConvertToUrlForm(data);
    fetch(eventUrl, { 
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }, 
      body: sendData 
    })
      .then(response => response.json())
      .then(responseData => {
       // console.log("responseData", responseData);
        setEvent(responseData?.data);
      })
      .catch(err => {
        console.log("catch", err);
      });
  }

  const eventRender = (data) =>{
    let row = [];
    data?.map((item, index)=>{
      const eventId = item?.id;
      const edata = item.event_date? new Date(item.event_date): null;
      const distance = item?.distanceBetween?.KM;
      const name = item.name;
      const artist = item.artist;
      const date = edata?moment(edata).format("DD MMM [@]YYYY"):"17 Dec,@2022";
      const time = edata?moment(edata).format('h:mm a'):"9:00 AM";
      row.push(
        <View key={`event-${index}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20, borderRadius: 20, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate('EventDetail', {id: eventId})}>
          <ImageBackground source={require('./back.png')} style={{ width: '100%', aspectRatio: 302 / 122, height: 'auto' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 30, marginLeft: 20 }}>{name?name:"National Seminar"}</Text>
            <Text style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>{artist?artist:"By Jobh Doe"}</Text>
            <View style={{ backgroundColor: '#1455F5', paddingHorizontal: 20, borderRadius: 9, paddingVertical: 10, marginTop: 30, width: '30%', marginLeft: 20, textAlign: 'center' }}><Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>{date !== "Invalid date"?date:"17 Dec,@2022"}</Text></View>
            <Image source={require('./i_star.png')} style={{ position: 'absolute', top: 20, right: 10 }} />
          </ImageBackground>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <Image source={require('./i_location.png')} style={{ alignItems: 'center' }} />
            <Text style={{ fontSize: 12, color: 'black', maxWidth: '40%', marginLeft: 20 }}>Whitefeeld,Lahore, 642002,Pakistan</Text>
            <View style={{ flexDirection: 'column', position: 'absolute', right: 20, top: 20 }}>
              <Text style={{ fontSize: 9, color: 'black' }}>{distance?Math.round(distance):"0"} km from here</Text>
              <Text style={{ fontSize: 9, color: 'black' }}>{time !=="Invalid date"?time:"00:00 AM"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./i_users.png')} style={{ marginHorizontal: 20, marginBottom: 20 }} />
            <Text style={{ fontSize: 12, color: '#898989' }}>+500 other are going</Text>
          </View>
        </View>
      )
    })
    return row;
  }


  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onStartShouldSetResponder={(e) => true}
          onTouchEnd={(e) => { { e.stopPropagation(); navigation.goBack() } }}
        />
        <Text style={styles.Txt432}>Events</Text>
        <Image source={require('./i_filter.png')} style={{ position: 'absolute', right: 0 }} onTouchEnd={() => onToggleFilterMenu()} />
      </View>
      {filterMenuVisible ? (
        <View style={{ backgroundColor: 'white', width: '20%', display: 'flex', flexDirection: 'column', position: 'absolute', right: 40, top: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, zIndex: 1 }}>
          <View style={{ height: 40, borderBottomWidth: 1, width: '100%' }}><Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }} onPress={() => onToggleFilterMenu()}>EventName</Text></View>
          <View style={{ height: 40, borderBottomWidth: 1, width: '100%' }}><Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }} onPress={() => onToggleFilterMenu()}>Date</Text></View>
          <View style={{ height: 40, borderBottomWidth: 1, width: '100%' }}><Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }} onPress={() => onToggleFilterMenu()}>Venue</Text></View>
          <View style={{ height: 40, borderBottomWidth: 1, width: '100%' }}><Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }} onPress={() => onToggleFilterMenu()}>Distance</Text></View>
          <View style={{ height: 40, borderBottomWidth: 1, width: '100%' }}><Text style={{ marginTop: 10, fontSize: 12, alignSelf: 'center' }} onPress={() => onToggleFilterMenu()}>Artist</Text></View>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {eventRender(events)}
        {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20, borderRadius: 20, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate('EventDetail')}>
          <ImageBackground source={require('./back.png')} style={{ width: '100%', aspectRatio: 302 / 122, height: 'auto' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 30, marginLeft: 20 }}>National Seminar</Text>
            <Text style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>By Jobh Doe</Text>
            <View style={{ backgroundColor: '#1455F5', paddingHorizontal: 20, borderRadius: 9, paddingVertical: 10, marginTop: 30, width: '30%', marginLeft: 20, textAlign: 'center' }}><Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>17 Dec,@2022</Text></View>
            <Image source={require('./i_star.png')} style={{ position: 'absolute', top: 20, right: 10 }} />
          </ImageBackground>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <Image source={require('./i_location.png')} style={{ alignItems: 'center' }} />
            <Text style={{ fontSize: 12, color: 'black', maxWidth: '40%', marginLeft: 20 }}>Whitefeeld,Lahore, 642002,Pakistan</Text>
            <View style={{ flexDirection: 'column', position: 'absolute', right: 20, top: 20 }}>
              <Text style={{ fontSize: 9, color: 'black' }}>2 km from here</Text>
              <Text style={{ fontSize: 9, color: 'black' }}>2:00 pm </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./i_users.png')} style={{ marginHorizontal: 20, marginBottom: 20 }} />
            <Text style={{ fontSize: 12, color: '#898989' }}>+500 other are going</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20, borderRadius: 20, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate('EventDetail')}>
          <ImageBackground source={require('./back.png')} style={{ width: '100%', aspectRatio: 302 / 122, height: 'auto' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 30, marginLeft: 20 }}>National Seminar</Text>
            <Text style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>By Jobh Doe</Text>
            <View style={{ backgroundColor: '#1455F5', paddingHorizontal: 20, borderRadius: 9, paddingVertical: 10, marginTop: 30, width: '30%', marginLeft: 20, textAlign: 'center' }}><Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>17 Dec,@2022</Text></View>
            <Image source={require('./i_star.png')} style={{ position: 'absolute', top: 20, right: 10 }} />
          </ImageBackground>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <Image source={require('./i_location.png')} style={{ alignItems: 'center' }} />
            <Text style={{ fontSize: 12, color: 'black', maxWidth: '40%', marginLeft: 20 }}>Whitefeeld,Lahore, 642002,Pakistan</Text>
            <View style={{ flexDirection: 'column', position: 'absolute', right: 20, top: 20 }}>
              <Text style={{ fontSize: 9, color: 'black' }}>2 km from here</Text>
              <Text style={{ fontSize: 9, color: 'black' }}>2:00 pm </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./i_users.png')} style={{ marginHorizontal: 20, marginBottom: 20 }} />
            <Text style={{ fontSize: 12, color: '#898989' }}>+500 other are going</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20, borderRadius: 20, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate('EventDetail')}>
          <ImageBackground source={require('./back.png')} style={{ width: '100%', aspectRatio: 302 / 122, height: 'auto' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 30, marginLeft: 20 }}>National Seminar</Text>
            <Text style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>By Jobh Doe</Text>
            <View style={{ backgroundColor: '#1455F5', paddingHorizontal: 20, borderRadius: 9, paddingVertical: 10, marginTop: 30, width: '30%', marginLeft: 20, textAlign: 'center' }}><Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>17 Dec,@2022</Text></View>
            <Image source={require('./i_star.png')} style={{ position: 'absolute', top: 20, right: 10 }} />
          </ImageBackground>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <Image source={require('./i_location.png')} style={{ alignItems: 'center' }} />
            <Text style={{ fontSize: 12, color: 'black', maxWidth: '40%', marginLeft: 20 }}>Whitefeeld,Lahore, 642002,Pakistan</Text>
            <View style={{ flexDirection: 'column', position: 'absolute', right: 20, top: 20 }}>
              <Text style={{ fontSize: 9, color: 'black' }}>2 km from here</Text>
              <Text style={{ fontSize: 9, color: 'black' }}>2:00 pm </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./i_users.png')} style={{ marginHorizontal: 20, marginBottom: 20 }} />
            <Text style={{ fontSize: 12, color: '#898989' }}>+500 other are going</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20, borderRadius: 20, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate('EventDetail')}>
          <ImageBackground source={require('./back.png')} style={{ width: '100%', aspectRatio: 302 / 122, height: 'auto' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 30, marginLeft: 20 }}>National Seminar</Text>
            <Text style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>By Jobh Doe</Text>
            <View style={{ backgroundColor: '#1455F5', paddingHorizontal: 20, borderRadius: 9, paddingVertical: 10, marginTop: 30, width: '30%', marginLeft: 20, textAlign: 'center' }}><Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>17 Dec,@2022</Text></View>
            <Image source={require('./i_star.png')} style={{ position: 'absolute', top: 20, right: 10 }} />
          </ImageBackground>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <Image source={require('./i_location.png')} style={{ alignItems: 'center' }} />
            <Text style={{ fontSize: 12, color: 'black', maxWidth: '40%', marginLeft: 20 }}>Whitefeeld,Lahore, 642002,Pakistan</Text>
            <View style={{ flexDirection: 'column', position: 'absolute', right: 20, top: 20 }}>
              <Text style={{ fontSize: 9, color: 'black' }}>2 km from here</Text>
              <Text style={{ fontSize: 9, color: 'black' }}>2:00 pm </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./i_users.png')} style={{ marginHorizontal: 20, marginBottom: 20 }} />
            <Text style={{ fontSize: 12, color: '#898989' }}>+500 other are going</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20, borderRadius: 20, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate('EventDetail')}>
          <ImageBackground source={require('./back.png')} style={{ width: '100%', aspectRatio: 302 / 122, height: 'auto' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 30, marginLeft: 20 }}>National Seminar</Text>
            <Text style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>By Jobh Doe</Text>
            <View style={{ backgroundColor: '#1455F5', paddingHorizontal: 20, borderRadius: 9, paddingVertical: 10, marginTop: 30, width: '30%', marginLeft: 20, textAlign: 'center' }}><Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>17 Dec,@2022</Text></View>
            <Image source={require('./i_star.png')} style={{ position: 'absolute', top: 20, right: 10 }} />
          </ImageBackground>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <Image source={require('./i_location.png')} style={{ alignItems: 'center' }} />
            <Text style={{ fontSize: 12, color: 'black', maxWidth: '40%', marginLeft: 20 }}>Whitefeeld,Lahore, 642002,Pakistan</Text>
            <View style={{ flexDirection: 'column', position: 'absolute', right: 20, top: 20 }}>
              <Text style={{ fontSize: 9, color: 'black' }}>2 km from here</Text>
              <Text style={{ fontSize: 9, color: 'black' }}>2:00 pm </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./i_users.png')} style={{ marginHorizontal: 20, marginBottom: 20 }} />
            <Text style={{ fontSize: 12, color: '#898989' }}>+500 other are going</Text>
          </View>
        </View> */}
      </ScrollView >
    </SafeAreaView >
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
    fontWeight: "600",
    lineHeight: 30,
    color: "rgba(255, 255, 255, 1)",
  },
  iconNumber: {
    backgroundColor: 'red',
    width: 16, height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -5,
    right: 0,
    textAlign: 'center',
    paddingLeft: 3,
    paddingTop: 1
  },
})
