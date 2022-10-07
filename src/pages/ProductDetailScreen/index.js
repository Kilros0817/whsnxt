import { split } from "lodash";
import React, { useState, useEffect, useCallback } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, Button, ScrollView, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { imageUrl } from "../../constants/BaseUrl";

const { width, height } = Dimensions.get('screen');

function ProductDetail({ navigation, route, addToCart, products }) {
  const [amount, setAmount] = useState('01');
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(()=>{
    setUserId(route.params?.id);
    const product = route.params?.product?route.params.product: null;
    setProduct(product);
    const images = product && product.product_data.image? product.product_data.image.split(","):null;
    const audios = product && product.product_data.audio? product.product_data.audio.split(","):null;
    const audio = audios && audios.length > 0?audios: product && product.product_data.audio?[ product.product_data.audio]:null;
    setImages(images);
    setAudio(audio);
   // console.log("images", images);
   // console.log("audios", audio);
   // images.map((item) => console.log("images", item));
  },[]);

  onControlAmount = (d) => {
    if (d == -1) {
      let oldAmount = parseInt(amount, 10);
      let newAmount = oldAmount - 1;
      if (newAmount < 0) newAmount = 0;
      newAmount = newAmount < 10 ? '0' + newAmount : newAmount + '';
      setAmount(newAmount)
    } else {
      let oldAmount = parseInt(amount, 10);
      let newAmount = oldAmount + 1;
      if (newAmount < 0) newAmount = 0;
      newAmount = newAmount < 10 ? '0' + newAmount : newAmount + '';
      setAmount(newAmount)
    }
  }

  onClickAddToCart = async (product) => {
    const data = product.product_data;
    if (parseInt(amount, 10) > 0)
    {
      let obj = {
        ...product.product_data,
        quantity: amount
      }
      await addToCart(obj)
    }
    navigation.navigate('CheckOut', { amount: amount.toString(), id: userId })
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onTouchEnd={() => { navigation.goBack() }}
        />
        <Text style={styles.Txt432}>Product Detail</Text>
      </View>
      <ScrollView>
        <View><Image source={product && product.product_data.album? {uri: `${imageUrl+'products/image/'+product.product_data.album}`} :require('./detail1.png')} style={{ width: '70%', borderRadius: 10, alignSelf: 'center', marginTop: 20, aspectRatio: 1, height: 'auto' }}></Image></View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 40, marginTop: 20 }}>
          {images?.map((item, index)=> <Image key={index} source={{uri: `${imageUrl+item}`}} style={{padding: 10, width: 50, height: 50, borderRadius: 10 }}  /> )}
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
        {audio?.map((item, index)=> <View key={index} style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}><Image source={require('./detail5.png')} /><Text style={{ fontSize: 10, color: 'white', marginLeft: 10, fontWeight: '800' }}>{item}</Text></View> )}
          
         {/*  <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}><Image source={require('./detail5.png')} /><Text style={{ fontSize: 10, color: 'white', marginLeft: 10, fontWeight: '800' }}>Song 2</Text></View> */}
          <Text style={{ color: 'white', position: 'absolute', right: 10 }}>${product?.product_data.price}</Text>
        </View>
        <View style={{ backgroundColor: '#1455F5', display: 'flex', flexDirection: 'row', marginTop: 20, width: '20%', borderBottomLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'space-evenly', paddingVertical: 5 }}>
          <Image source={require('./i_minus.png')} onTouchEnd={() => onControlAmount(-1)} />
          <Text style={{ color: 'white' }}>{amount}</Text>
          <Image source={require('./i_plus.png')} onTouchEnd={() => onControlAmount(1)} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Product Info</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>{product?.product_data?.description}</Text>
        </View>
        <View style={{ width: '50%', backgroundColor: "#1455F5", padding: 10, borderRadius: 20, alignSelf: 'center', marginTop: 30, marginBottom: 70 }} onTouchEnd={() => onClickAddToCart(product)}><Text style={{ color: 'white', alignSelf: 'center' }}>Add to cart</Text></View>
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
})

const mapStateToProps = state => ({
  products: state.cart.products,
});
const mapDispatchToProps = dispatch => ({
  addToCart: (data) => addToCart(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)