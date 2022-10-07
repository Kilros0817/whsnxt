import React, { useState, useEffect } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, TextInput, SafeAreaView, ScrollView, Button, TouchableOpacity } from "react-native"
import { productUrl, imageUrl } from "../../constants/BaseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConvertToUrlForm } from '../../Util/Util';

const { width, height } = Dimensions.get('screen');

export default function AddedProducts({ navigation, route }) {

  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');

 
  

  useEffect(() => {
    AsyncStorage.getItem('whsnxt_user_data').then(res => {
      console.log(res)
      if (res) {
         console.log(JSON.parse(res));
        let userData = JSON.parse(res);
        setUserId(userData?.id)
        getProduct();
      }
    }).catch(err => {
      console.log(err);
    })
  }, [])

  

  const getProduct = () =>{
    const data = {
      func: 'products',
    }
    let sendData = ConvertToUrlForm(data);
    fetch(productUrl, { 
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }, 
      body: sendData 
    })
      .then(response => response.json())
      .then(responseData => {
        setProducts(responseData?.data);
        console.log("Added Products", responseData.data);
        if (responseData['error'] == false) {
  
        }
      })
      .catch(err => {
        console.log("catch", err);
      });
  }
  
 if(route.params)
    getProduct();

  const handleDelete = (id) => {
    const data = {
      func: 'delete_product',
      id: id
    }
    let sendData = ConvertToUrlForm(data);
    fetch(productUrl, { 
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }, 
      body: sendData 
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData['error'] == false) {
            getProduct();
        }
      })
      .catch(err => {
        console.log("catch", err);
      });
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { { navigation.goBack() } }}
        />
        <Text style={styles.Txt432}>Added Products</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', marginRight: 10 }}>
        <TextInput
          placeholder="Search"
          style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, paddingLeft: 20 }}
        />
        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }} onTouchEnd={() => navigation.navigate('AddProduct')}>+</Text>
      </View>
      <Text style={{ marginTop: 20, color: 'white' }}>All</Text>
      <ScrollView style={{ display: 'flex', flexDirection: 'column', marginBottom: 30 }} >
        {products?.map((item, index) => (
        <View key={`item-${index}`} style={{ width: '100%', backgroundColor: 'white', height: 75, marginTop: 20, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 30 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'black', borderRadius: 5, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {item.product_data.image?(
                <Image source={{uri: `${imageUrl+'products/album/'+item.product_data.album}`}} resizeMode="contain" style={{width: 50, height: 50}} />
               ):(
                <Image source={require('./item1.png')} />
               )}
              </View>
              <Text style={{ marginLeft: 40 }}>$ {item.product_data.price?item.product_data.price:0}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 , marginTop: 10, maxWidth: 120}}>
              <Text style={{ fontSize: 12 }}>{item.product_data.album_title?item.product_data.album_title:''}</Text>
              <Text style={{ fontSize: 12 }}>{item.product_data.video_title?item.product_data.video_title:''}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingRight: 10, alignItems: 'center' }}>
                <TouchableOpacity style={{margin: 5}} activeOpacity={0.5} onPress={()=>{navigation.navigate('EditProduct', item.product_id)}}>
                  <Image
                    source={require('./i_note.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 5}} activeOpacity={0.5} onPress={()=>{handleDelete(item.product_id)}}>
                  <Image
                    source={require('./i_close_black.png')}
                  />
                </TouchableOpacity>
              </View>
          </View>
        </View>
        ))}
        
        {/* 
        <View style={{ width: '100%', backgroundColor: 'white', height: 75, marginTop: 20, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 30 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'black', borderRadius: 5, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./item2.png')} />
              </View>
              <Text style={{ marginLeft: 40 }}>$300</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 30 }}>
              <Text style={{ fontSize: 12 }}>Mac miller</Text>
              <Text style={{ fontSize: 12 }}>Music Video</Text>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: 'white', height: 75, marginTop: 20, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 30 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'black', borderRadius: 5, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./item3.png')} />
              </View>
              <Text style={{ marginLeft: 40 }}>$300</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 30 }}>
              <Text style={{ fontSize: 12 }}>Mac miller</Text>
              <Text style={{ fontSize: 12 }}>Music Video</Text>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: 'white', height: 75, marginTop: 20, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 30 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'black', borderRadius: 5, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./item4.png')} />
              </View>
              <Text style={{ marginLeft: 40 }}>$300</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 30 }}>
              <Text style={{ fontSize: 12 }}>Mac miller</Text>
              <Text style={{ fontSize: 12 }}>Music Video</Text>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: 'white', height: 75, marginTop: 20, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 30 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'black', borderRadius: 5, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./item5.png')} />
              </View>
              <Text style={{ marginLeft: 40 }}>$300</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 30 }}>
              <Text style={{ fontSize: 12 }}>Mac miller</Text>
              <Text style={{ fontSize: 12 }}>Music Video</Text>
            </View>
          </View>
        </View> */}
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
  Txt432: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    lineHeight: 30,
    color: "rgba(255, 255, 255, 1)",
  },
})
