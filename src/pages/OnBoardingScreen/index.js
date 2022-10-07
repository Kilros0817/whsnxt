import React, { useEffect } from "react"
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from "../../redux/actions/AccountsActions";
import { connect } from "react-redux";
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const { width, height } = Dimensions.get('screen');

function onBoardingScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      {
        // if (AsyncStorage.getItem('whsnxt_user_data')) {
        //   let userData = AsyncStorage.getItem('whsnxt_user_data');
        //   console.log(userData);
        //   let diff = new Date().getTime() - userData.timeStamp;
        //   if (diff <= 0 || diff > 1000 * 3600 * 24) {
        //     navigation.navigate('Auth');
        //   } else {
        //     setUserData(userData);
        //     navigation.navigate('Home');
        //   }
        // } else {
        //   navigation.navigate('Auth');
        // }
        AsyncStorage.getItem('whsnxt_user_data').then(res => {
          console.log(res)
          if (res) {
            console.log(JSON.parse(res));
            let userData = JSON.parse(res);
            console.log('board', userData)
            let diff = new Date().getTime() - userData.timeStamp;
            if (diff <= 0 || diff > 1000 * 3600 * 24) {
              navigation.navigate('Auth');
            } else {
              setUserData(userData);
              if(userData.email)
              {
                navigation.navigate('Home');
              }
              /* signInWithEmailAndPassword(auth, userData.email, 'adminadmin')
              .then((userCredential) => {
                // navigation.navigate('Chat');
                navigation.navigate('Home');
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
              }); */
              // navigation.navigate('Home');
            }
          } else {
            navigation.navigate('Auth');
          }
        }).catch(err => {
          console.log(err);
          navigation.navigate('Auth');
        })
      }
    }, 3000)
  })

  return (
    <View style={styles.onBoardingScreen} onStartShouldSetResponder={() => { navigation.navigate('Auth') }}>
      <Image style={styles.Unsplash2egnqazbamk}
        source={require('./Group_48095699.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  onBoardingScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,1)",
    width: width,
    height: height,
    paddingHorizontal: 20
  },
  Unsplash2egnqazbamk: {
    width: width,
    height: 465 / 365 * width
  },
})

const mapStateToProps = state => ({
  userData: state.accounts.userData
});
const mapDispatchToProps = dispatch => ({
  setUserData: user_data => setUserData(dispatch, user_data),
});

export default connect(mapStateToProps, mapDispatchToProps)(onBoardingScreen);