import React, { useEffect, useState } from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimensions, SafeAreaView } from "react-native"
import { productUrl } from "../../constants/BaseUrl";
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('screen');

function PurchasedItem({ navigation, userData }) {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=68d1ff10bdf261e29f2c1b4005b439b3");
      var formdata = new FormData();
      formdata.append("func", "purchased_products");
      formdata.append("user_id", userData.id);
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    fetch(productUrl , requestOptions)
      .then(response => response.json())
      .then(result => {
          setProducts(result);
          console.log(result, "==========================")
      })
  },[]);

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => { { navigation.goBack(); } }}
        />
        <Text style={styles.Txt432}>Purchased Products</Text>
      </View>
      <Text style={{ marginTop: 20, color: 'white' }}>All</Text>
      <View style={{ display: 'flex', flexDirection: 'column' }} >
        <View style={{ width: '100%', backgroundColor: 'white', height: 75, marginTop: 20, borderRadius: 10, display: 'flex', justifyContent: 'center', paddingLeft: 30 }} onTouchEnd={() => navigation.navigate('ProductDetail',{id: userData.id})}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'black', borderRadius: 5, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./item1.png')} />
              </View>
              <Text style={{ marginLeft: 40 }}>$300</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 30 }}>
              <Text style={{ fontSize: 12 }}>Mac miller</Text>
              <Text style={{ fontSize: 12 }}>Music Video</Text>
            </View>
          </View>
        </View>
      </View>
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
  userData: state.accounts.userData,
});

const mapDispatchToProps = dispacth => ({
  
}) 
export default connect(mapStateToProps, mapDispatchToProps)(PurchasedItem);