import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from './src/pages/AuthScreen/index';
import SignInScreen from './src/pages/SignInScreen/index';
import SignUpScreen from './src/pages/SignUpScreen/index';
import HomeScreen from './src/pages/HomeScreen/index';
import PrivacyPolicyScreen from './src/pages/PrivacyPolicyScreen/index';
import TermsOfUseScreen from './src/pages/TermsOfUseScreen/index';
import OnBoardingScreen from './src/pages/OnBoardingScreen/index';
import ForgotPasswordEmailScreen from './src/pages/ForgotPasswordEmail/index';
import ForgotPasswordOtpScreen from './src/pages/ForgotPasswordOTP/index';
import ForgotPasswordNewPasswordScreen from './src/pages/ForgotPasswordNewPassword/index';
import PurchasedItemsScreen from './src/pages/PurchasedItemScreen/index';
import StoreScreen from './src/pages/StoreScreen/index';
import ProductDetailScreen from './src/pages/ProductDetailScreen';
import CheckOutScreen from './src/pages/CheckOutScreen';
import PaymentMethodScreen from './src/pages/PaymentMethodScreen';
import PaymentLoginScreen from './src/pages/PaymentLoginScreen';
import PaymentPayScreen from './src/pages/PaymentPayScreen';
import CreatePostScreen from './src/pages/CreatePostScreen';
import CreateImagePostScreen from './src/pages/CreateImagePostScreen';
import ChatlistScreen from './src/pages/ChatlistScreen';
import ChatScreen from './src/pages/ChatScreen';
import VideoCallScreen from './src/pages/VideoCallScreen';
import NotificationScreen from './src/pages/NotificationScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import EventsScreen from './src/pages/EventsScreen';
import UserSearchScreen from './src/pages/UserSearchScreen';
import EditProfileScreen from './src/pages/EditProfile';
import SubscriptionScreen from './src/pages/SubscriptionScreen';
import SubscriptionPlanScreen from './src/pages/SubscriptionPlanScreen';
import Hot5Screen from './src/pages/Hot5Screen';
import LiveVideoScreen from './src/pages/LiveVideo';
import SettingScreen from './src/pages/SettingScreen';
import AccountSettingScreen from './src/pages/AccountSettingScreen';
import NotificationSettingScreen from './src/pages/NotificationSettingScreen';
import DashboardScreen from './src/pages/DashboardScreen';
import AddedProducts from './src/pages/AddedProductScreen';
import AddProduct from './src/pages/AddProductScreen';
import EditProduct from './src/pages/EditProductScreen';
import EventCalendarScreen from './src/pages/EventCalendarScreen';
import EventDetailScreen from './src/pages/EventDetailScreen';
import EventScreen from './src/pages/EventScreen';
import FavoritesScreen from './src/pages/FavoritesScreen';
import FriendsListScreen from './src/pages/FriendsListScreen';
import EmailVerificationScreen from './src/pages/EmailVerificationScreen';
import ProductPaymentMethod from './src/pages/ProductMethodScreen';

import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <PersistGate
            loading={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <View style={styles.container}>
                <ActivityIndicator color={'red'} />
              </View>
            }
            persistor={persistor}
          >
            <Stack.Navigator
              initialRouteName="OnBoarding"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
              />
              <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
              <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="ForgotPasswordEmail"
                component={ForgotPasswordEmailScreen}
              />
              <Stack.Screen
                name="ForgotPasswordOtp"
                component={ForgotPasswordOtpScreen}
              />
              <Stack.Screen
                name="ForgotPasswordNewPassword"
                component={ForgotPasswordNewPasswordScreen}
              />
              <Stack.Screen
                name="PurchasedItems"
                component={PurchasedItemsScreen}
              />
              <Stack.Screen name="Store" component={StoreScreen} />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
              />
              <Stack.Screen name="EditProduct" component={EditProduct} />
              <Stack.Screen name="CheckOut" component={CheckOutScreen} />
              <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethodScreen}
              />
              <Stack.Screen
                name="ProductPaymentMethod"
                component={ProductPaymentMethod}
              />
              <Stack.Screen
                name="PaymentLogin"
                component={PaymentLoginScreen}
              />
              <Stack.Screen name="PaymentPay" component={PaymentPayScreen} />
              <Stack.Screen name="CreatePost" component={CreatePostScreen} />
              <Stack.Screen
                name="CreateImagePost"
                component={CreateImagePostScreen}
              />
              <Stack.Screen name="Chatlist" component={ChatlistScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="VideoCall" component={VideoCallScreen} />
              <Stack.Screen
                name="Notification"
                component={NotificationScreen}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Events" component={EventsScreen} />
              <Stack.Screen name="UserSearch" component={UserSearchScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen
                name="Subscription"
                component={SubscriptionScreen}
              />
              <Stack.Screen
                name="SubscriptionPlan"
                component={SubscriptionPlanScreen}
              />
              <Stack.Screen name="Hot5" component={Hot5Screen} />
              <Stack.Screen name="LiveVideo" component={LiveVideoScreen} />
              <Stack.Screen name="Setting" component={SettingScreen} />
              <Stack.Screen
                name="AccountSetting"
                component={AccountSettingScreen}
              />
              <Stack.Screen
                name="NotificationSetting"
                component={NotificationSettingScreen}
              />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="AddedProduct" component={AddedProducts} />
              <Stack.Screen name="AddProduct" component={AddProduct} />
              <Stack.Screen
                name="EventCalendar"
                component={EventCalendarScreen}
              />
              <Stack.Screen name="EventDetail" component={EventDetailScreen} />
              <Stack.Screen name="Event" component={EventScreen} />
              <Stack.Screen name="Favorites" component={FavoritesScreen} />
              <Stack.Screen name="FriendsList" component={FriendsListScreen} />
              <Stack.Screen
                name="EmailVerify"
                component={EmailVerificationScreen}
              />
            </Stack.Navigator>
          </PersistGate>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
