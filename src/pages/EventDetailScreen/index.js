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
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import { ConvertToUrlForm } from '../../Util/Util';
import { eventUrl } from '../../constants/BaseUrl';

const { width, height } = Dimensions.get('screen');

const deviceHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

export default function EventDetailScreen({ navigation, route }) {
  const [event, setEvent] = useState(null);
  const [eventId, setEventId] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [venue, setVenue] = useState(null);
  const [artist, setArtist] = useState(null);
  const [coordinates, setCordinates] = useState({
    latitude: 28.57966,
    longitude: 77.32111,
  });
  const [region, setRegion] = useState({
    latitude: 28.57966,
    longitude: 77.32111,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    setEventId(route.params?.id);
    getEventDetails(route.params?.id);
  }, []);

  const getEventDetails = async (eventId) => {
    if (eventId && eventId !== undefined) {
      const data = {
        func: 'fetch_event_id',
        id: 12,
      };
      const sendData = ConvertToUrlForm(data);
      await fetch(eventUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: sendData,
      })
        .then(response => response.json())
        .then(responseData => {
          console.log('responseData', responseData);
          const data =
            responseData && responseData.data && responseData.data.length > 0
              ? responseData.data[0]
              : null;
          setEvent(data);
          const venue = data && data.venue ? data.venue : null;
          const name = data && data.name ? data.name : null;
          const edata =
            data && data.event_date ? new Date(data.event_date) : null;
          const date = edata ? moment(edata).format('dddd [,] MMMM') : null;
          const time = edata ? moment(edata).format('h:mm a') : null;
          const lat = data && data.lat ? data.lat : null;
          const lng = data && data.lng ? data.lng : null;
          const artist = artist && artist.lng ? artist.lng : null;
          if (lat && lng && lat !== null && lng !== null) {
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setCordinates({ latitude: lat, longitude: lng });
          }
          setTitle(name);
          setDate(date);
          setTime(time);
          setVenue(venue);
        })
        .catch(err => {
          console.log('catch', err);
        });
    } else {
      console.log('Event Missing');
    }
  };

  const onRegionChange = region => {
    console.log('region', region);
    const lat = region.latitude;
    const lon = region.longitude;
    // setCordinates({latitude: lat, longitude: lon});
    setRegion(region);
  };

  return (
    <View style={styles.PrivacyPolicy}>
      <ImageBackground
        source={
          event && event.cover ? { uri: event.cover } : require('./back.png')
        }
        style={{ width, aspectRatio: 375 / 281, height: 'auto' }}
      >
        <View style={styles.Group642}>
          <Image
            style={styles.Group379}
            source={require('../PrivacyPolicyScreen/Group.png')}
            onStartShouldSetResponder={e => true}
            onTouchEnd={e => {
                e.stopPropagation();
                navigation.goBack();
            }}
          />
        </View>
        <Image
          source={require('./i_calendar.png')}
          style={{ position: 'absolute', bottom: 10, left: 20 }}
          onTouchEnd={() => navigation.navigate('Events')}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              borderRadius: 40,
              borderColor: 'white',
              borderWidth: 1,
              paddingHorizontal: 10,
              height: 35,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Interested</Text>
          </View>
          <View
            style={{
              borderRadius: 40,
              borderColor: 'white',
              borderWidth: 1,
              paddingHorizontal: 10,
              height: 35,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Going</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            {date && date !== null && (
              <Text style={{ fontSize: 14, color: 'white' }}>
                {date.toLocaleUpperCase()}
              </Text>
            )}
            {time && time !== null && (
              <Text style={{ fontSize: 14, color: 'white' }}>{time} PST</Text>
            )}
          </View>
          {title && title !== null && (
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
                marginTop: 5,
              }}
            >
              {title}
            </Text>
          )}
          {artist && artist !== null && (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Image source={require('./i_event.png')} />
              <Text style={{ color: 'white', fontSize: 10, marginLeft: 10 }}>
                Event by{' '}
                <Text
                  style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                >
                  {artist}
                </Text>
              </Text>
            </View>
          )}
          {venue && venue !== null && (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Image source={require('./i_location.png')} />
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  textDecorationLine: 'underline',
                  marginLeft: 10,
                }}
              >
                {venue}
              </Text>
            </View>
          )}
          <View
            style={{
              width: '100%',
              borderBottomColor: 'white',
              borderBottomWidth: 1,
              marginTop: 10,
            }}
          />
          <Text style={{ fontSize: 18, color: 'white', marginTop: 15 }}>
            Location
          </Text>
        </View>
        <View style={styles.container}>
          {/* <MapView
            style={styles.mapcontainer}
            showsUserLocation
            showsMyLocationButton={false}
            zoomEnabled
            initialRegion={region}
            onRegionChange={onRegionChange}
          >
            <Marker
              coordinate={coordinates}
              title="Whats Next"
              description="Whats Next"
            />
          </MapView> */}
        </View>
        {/*  <View style={{ flexDirection: 'row', position: 'absolute', height: width / 5, width: width, backgroundColor: 'white', opacity: .9, bottom: bottomNavBarHeight, alignItems: 'center', justifyContent: "space-around", paddingBottom: 20 }}>
          <Image source={require('../HomeScreen/i_navbar1.png')} />
          <View onTouchEnd={() => navigation.navigate('Chatlist')}><Image source={require('../HomeScreen/i_navbar2.png')} /><View style={styles.iconNumber}><Text style={{ fontSize: 7, color: 'white' }}>12</Text></View></View>
          <View onTouchEnd={() => navigation.navigate('Notification')} ><Image source={require('../HomeScreen/i_navbar3.png')} /><View style={styles.iconNumber}><Text style={{ fontSize: 7, color: 'white' }}>12</Text></View></View>
          <Image source={require('../HomeScreen/i_navbar4.png')} onTouchEnd={() => navigation.navigate('EditProfile')} />
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  Group642: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
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
  mapcontainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});
