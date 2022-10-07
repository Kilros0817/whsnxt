import React, { useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from "react-native"
import _ from "lodash";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const { width, height } = Dimensions.get('screen');

export default function DashboardScreen({ navigation }) {
  const [columns, setColumns] = useState([
    "Location",
    "Age",
    "Male",
  ])
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [pets, setPets] = useState([
    {
      Location: "Japan",
      Age: 0,
      Male: 5,
    },
    {
      Location: "United States",
      Age: 40,
      Male: 30,
    },
  ])

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc"
    const sortedData = _.orderBy(pets, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setPets(sortedData)
  }
  const tableHeader = () => (
    <View style={styles.tableHeader} >
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={styles.columnHeader}
                onPress={() => sortTable(column)
                }>
                <Text style={styles.columnHeaderTxt}> {column + " "
                }
                  {/* {
                    selectedColumn === column && <MaterialCommunityIcons
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                    />
                  } */}
                </Text >
              </TouchableOpacity >
            )
          }
        })
      }
    </View >
  )

  const VirtualizedList = ({ children }) => {
    return (
      <FlatList
        data={[]}
        keyExtractor={() => "key"}
        renderItem={null}
        ListHeaderComponent={
          <>{children}</>
        }
      />
    )
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onTouchEnd={(e) => { { e.stopPropagation(); navigation.goBack() } }}
        />
        <Image source={require('./user.png')} style={{ alignSelf: 'center' }} />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10, fontSize: 10, fontWeight: '700' }}>Jonh Doe</Text>
      </View>
      <VirtualizedList>
        <View style={{ marginTop: 30 }}>
          <ScrollView horizontal>
            <View style={{ width: 140, height: 140, marginRight: 10 }}>
              <ImageBackground source={require('./back1.png')} style={{ width: 140, height: 140 }} />
            </View>
            <View style={{ width: 140, height: 140, marginHorizontal: 10 }}>
              <ImageBackground source={require('./back2.png')} style={{ width: 140, height: 140 }} />
            </View>
            <View style={{ width: 140, height: 140, marginHorizontal: 10 }}>
              <ImageBackground source={require('./back1.png')} style={{ width: 140, height: 140 }} />
            </View>
          </ScrollView>
        </View>
        <Image source={require('./heatmap.png')} style={{ width: '100%', height: 'auto', aspectRatio: 335 / 215, marginTop: 30 }} />
        <Image source={require('./analystics.png')} style={{ width: '100%', height: 'auto', aspectRatio: 343 / 207, marginTop: 30 }} />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 30, marginLeft: 10 }}>Fan Demographics</Text>
        <View style={styles.container}>
          <FlatList
            data={pets}
            style={{ width: "90%" }}
            keyExtractor={(item, index) => index + ""}
            ListHeaderComponent={tableHeader}
            stickyHeaderIndices={[0]}
            renderItem={({ item, index }) => {
              return (
                <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "black" : "black" }
                }>
                  <Text style={{ ...styles.columnRowTxt, fontWeight: "bold", color: 'white' }}> {item.Location}</Text >
                  <Text style={styles.columnRowTxt}>{item.Age}%</Text >
                  <Text style={styles.columnRowTxt}> {item.Male}%</Text >
                </View >
              )
            }}
          />
        </View>
        <View style={{ marginVertical: 40 }}>
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
              '2022-07-16': { selected: true, marked: true, selectedColor: 'blue' },
              '2022-07-19': { selected: true, marked: true, selectedColor: 'orange' },
              '2022-07-25': { selected: true, marked: true, selectedColor: 'red' },
            }}
            style={{ backgroundColor: 'black' }}
            initialDate={'2022-07-01'}
          />
        </View>
      </VirtualizedList>
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
