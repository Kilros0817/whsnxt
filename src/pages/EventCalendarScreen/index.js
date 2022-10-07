import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from "react-native"
import _ from "lodash";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ConvertToUrlForm } from "../../Util/Util";
import { eventUrl } from "../../constants/BaseUrl";
import { createIconSetFromFontello } from "react-native-vector-icons";

const { width, height } = Dimensions.get('screen');

export default function EventCalendarScreen({ navigation }) {
  const [marks, setMarks] = useState([]);

  let d = new Date();
  let today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

  useEffect(()=>{
    const data = {
      func: 'events',
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
       console.log("responseData", responseData);
       var obj = {};
       responseData?.data.map(event=>{
        obj[`${event.event_date}`] = {selected: true, marked: true, selectedColor: 'blue'}
       })
       setMarks(obj);
       console.log(obj);
      })
      .catch(err => {
        console.log("catch", err);
      });
  },[]);

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onStartShouldSetResponder={(e) => true}
          onTouchEnd={(e) => { { e.stopPropagation(); navigation.goBack() } }}
        />
        <Text style={styles.Txt432}>Event Calendar</Text>
      </View>
      <ScrollView>
        <View style={{ marginVertical: 40 }}>
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={marks}
            style={{ backgroundColor: 'black' }}
            initialDate={today}
            onDayPress={day => {
              navigation.navigate('Event')
            }}
          />
        </View>
        <View style={{ marginVertical: 40 }}>
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={marks}
            style={{ backgroundColor: 'black' }}
            initialDate={today}
            onDayPress={day => {
              navigation.navigate('Event')
            }}
          />
        </View>
      </ScrollView>
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
  }
})
