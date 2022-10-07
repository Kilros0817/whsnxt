import React, { useState, useEffect } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, TextInput, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
const { width, height } = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import KeyboardSpacer from "react-native-keyboard-spacer";
import { productUrl } from '../../constants/BaseUrl';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Video from "react-native-video";


const productTypeOption = [
  { label: 'Audio', value: 'Audio' },
  { label: 'Video', value: 'Video' }
]

export default function AddProduct({ navigation }) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [productType, setProductType] = useState('');
  const [vtype, setVtype] = useState('');
  const [userId, setUserId] = useState("");
  const [videoType, setVideoType] = useState("");
  const [audioName, setAudioName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [audio, setAudio] = useState([]);
  const [album, setAlbum] = useState([]);
  const [video, setVideo] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [pic1, setPic1] = useState([]);
  const [pic2, setPic2] = useState([]);
  const [pic3, setPic3] = useState([]);
  const [titleTrack, setTitleTrack] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoTitle, setPhotoTitle] = useState('');
  const [price, setPrice] = useState('');
  const [productDate, setProductDate] = useState('09-08-2022');
  const [isFocus, setIsFocus] = useState('');

  useEffect(() => {
        AsyncStorage.getItem('whsnxt_user_data').then(res => {
          console.log(res)
          if (res) {
             console.log(JSON.parse(res));
            let userData = JSON.parse(res);
            setUserId(userData?.id)
          }
        }).catch(err => {
          console.log(err);
        })
  })

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };


  selectAudio = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      setAudio(res);
      console.log('Audio res : ' + JSON.stringify(res));
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

  selectVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      setVideo(res);
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

  selectAlbum = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setAlbum(res);
      console.log('Album res : ' + JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  selectPhoto3 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setPic3(res);
      console.log('Photo res : ' + JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  selectPhoto1 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setPic1(res);
      console.log('Photo res : ' + JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  selectPhoto2 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setPic2(res);
      console.log('Photo res : ' + JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  const addProduct = () =>{
    if(price ==""  || albumTitle =="" || album =="")
    {
      return Toast.show({
        type: 'error',
        text1: "Price, album title and album cover are must not empty",
      });
    }
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=a6364ef4066f302f5527e21d655cfc3d");
    var formdata = new FormData();
    formdata.append("func", "new_product");
    formdata.append("user_id", userId);
    formdata.append("product_type", type);
    formdata.append("audio_name", audioName);
    formdata.append("video_category", videoName);
    formdata.append("album_title", albumTitle);
    formdata.append("track_title", titleTrack);
    formdata.append("video_title", videoTitle);
    formdata.append("description", description);
    formdata.append("title_photo", photoTitle);
    formdata.append("price", price);
    formdata.append("product_date", productDate);
    for(const file of audio)
    {
      formdata.append("audio[]", file, file.uri);
    }
    for(const file of video)
    {
      formdata.append("video[]", file, file.uri);
    }
    for(const file of pic1)
    {
      formdata.append("image[]", file, file.uri);
    }
    for(const file of album)
    {
      formdata.append("album[]", file, file.uri);
    }
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(productUrl, requestOptions)
      .then(response => response.json())
      .then(responseData => {
        setIsLoading(false)
        console.log("responseData", responseData)
        if (responseData['error'] == false) {
          navigation.navigate('AddedProduct');
          Toast.show({
            type: 'success',
            text1: 'Product added successfully 👋.',
          });
        } else {
        console.log("eooeo");
          Toast.show({
            type: 'error',
            text1: responseData.msg,
            // text2: ''
          });
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        Toast.show({
        type: 'error',
        text1: err,
        // text2: ''
      })});
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
   // const pdate = moment(date).format('Y-m-d');
    setProductDate(date);
   // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { { navigation.goBack() } }}
        />
        <Text style={styles.Txt432}>Add Product</Text>
      </View>
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'column' }} >
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Product Type</Text>
          <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={productTypeOption}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select...' : '...'}
                value={productType}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item  => {
                  setProductType(item.value)
                  setName(item.value);
                  setIsFocus(false);
                }}
              />
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View onTouchEnd={ () => setType("Pop")} style={type === "Pop"?styles.selected:styles.select}><Text style={type === "Pop"?styles.selectedText:styles.selectText}>Pop</Text></View>
            <View onTouchEnd={ () => setType("Rock")} style={type === "Rock"?styles.selected:styles.select}><Text style={type === "Rock"?styles.selectedText:styles.selectText}>Rock</Text></View>
            <View onTouchEnd={ () => setType("Country")} style={type === "Country"?styles.selected:styles.select}><Text style={type === "Country"?styles.selectedText:styles.selectText}>Country</Text></View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View onTouchEnd={ () => setType("Hard Rock")} style={type === "Hard Rock"?styles.selected:styles.select}><Text style={type === "Hard Rock"?styles.selectedText:styles.selectText}>Hard Rock</Text></View>
            <View onTouchEnd={ () => setType("Blues")} style={type === "Blues"?styles.selected:styles.select}><Text style={type === "Blues"?styles.selectedText:styles.selectText}>Blues</Text></View>
            <View onTouchEnd={ () => setType("Rythm")} style={type === "Rythm"?styles.selected:styles.select}><Text style={type === "Rythm"?styles.selectedText:styles.selectText}>Rythm</Text></View>
          </View> */}
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Audio</Text>
          <TextInput
            placeholder="Only musician and commedians"
            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
            value={audioName}
            onChangeText={value => setAudioName(value)}
          />
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Video</Text>
          {/* <TextInput
            placeholder="Category"
            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
            value={videoName}
            onChangeText={value => setVideoName(value)}
          /> */}
          <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={videoCategoryOption}
                labelField="label"
                valueField="value"
                placeholder={'Category'}
                value={videoName}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item  => {
                  setVideoName(item.value)
                }}
              />
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View onTouchEnd={ () => setVtype("Pop")} style={vtype === "Pop"?styles.selected:styles.select}><Text style={vtype === "Pop"?styles.selectedText:styles.selectText}>Pop</Text></View>
            <View onTouchEnd={ () => setVtype("Rock")} style={vtype === "Rock"?styles.selected:styles.select}><Text style={vtype === "Rock"?styles.selectedText:styles.selectText}>Rock</Text></View>
            <View onTouchEnd={ () => setVtype("Country")} style={vtype === "Country"?styles.selected:styles.select}><Text style={vtype === "Country"?styles.selectedText:styles.selectText}>Country</Text></View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View onTouchEnd={ () => setVtype("Hard Rock")} style={vtype === "Hard Rock"?styles.selected:styles.select}><Text style={vtype === "Hard Rock"?styles.selectedText:styles.selectText}>Hard Rock</Text></View>
            <View onTouchEnd={ () => setVtype("Blues")} style={vtype === "Blues"?styles.selected:styles.select}><Text style={vtype === "Blues"?styles.selectedText:styles.selectText}>Blues</Text></View>
            <View onTouchEnd={ () => setVtype("Rythm")} style={vtype === "Rythm"?styles.selected:styles.select}><Text style={vtype === "Rythm"?styles.selectedText:styles.selectText}>Rythm</Text></View>
          </View> */}
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Audio</Text>
          <View onTouchEnd={() => selectAudio()}>
            <View
              style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20, height: 50, width: '100%' }}
              editable={false}
              selectTextOnFocus={false}
            >
             <Text>{audio.length > 0 ?audio[0].name:""}</Text> 
            </View>
            {audio.length ==0 && (<Text style={{ color: '#9C9C9C', position: 'absolute', right: 10, fontSize: 30, alignSelf: 'center' }}>+</Text>)}
          </View>
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Album Title</Text>
          <TextInput
            placeholder="Album Title"
            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
            value={albumTitle}
            onChangeText={value => setAlbumTitle(value)}
          />
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Album Cover</Text>
          <View onTouchEnd={() => selectAlbum()}>
            <View
              style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 0, height: 200, width: '100%' }}
              editable={false}
              selectTextOnFocus={false}
            >
              <Image source={{uri: album[0]?.uri}} style={{width: '100%', height:'100%', borderRadius: 10}} ></Image>
              {/* <Text>{album.length > 0 ?album[0].name:""}</Text>  */}
            </View>
            {album.length ==0 && (<Text style={{ color: '#9C9C9C', position: 'absolute', right: width / 2.5, top: 50, fontSize: 70, alignSelf: 'center' }}>+</Text>)}
          </View>
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Add track title</Text>
          <TextInput
            placeholder="Add Track Title"
            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
            value={titleTrack}
            onChangeText={value => setTitleTrack(value)}
          />
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Video title</Text>
          <TextInput
            placeholder="Video Title"
            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
            value={videoTitle}
            onChangeText={value => setVideoTitle(value)}
          />
          <View onTouchEnd={() => selectVideo()}>
            <View
              style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 0, height: 200, width: '100%', marginTop: 10 }}
              editable={false}
              selectTextOnFocus={false}
            >
              {video &&  
              (<Video
              style={{width: '100%', height: '100%', borderWidth: 0.5, borderColor: '#646464'}}
              source={{uri: video[0]?.uri}}
              repeat
              resizeMode="contain"
              ></Video>
              )}
            </View>
            {video.length === 0 && (<Text style={{ color: '#9C9C9C', position: 'absolute', right: width / 2.5, top: 50, fontSize: 70, alignSelf: 'center' }}>+</Text>)}
          </View>
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Description</Text>
          <TextInput
            placeholder="Description"
            multiline
            numberOfLines={10}
            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20, textAlignVertical: 'top' }}
            value={description}
            onChangeText={value => setDescription(value)}
          />
          <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Title of photo</Text>
          <TextInput
            placeholder="Title of photo"
            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
            value={photoTitle}
            onChangeText={value => setPhotoTitle(value)}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '30%' }}>
              <View
                style={{ backgroundColor: 'white', borderRadius: 10, height: width / 3.5, width: '100%', marginTop: 10 }}
                editable={false}
                selectTextOnFocus={false}
                onTouchEnd={() => selectPhoto1()}
              >
                {pic1.length !=0 && (<Image source={{uri: pic1[0]?.uri}} style={{width: '100%', height:'100%', borderRadius: 10}} ></Image>)}
              {/* <Text>{pic1.length > 0 ?pic1[0].name:""}</Text>  */}
              {pic1.length ==0 && (<Text style={{ color: '#9C9C9C', right: 0, top: 10, fontSize: 70, alignSelf: 'center' }}>+</Text>)}
              </View>
            </View>
            <View  style={{ width: '30%' }}>
              <View
                style={{ backgroundColor: 'white', borderRadius: 10, height: width / 3.5, width: '100%', marginTop: 10 }}
                editable={false}
                selectTextOnFocus={false}
                onTouchEnd={() => selectPhoto2()}
              >
                {pic2.length !=0 && (<Image source={{uri: pic2[0]?.uri}} style={{width: '100%', height:'100%', borderRadius: 10}} ></Image>)}
                {/* <Text>{pic2.length > 0 ?pic2[0].name:""}</Text>  */}
              {pic2.length ==0 && (<Text style={{ color: '#9C9C9C', right: 0, top: 10, fontSize: 70, alignSelf: 'center' }}>+</Text>)}
              </View>
            </View>
            <View style={{ width: '30%' }}>
              <View
                style={{ backgroundColor: 'white', borderRadius: 10, height: width / 3.5, width: '100%', marginTop: 10 }}
                editable={false}
                selectTextOnFocus={false}
                onTouchEnd={() => selectPhoto3()}
              >
                {pic3.length !=0 && (<Image source={{uri: pic3[0]?.uri}} style={{width: '100%', height:'100%', borderRadius: 10}} ></Image>)}
                {/* <Text>{pic3.length > 0 ?pic3[0].name:""}</Text> */}
              {pic3.length ==0 && (<Text style={{ color: '#9C9C9C', right: 0, top: 10, fontSize: 70, alignSelf: 'center' }}>+</Text>)}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '40%' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Price</Text>
              <TextInput
                placeholder="EU-44"
                style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
                value={price}
                onChangeText={value => setPrice(value)}
              />
            </View>
            <View style={{ width: '50%' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Product date</Text>
              <TextInput
                placeholder="09-12-2021"
                style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
                value={productDate}
               // onTouchEnd = {showDatePicker}
                onChangeText={value => setProductDate(value)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginBottom: 100 }}>
            <View style={{ width: '45%', borderRadius: 40, borderWidth: 2, borderColor: '#1455F5', backgroundColor: 'black', paddingVertical: 10 }} onTouchEnd={() => navigation.goBack()}>
              <Text style={{ color: '#1455F5', fontSize: 18, textAlign: 'center' }}>Cancel</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '45%', borderRadius: 40, borderWidth: 0.4, borderColor: 'red', backgroundColor: isLoading ? "#4caf50" : "#1455F5", paddingVertical: 10 }} onTouchEnd={() => isLoading ?null : addProduct()}>
                {isLoading && <ActivityIndicator size="small" color="yellow" />}
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', paddingLeft: 3 }}>
                  {isLoading ? "Loading" : "Add"}
                </Text>
            </View>
          </View>
        </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <KeyboardSpacer />
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
  select:{
    backgroundColor: 'black',
    borderRadius: 34, 
    borderColor: 'white',
    borderWidth: 1, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    width: '30%'
  },
  selected:{
    backgroundColor: 'white',
    borderRadius: 34, 
    borderColor: 'black',
    borderWidth: 1, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    width: '30%'
  },
  selectText:{ 
    color: 'white', 
    fontSize: 14, 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  selectedText:{ 
    color: 'black', 
    fontSize: 14, 
    textAlign: 'center', 
    fontWeight: 'bold'
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
    fontSize: 16, marginTop: 10,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    lineHeight: 30,
    color: "rgba(255, 255, 255, 1)",
  },
  dropdown: {
    backgroundColor: "white",
    margin: 4,
    height: 50,
    borderRadius: 22,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 10,
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    color: 'black'
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
