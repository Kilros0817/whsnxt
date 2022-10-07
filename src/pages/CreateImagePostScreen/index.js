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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Toast  from 'react-native-toast-message';
import SweetAlert from 'react-native-sweet-alert';
import DocumentPicker from 'react-native-document-picker';
import { connect } from 'react-redux';
import { httpHeaders, postUrl } from '../../constants/BaseUrl';
import { ConvertToUrlForm } from '../../Util/Util'
import { vi } from 'date-fns/locale';

const { width, height } = Dimensions.get('screen');

function CreateImagePost({ navigation, userData, route }) {

  const [isLoading, setIsLoading] = useState(false);
  const textInputRef = React.useRef();
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState([]);
  const [audio, setAudio] = useState([]);
  const [video, setVideo] = useState([]);
  const [image, setImage] = useState([]);
  const [mode, setMode] = useState(0); // 0: create, 1: edit

  useEffect(() => {
   // textInputRef.current?.focus();
    if(route.params?.editMode) {
      setMode(1);
      setPostContent(route.params?.content);
    };
    console.log("userData", userData)
  }, []);

  selectAudio = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const modifiedRow = [...media, res[0]];
      const selecte = [...audio, res[0]];
      setAudio(selecte);
      setMedia(modifiedRow);
      console.log('Audio res : ' + JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  selectVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const modifiedRow = [...media, res[0]];
      const selecte = [...video, res[0]];
      setVideo(selecte);
      setMedia(modifiedRow);
      console.log('Video res : ' + JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  selectImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const modifiedRow = [...media, res[0]];
      const selecte = [...video, res[0]];
      setImage(selecte);
      setMedia(modifiedRow);
      console.log('Video res : ' + JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  onClickPost = () => {
    if(postContent.length < 30) {
      return Toast.show({
        type: 'error',
        text1: 'You have to type at least 30 characters'
      })
    }
    setIsLoading(true);
    if(mode == 0) {
      var formdata = new FormData();
      formdata.append("func", "new_post");
      formdata.append("content", postContent);
      formdata.append("tags", null);
      formdata.append("user_id", userData.id);
      for(const file of audio)
      {
        formdata.append("audio[]", file, file.uri);
      }
      for(const file of video)
      {
        formdata.append("video[]", file, file.uri);
      }
      for(const file of image)
      {
        formdata.append("image[]", file, file.uri);
      }

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      fetch(postUrl, requestOptions)
        .then(response => {return response.json()})
        .then(responseData => {
          setIsLoading(false);
          console.log('new post', responseData);
          if (responseData['error'] == false) {
            navigation.navigate('Home', { createPost: true });
          } else {
            SweetAlert.showAlertWithOptions({
              title: responseData.msg,
              subTitle: '', 
              confirmButtonTitle: 'Ok',
              confirmButtonColor: '#000',
              style: 'error',
              cancellable: true,
            });
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log('Error', error);
          SweetAlert.showAlertWithOptions({
            title: 'Sorry, Failed retry.',
            subTitle: '',
            confirmButtonTitle: 'Ok',
            confirmButtonColor: '#000',
            style: 'error',
            cancellable: true,
          });
        });

    } else {
      let details = {
        func: 'update_post',
        content: postContent,
        tags: null,
        user_id: userData.id,
        audio: null,
        video: null,
        image: null,
        id: route.params?.key
      };
      let formBody = ConvertToUrlForm(details);
      fetch(postUrl, {
        method: 'POST',
        headers: httpHeaders,
        body: formBody,
      })
        .then(response => {return response.json()})
        .then(responseData => {
          console.log('update post', responseData);
          if (responseData['error'] == false) {
            navigation.navigate('Home', { createPost: true });
          } else {
            SweetAlert.showAlertWithOptions({
              title: responseData.msg,
              subTitle: '', 
              confirmButtonTitle: 'Ok',
              confirmButtonColor: '#000',
              style: 'error',
              cancellable: true,
            });
          }
        })
        .catch(error => {
          console.log('Error', error);
          SweetAlert.showAlertWithOptions({
            title: 'Sorry, Failed retry.',
            subTitle: '',
            confirmButtonTitle: 'Ok',
            confirmButtonColor: '#000',
            style: 'error',
            cancellable: true,
          });
        });
    }
    // navigation.navigate('Home', { createPost: true });
  };

  const userAvatar = userData.profile_pic ? (
    <Image
      source={{ uri: userData.profile_pic }}
      style={{
        alignSelf: 'center',
        marginTop: 30,
        width: 100,
        aspectRatio: 1,
        height: 'auto',
      }}
    />
  ) : (
    <Image
      source={require('../../assets/img/default-avatar.png')}
      style={{
        alignSelf: 'center',
        marginTop: 30,
        width: 100,
        aspectRatio: 1,
        height: 'auto',
        borderRadius: 50
      }}
    />
  );

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
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
        <Text style={styles.Txt432}>Create Post</Text>
        <View
          style={{
            backgroundColor: isLoading ? "#4caf50" : "#1455F5",
            borderRadius: 8,
            width: 70,
            height: 30,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            right: 10,
          }}
          onTouchEnd={() => isLoading ?null :onClickPost()}
        >
          {isLoading && <ActivityIndicator size="small" color="yellow" />}
          <Text
            style={{
              color: 'white',
              fontSize: 12,
            }}
          >
            {mode? `${isLoading?"Loading":"Update"}`:`${isLoading?"Loading":"Upload"}`}
          </Text>
        </View>
      </View>
      <View>
      {userAvatar}
        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 14 }}>
          {userData.first_name} {userData.last_name}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#2d2d2d',
          marginTop: 10,
          color: 'white',
          justifyContent: 'flex-start',
          padding: 10,
          borderBottomColor: "#BABABA", 
          borderBottomWidth: 2,
        }}
      >
        <TextInput
          multiline={true}
          numberOfLines={20}
          ref={textInputRef}
          style={{ color: 'white', textAlignVertical: 'top' }}
          placeholder="Type here..."
          selectionColor={'orange'}
          placeholderTextColor={'#fff2f0'}
          value={postContent}
          onChangeText={(e) => setPostContent(e)}
        ></TextInput>
      </ScrollView>
      <View >
      {media && media.length > 0 && (
        <View 
          style={{
              display: 'flex',
              flexDirection: "row",
              height: "22%",
              width: "100%",
             borderBottomColor: "#BABABA", 
             borderBottomWidth: 2,
             justifyContent: "flex-start",
             alignItems: "center",
            }}
        >
          {media.map((item, index)=>(
            <View style={{
                display: 'flex',
                flexDirection: 'row', 
                justifyContent: "center", 
                alignItems: 'center',
                backgroundColor: '#2d2d2d',
                borderRadius: 18,
                padding: 8,
                marginBottom: 5
              }}>
              <Text key={`media-cont-${index}`} style={{color: 'white', padding: 5}}>{item.name}</Text>
              <Text style={{color: 'white', marginLeft: 5}}>x</Text>
            </View>
          ))}
        </View>
      )}
        <View 
            style={{
              display: 'flex',
              flexDirection: "row",
              height: "28%",
              width: "100%",
              marginTop: 15
            }}
        >
          <TouchableOpacity onPress={() => selectAudio()}>
            <Image source={require("./mic.png")} style={{marginBottom: 25, marginLeft: 10}} width={30} height={30} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectImage()}>
            <Image source={require("./camera.png")} style={{marginBottom: 25, marginLeft: 20}} width={30} height={30} resizeMode="contain"  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectVideo()}>
            <Image source={require("./video.png")} style={{marginBottom: 25, marginLeft: 20}} width={30} height={30} resizeMode="contain"  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectImage()}>
            <Image source={require("./gallery.png")} style={{marginBottom: 25, marginLeft: 20}} width={30} height={30} resizeMode="contain"  />
          </TouchableOpacity>
        </View>
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
  group2:{
    display: 'flex',
    flexDirection: 'column',
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

const mapStateToProps = state => ({
  userData: state.accounts.userData,
});

const mapDispatchToProps = dispacth => ({
  
}) 
export default connect(mapStateToProps, mapDispatchToProps)(CreateImagePost);