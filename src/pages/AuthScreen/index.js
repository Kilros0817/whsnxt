import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  Pressable,
  SafeAreaView
} from 'react-native';
const { width, height } = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

export default function LogIn({ navigation }) {
  return (
    <SafeAreaView style={styles.LogIn}>
      <Image
        style={styles.Group2}
        source={require('./group.png')}
      />
      <View style={styles.Group319}>
        <Text style={styles.Txt9100}> “Who’ s Next ? YOU Decide...” </Text>
        <View style={styles.Group914}>
          <Pressable android_ripple={{ color: 'white' }} style={{
            alignSelf: 'stretch'
          }} onTouchEnd={() => navigation.navigate('SignIn')}>
            <Text style={styles.Txt6410}> Sign In </Text>
          </Pressable>
        </View>
        <View style={styles.Group678}>
          <Pressable android_ripple={{ color: 'white' }} style={{
            alignSelf: 'stretch'
          }} onTouchEnd={() => navigation.navigate('SignUp')}>
            <Text style={styles.Txt6410}> Sign up </Text>
          </Pressable>
        </View>
        <View style={styles.Group142}>
          <Image
            style={styles.FlatColorIconsGoogle}
            source={require('./i_google.png')}
          />
          <Text style={styles.Txt572}> Sign up with Gmail </Text>
        </View>
        <Text style={styles.multiple1}>
          By process you agreee to the{' '}
          <Text style={styles.multiple2}>Privacy Policy</Text>
        </Text>
        <Text style={{ ...styles.multiple1, marginBottom: 40 + bottomNavBarHeight }}>
          {' '}
          and <Text>Terms & Conditions</Text>{' '}
        </Text>
      </View >
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  LogIn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,1)',
    width: width,
    height: height,
  },
  Group2: {
    width: width,
    aspectRatio: 1,
    height: 'auto'
  },
  Txt1024: {
    position: 'absolute',
    top: height / 3.5,
    left: width / 2.5,
    fontSize: 14,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  Group319: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  Txt9100: {
    fontSize: 18,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: height / 20,
  },
  Group914: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 42,
    backgroundColor: 'rgba(0,93,227,1)',
    width: width / 1.42,
    height: 50,
    overflow: 'hidden'
  },
  Txt6410: {
    fontSize: 18,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    lineHeight: 48,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'center',
    textAlign: 'center'
  },

  Group678: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 42,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,93,227,1)',
    width: width / 1.42,
    height: 50,
    overflow: 'hidden'
  },

  Group142: {
    display: 'flex',
    flexDirection: 'row',
    width: width / 1.42,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(20,85,245,1)',
  },
  FlatColorIconsGoogle: {
    width: 38,
    height: 38,
    marginRight: 15,
  },
  Txt572: {
    fontSize: 18,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    lineHeight: 48,
    color: 'rgba(0,0,0,1)',
  },

  multiple1: {
    fontSize: 10,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    lineHeight: 12,
    color: '#292929',
  },
  multiple2: {
    fontSize: 10,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    lineHeight: 12,
    color: '#fff',
  },
});
