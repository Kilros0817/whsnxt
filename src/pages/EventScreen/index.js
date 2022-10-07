import React, { useState, useEffect } from "react"
import moment from "moment";
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, ScrollView, FlatList, TouchableOpacity, TextInput, SafeAreaView, Platform, ActivityIndicator, Button } from "react-native"
import _ from "lodash";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DocumentPicker from 'react-native-document-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { eventUrl } from "../../constants/BaseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { ConvertToUrlForm } from '../../Util/Util';
// DateTimePickerAndroid.dismiss('datetime')

const colors = [
  {bg:"#7BC1DE", color:"white"},
  {bg:"#7BC1DE", color:"white"},
  {bg:"#F96A6A", color:"white"},
  {bg:"white", color:"black"},
  {bg:"#FF8E00", color:"white"}
]

const { width, height } = Dimensions.get('screen');

export default function EventScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventTime, setNewEventTime] = useState(null);
  const [newEventPosition, setNewPosition] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [cover, setCover] = useState([]);
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

  const onToggleBottomMenu = () => {
    setBottomMenuVisible(!bottomMenuVisible);
  }

  const selectAudio = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      setCover(res);
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  const onShowDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, d) => {
        console.log("Date", d)
        onShowTime(d);
      },
      mode: 'date',
    });
  };

  const onShowTime = (d) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, t) => {
        setDate(t);
      },
      mode: 'time',
    });
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

  const addEvent = () =>{
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=a6364ef4066f302f5527e21d655cfc3d");
    var formdata = new FormData();
    formdata.append("func", "new_event");
    formdata.append("name", newEventName);
    formdata.append("event_date", date.toString());
    formdata.append("venue", newEventPosition);
    formdata.append("user_id", userId);
    if(cover.length > 0)
    {
      formdata.append("cover[]", cover[0], cover[0].uri);
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(eventUrl, requestOptions)
      .then(response => response.json())
      .then(responseData => {
        setIsLoading(false);
        setBottomMenuVisible(false);
        if (responseData['error'] == false) {
          Toast.show({
            type: 'success',
            text1: 'Event added successfully 👋.',
          });
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log("catch", err);
        Toast.show({
          type: 'error',
          text1: err,
          // text2: ''
        });
      });
  }

  const eventRender = (data) =>{
    let row = [];
    var i = 0;
    data?.map((item, index)=>{
      const edata = item.event_date? new Date(item.event_date): null;
      const name = item.name;
      const date = edata?moment(edata).format("DD MMM"):null;
      const time = edata?moment(edata).format('h:mm a'):"9:00 AM";
      const spDate = date && date !=="Invalid date" ?date.split(" "):null;
      const customBg = colors[i];
      row.push(
        <View key={`event-item-${index}`} style={{ flexDirection: 'row', marginHorizontal: 10 }} onPress={()=>console.log(';')} >
          <View style={{ flexDirection: 'column', borderRightColor: customBg.bg, borderRightWidth: 2, paddingRight: 20, width: 70 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: customBg.color }}>{spDate?spDate[0]:'12'}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: customBg.color }}>{spDate?spDate[1]:'Apr'}</Text>
          </View>
          <View style={{ borderRadius: 7, backgroundColor: customBg.bg, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexGrow: 1, marginLeft: 30, marginVertical: 5 }}>
            <Text style={{ color: customBg.color }}>{name}</Text>
            <Text style={{ color: customBg.color }}>{time !=="Invalid date"?time:"00:00 AM"}</Text>
          </View>
        </View>
      )
      if(i ===4 ) { i = 0 }else { ++i; }
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
        <Text style={styles.Txt432}>Event</Text>
      </View>
      <ScrollView>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', alignSelf: 'center', marginTop: 30, marginBottom: 10 }}>October 2020</Text>
        {eventRender(events)}
        {/* <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'column', borderRightColor: 'white', borderRightWidth: 2, paddingRight: 20, width: 70 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>12</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>wed</Text>
          </View>
          <View style={{ borderRadius: 7, backgroundColor: '#7BC1DE', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexGrow: 1, marginLeft: 30, marginVertical: 5 }}>
            <Text style={{ color: 'white' }}>Meeting with Alex</Text>
            <Text style={{ color: 'white' }}>9:00 AM</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'column', borderRightColor: 'white', borderRightWidth: 2, paddingRight: 20, width: 70 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>12</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>wed</Text>
          </View>
          <View style={{ borderRadius: 7, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexGrow: 1, marginLeft: 30, marginVertical: 5 }}>
            <Text style={{ color: 'black' }}>Ann's birthday</Text>
            <Text style={{ color: 'black' }}>9:00 AM</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'column', borderRightColor: 'white', borderRightWidth: 2, paddingRight: 20, width: 70 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>17</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>mon</Text>
          </View>
          <View style={{ borderRadius: 7, backgroundColor: '#FF8E00', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexGrow: 1, marginLeft: 30, marginVertical: 5 }}>
            <Text style={{ color: 'white' }}>Flight to Italy</Text>
            <Text style={{ color: 'white' }}>9:00 AM</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'column', borderRightColor: 'white', borderRightWidth: 2, paddingRight: 20, width: 70 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>12</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>wed</Text>
          </View>
          <View style={{ borderRadius: 7, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexGrow: 1, marginLeft: 30, marginVertical: 5 }}>
            <Text style={{ color: 'black' }}>Ann's birthday</Text>
            <Text style={{ color: 'black' }}>9:00 AM</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'column', borderRightColor: 'white', borderRightWidth: 2, paddingRight: 20, width: 70 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>12</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>wed</Text>
          </View>
          <View style={{ borderRadius: 7, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexGrow: 1, marginLeft: 30, marginVertical: 5 }}>
            <Text style={{ color: 'black' }}>Ann's birthday</Text>
            <Text style={{ color: 'black' }}>9:00 AM</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'column', borderRightColor: 'white', borderRightWidth: 2, paddingRight: 20, width: 70 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>28</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>fri</Text>
          </View>
          <View style={{ borderRadius: 7, backgroundColor: '#F96A6A', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexGrow: 1, marginLeft: 30, marginVertical: 5 }}>
            <Text style={{ color: 'white' }}>Flight to Italy</Text>
            <Text style={{ color: 'white' }}>9:00 AM</Text>
          </View>
        </View> */}
      </ScrollView>
      {
        bottomMenuVisible ? (
          <View style={{ backgroundColor: 'white', borderRadius: 30, marginBottom: 100 }}>
            <View style={{ backgroundColor: '#2f2f2f', height: 80, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: 'white' }}>Create New Event</Text>
              <TouchableOpacity onPress={() => onToggleBottomMenu()} style={{ position: 'absolute', right: 20, top: 20 }}>
                <Image source={require('../HomeScreen/i_close_white.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.bottomMenuItem, height: 200, paddingTop: 20, marginBottom: 10 }} >
              <View
                style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20, height: 180, width: '80%', borderColor: 'black', borderWidth: 0.4, alignSelf: 'center' }}
                editable={false}
                selectTextOnFocus={false}
                onTouchEnd={() => selectAudio()}
              >
                {cover && cover.length > 0 && (
                  <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: cover[0]?.uri}}
                  ></Image>
                  // <Text>{cover[0].name}</Text>
                )}
              </View>
              {cover.length === 0 && (
                <Text style={{ color: '#9C9C9C', position: 'absolute', right: '58%', top: 60, fontSize: 60, alignSelf: 'center' }}>+</Text>
              )}
            </View>
            <View style={{ ...styles.bottomMenuItem, paddingTop: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Event Name</Text>
              <TextInput
                placeholder="Meet google CEO"
                onChangeText={(e) => setNewEventName(e)}
                style={{ backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1, width: '100%' }}
              />
            </View>
            <View style={{ ...styles.bottomMenuItem, paddingTop: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Time</Text>
              <TextInput
                style={{ backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1, width: '100%' }}
                value={date.toLocaleString()}
                onFocus={() => onShowDate()}
                onTouchEnd={() => onShowDate()}
              />
              {/* {showDateTimePicker && (
                <DateTimePickerAndroid
                  testID="dateTimePicker"
                  value={date}
                  mode={'datetime'}
                  is24Hour={true}
                  onChange={() => onChange()}
                />
              )} */}
            </View>
            <View style={{ ...styles.bottomMenuItem, paddingTop: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Time</Text>
              <TextInput
                placeholder="California, USA"
                style={{ backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1, width: '100%' }}
              />
              <Image source={require('./i_location.png')} style={{ position: 'absolute', right: 50, top: 40 }} />
            </View>
            <View style={{ ...styles.bottomMenuItem }}>
              <View style={{ flexDirection: "row", backgroundColor: isLoading ? "#4caf50" :'black', paddingHorizontal: 40, paddingVertical: 5, borderRadius: 30, alignSelf: 'center', marginTop: 10 }} onTouchEnd={() => isLoading ?null :addEvent()}>
                {isLoading && <ActivityIndicator size="small" color="yellow" />}
                <Text style={{ color: 'white' }}>{isLoading ? "Loading" : "Create"}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.bottomPlusIcon} onStartShouldSetResponder={() => onToggleBottomMenu()}>
            <Image source={require('../HomeScreen/i_plus_white.png')} />
          </View>
        )
      }
    </SafeAreaView>
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
  Txt432: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    lineHeight: 30,
    color: "rgba(255, 255, 255, 1)",
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "black",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    borderBottomColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomWidth: 1
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: 'space-around',
    borderBottomColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomWidth: 1
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "50%",
    textAlign: "center",
    color: 'white'
  },
  bottomPlusIcon: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#1455F5',
    width: 58,
    height: 58,
    borderRadius: 29,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 80,
    width: '100%',
    paddingHorizontal: 50,
    alignItems: 'flex-start',
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
})
