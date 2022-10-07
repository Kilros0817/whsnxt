import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { auth, db } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { token, createMeeting } from '../../api';
import { connect } from 'react-redux';
import { notifyMessage } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { accountUrl, imageUrl } from '../../constants/BaseUrl';
import { ConvertToUrlForm, isNullOrEmpty } from '../../Util/Util';

function ChatScreen({ navigation, userData, route }) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(userData.first_name);
  const [userID, setUserID] = useState(userData.id);
  const [receiver, setReceiver] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myData, setMyData] = useState(null);
  const [token, setToken] = useState(token);
  const [meetingId, setMeetingId] = useState('');

  const videoCall = async () => {
    const meetingId = await createMeeting();
    setMeetingId(meetingId);
    if (!token && !meetingId) {
      notifyMessage('Token or Meeting Id is not generated');
    } else {
      navigation.navigate('VideoCall', { token, meetingId });
    }
  };

  const getReceiverData = async () => {
    const obj = ConvertToUrlForm({
      func: 'fetchUser',
      id: route.params?.receiver,
    });
    await fetch(accountUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: obj,
    })
      .then((response) => response.json())
      .then((responseData) => {
        const data =
          responseData && responseData.data ? responseData.data[0] : null;
        if (responseData['error'] == false && data) {
          setReceiver(data);
        }
      })
      .catch((err) => {
        console.log('catch', err);
      });
  };

  const q = query(
    collection(db, 'chats'),
    where('room', 'in', [
      `${userData.id}-${route.params?.receiver}`,
      `${route.params?.receiver}-${userData.id}`,
    ]),
  );

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    const { _id, createdAt, text, user } = messages[0];
    const room = userID + '-' + route.params?.receiver;

    addDoc(collection(db, 'chats'), { _id, createdAt, text, user, room });
  }, []);

  useEffect(() => {
    signInWithEmailAndPassword(auth, userData.email, userData.email).catch(
      (error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      },
    );

    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => {
          return {
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          };
        }),
      ),
    );

    return () => {
      getReceiverData();

      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        paddingBottom: 80,
        backgroundColor: 'rgba(0,0,0,1)',
        width: width,
        height: height,
      }}
    >
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={(e) => {
            {
              navigation.navigate('Home');
            }
          }}
        />
        <Image
          source={
            receiver && !isNullOrEmpty(receiver.profile_pic)
              ? { uri: imageUrl + 'profile_pic/' + receiver.profile_pic }
              : require('../../assets/img/default-avatar.png')
          }
          style={{
            alignSelf: 'center',
            width: 100,
            aspectRatio: 1,
            borderRadius: 50,
            height: 'auto',
          }}
        />
      </View>
      <Text
        style={{
          color: 'white',
          alignSelf: 'center',
          marginTop: 10,
          fontSize: 14,
        }}
      >
        {receiver ? receiver.first_name + ' ' + receiver.last_name : ''}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 40,
        }}
      >
        <TouchableOpacity activeOpacity={0.2} onTouchEnd={() => videoCall()}>
          <Image
            source={require('./i_voice_call.png')}
            style={{ marginHorizontal: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2} onTouchEnd={() => videoCall()}>
          <Image
            source={require('./i_video_call.png')}
            style={{ marginHorizontal: 15 }}
            onTouchEnd={() => videoCall()}
          />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        // showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          // avatar: auth?.currentUser?.avatar,
        }}
      />
      <KeyboardSpacer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingBottom: 80,
    backgroundColor: 'rgba(0,0,0,1)',
    width: width,
    height: height,
  },
  Group642: {
    display: 'flex',
    flexDirection: 'row',
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
    fontWeight: '600',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
});

const mapStateToProps = (state) => ({
  userData: state.accounts.userData,
});

export default connect(mapStateToProps)(ChatScreen);
