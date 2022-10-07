import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, Button, SafeAreaView } from "react-native"
import { connect } from "react-redux";
import { imageUrl } from "../../constants/BaseUrl";
import { addToCart } from "../../redux/actions/cart";

const { width, height } = Dimensions.get('screen');

function CheckOutScreen({ navigation, route, products, addToCart }) {
  const [amount, setAmount] = useState(1);
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setUserId(route.params?.id);
    const product = products && products.length > 0?products[0]:null;
    const audios = product && product.audio? product.audio.split(","):null;
    const qty = product && product.quantity? parseInt(product.quantity) : 1;
    const audio = audios && audios.length > 0?audios: product && product.audio?[ product.audio]:null;
    setAudio(audio);
    setProduct(product);
    setAmount(qty);
  }, []);

  onControlAmount = (d) => {
    let qty = amount;
    if (d == -1) {
      let newAmount = amount - 1;
      qty = amount - 1;
      if (newAmount < 0) 
      {
        newAmount = 0; 
        qty = 0;
      }
        setAmount(newAmount);
    } else {
      qty = amount + 1
      setAmount(amount + 1);
    }
    let obj = product;
    obj.quantity = qty;
    addToCart(obj);
  }

  getTotal = (product) =>{
    const price  = product && product.price ? parseInt(product.price):0;
    const qty    = product && product.quantity ? parseInt(product.quantity):1;
    return price * qty;
  }

  getSubTotal = (product) =>{
    const price  = product && product.price ? parseInt(product.price):0;
    const qty    = product && product.quantity ? parseInt(product.quantity):1;
    return price * qty;
  }

  onClickPay = () => {
    const price  = product && product.price ? parseInt(product.price):0;
    const qty    = product && product.quantity ? parseInt(product.quantity):1;
    const total  = price * qty;
    navigation.navigate('ProductPaymentMethod', { amount: total.toString(), id: userId });
  }

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onStartShouldSetResponder={(e) => true}
          onTouchEnd={() => { navigation.goBack() }}
        />
        <Text style={styles.Txt432}>CheckOut</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 50, paddingHorizontal: 10, width: '100%' }}>
        <Image source={{uri: imageUrl+'products/image/'+product?.album}} style={{ width: 80, height: 80 }} />
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }} >
          <Text style={{ color: 'white', fontSize: 12, marginLeft: 20 }}>{product?.album_title}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{ color: '#1455F5', fontSize: 12, marginLeft: 20 }}>${product?.price}</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', position: 'absolute', right: 0, bottom: 0 }}>
          <Image source={require('./i_minus.png')} onTouchEnd={() => onControlAmount(-1)} />
          <Text style={{ color: 'white', fontSize: 12, alignItems: 'center', marginHorizontal: 10 }}>Qty :{" "} {product?.quantity}</Text>
          <Image source={require('./i_plus.png')} onTouchEnd={() => onControlAmount(1)} /></View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', width: '100%', marginTop: 20 }} />
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>Track list</Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>{amount} items(s), Total: <Text style={{ color: '#1455F5' }}>${getTotal(product)}</Text></Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
      {audio?.map((item, index)=>
        <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={require('./detail5.png')} />
          <Text style={{ fontSize: 12, fontWeight: '600', color: 'white', marginLeft: 10 }}>{item}</Text>
        </View>
      )}
        {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={require('./detail5.png')} />
          <Text style={{ fontSize: 12, fontWeight: '600', color: 'white', marginLeft: 10 }}>Song 2</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={require('./detail5.png')} />
          <Text style={{ fontSize: 12, fontWeight: '600', color: 'white', marginLeft: 10 }}>Song 3</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={require('./detail5.png')} />
          <Text style={{ fontSize: 12, fontWeight: '600', color: 'white', marginLeft: 10 }}>Song 4</Text>
        </View> */}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>Subtotal(1 item)</Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>${getSubTotal(product)}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>Total :{" "}<Text style={{ color: '#1455F5' }}>${getSubTotal(product)}</Text></Text>
      </View>
      <View style={{ width: '50%', backgroundColor: "#1455F5", padding: 10, borderRadius: 20, alignSelf: 'center', marginTop: 100 }} onTouchEnd={() => onClickPay()}><Text style={{ color: 'white', alignSelf: 'center' }}>Pay</Text></View>
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
    color: 'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen)
