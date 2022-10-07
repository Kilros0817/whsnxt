import React, { useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, TextInput, ScrollView, SafeAreaView } from "react-native"


const { width, height } = Dimensions.get('screen');

export default function FavoritesScreen({ navigation }) {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  onToggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
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
        <Text style={styles.Txt432}>Favorites</Text>
        <Image
          style={styles.Group380}
          source={require('./i_store.png')}
          onTouchEnd={(e) => { { e.stopPropagation(); navigation.goBack() } }}
        />

      </View>
      <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: 'column' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store1.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_white.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store2.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_red.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store3.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_white.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store3.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_white.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store4.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_white.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store5.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_white.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store1.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_white.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
          <View style={{ width: '40%', backgroundColor: 'white', borderRadius: 10, marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onTouchEnd={() => navigation.navigate('ProductDetail')}>
            <Image source={require('./store2.png')} style={{ width: '90%', aspectRatio: 1, height: 'auto' }} />
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>$300 {" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}Mac Miller</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', alignSelf: 'flex-start', marginTop: 5 }}>Painting for the future</Text>
            <Image source={require('./i_heart_red.png')} style={{ position: 'absolute', right: 5, bottom: 20 }} />
          </View>
        </View>
      </ScrollView>
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
