import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
  SafeAreaView,
  Platform,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import SweetAlert from 'react-native-sweet-alert';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { calcTime, ConvertToUrlForm, httpHeaders } from '../../Util/Util';
import { accountUrl, imageUrl, postUrl } from '../../constants/BaseUrl';
import { ActivityIndicator } from 'react-native-paper';
import { removeUserData } from '../../redux/actions/AccountsActions';
import { connectFirestoreEmulator } from 'firebase/firestore';

const { width, height } = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

let like_num;
let bookmark_num;

function Home({ navigation, route, userData, accountType }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
  const [postMenuVisibles, setPostMenuvisibles] = useState([]);
  const [commentsVisibles, setCommentsVisibles] = useState([]);
  const [commentContents, setCommentContents] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0.0);
  const [uploadIndeterminate, setUploadIndeterminate] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [hideLists, setHideLists] = useState([]);
  const [notifylen, setNotifyLen] = useState(0);
  onClickMore = () => { };

  useEffect(() => {
    if (userData == undefined) {
      SweetAlert.showAlertWithOptions({
        style: 'error',
        title: 'Sorry, your account data is removed. Sign In again.',
      });
      navigation.navigate('SignIn');
    }
    fetchPosts();
    getNotification();
  }, []);

  const getNotification = async () =>{
    const obj =  ConvertToUrlForm({
      func: "fetch_user_notifications",
      user_id: userData.id
    });
    const data =  await fetch(accountUrl, { 
     method: 'POST', 
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/x-www-form-urlencoded',
     }, 
     body: obj 
   })
     .then(response => response.json())
     .then(responseData => {
         console.log("responseData", responseData);
         const data = responseData && responseData.data?responseData.data:[];
         return data;
     })
     .catch(err => {
       console.log("catch", err);
     });
    setNotifyLen(data !==undefined?data.length:0)
 }

  fetchPosts = async () => {
    let followers = [];
    let friends = [];
    let postUsers = [];
    let _posts = [];
    let post_details = [];
    setIsLoadingPosts(true);
    let followInfo = new FormData();
    followInfo.append('func', 'fetch_followers');
    followInfo.append('user_id', userData.id);
    try {
      let response3 = await fetch(accountUrl, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: followInfo,
      });
      let responseData3 = await response3.json();
      console.log("responseData3", responseData3);
      for (const item in responseData3) {
        if (!isNaN(item)) {
          followers.push(responseData3[item]);
        }
      }
      let friendInfo = new FormData();
      friendInfo.append('func', 'fetch_friends');
      friendInfo.append('user_id', userData.id);
      let response4 = await fetch(accountUrl, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: friendInfo,
      });
      let responseData4 = await response4.json();
      for (const item in responseData4) {
        if (!isNaN(item)) {
          friends.push(responseData4[item]);
        }
      }
      postUsers = [...followers.map(e => e.target_user), ...friends.map(e => e.target_user), userData.id];
      
      await Promise.all(postUsers.map(async (oneUser) => {
        let postData = new FormData();
        postData.append('func', 'posts');
        postData.append('user_id', oneUser);
        let response = await fetch(postUrl, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: postData,
        });
        let responseData = await response.json();
        // console.log("data", responseData.data);
        for (const item in responseData.data) {
          if (!isNaN(parseInt(item))) {
            _posts.push(responseData.data[item]);
          }
        }
      }))
      let totalPostsLength = _posts.length;
    //  console.log("_posts", _posts);
      if (totalPostsLength > 0) {
        _posts.map(async (_post, index) => {
          let postId = new FormData();
          postId.append('func', 'fetch_post_id');
          postId.append('id', _post.post_id);
          let response1 = await fetch(postUrl, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: postId,
          });
          let responseData1 = await response1.json();
          post_details.push({ ..._post, ...responseData1["0"] });
          post_details.sort((a, b) => {
            return new Date(b.modified).getTime() - new Date(a.modified).getTime()
          })
          let totalPostsDetailsLength = post_details.length;
          if (totalPostsDetailsLength > 0) {
            post_details.map(async (post, indexDetail) => {
              let fetchUserInfo = new FormData();
              fetchUserInfo.append('func', 'fetchUser_id');
              fetchUserInfo.append('id', post.user_id);
              let response2 = await fetch(accountUrl, {
                method: 'post',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
                body: fetchUserInfo,
              });
              let responseData2 = await response2.json();
              console.log('user',responseData2["data"][0])
              post.userInfo = { ...responseData2["data"][0] };
              if(indexDetail == totalPostsDetailsLength - 1 && index == totalPostsLength - 1) {
                setPosts(post_details.filter(e => hideLists.findIndex(i => i == e.post_id) == -1));
                setPostMenuvisibles(new Array(post_details.length).fill(false));
                setCommentsVisibles(new Array(post_details.length).fill(false));
                setIsLoadingPosts(false);
              }
            })
          } else {
            if (index == totalPostsLength - 1) {
              setPosts(post_details.filter(e => hideLists.findIndex(i => i == e.post_id) == -1));
              setPostMenuvisibles(new Array(post_details.length).fill(false));
              setCommentsVisibles(new Array(post_details.length).fill(false));
              setIsLoadingPosts(false);
            }
          }
        })
      } else {
        setPosts(post_details.filter(e => hideLists.findIndex(i => i == e.post_id) == -1));
        setPostMenuvisibles(new Array(post_details.length).fill(false));
        setCommentsVisibles(new Array(post_details.length).fill(false));
        setIsLoadingPosts(false);
      }
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Sorry, please try again',
        // text2: ''
      });
      setIsLoadingPosts(false);
    }
  }

  useEffect(() => {
    if (route.params?.createPost) {
      animate();
    }
  }, [route]);

  animate = () => {
    setUploadVisible(true);
    let progress = 0;
    setUploadProgress(progress);
    setTimeout(() => {
      setUploadIndeterminate(false);
      let timer = setInterval(() => {
        progress += Math.random() / 5.0;
        if (progress > 1) {
          progress = 1;
          setUploadVisible(false);
          fetchPosts();
          Toast.show({
            type: 'success',
            text1: 'Your post uploaded successfully.',
            // text2: '',
          });
          clearInterval(timer);
        }
        setUploadProgress(progress);
      }, 500);
    }, 0);
  };

  setComments = (e, index) => {
    let oldCommentContents = commentContents.concat();
    let indexOfComment = oldCommentContents.findIndex(e => e.id == index);
    if (indexOfComment == -1) {
      oldCommentContents.push({
        id: index,
        content: e,
      })
    } else {
      oldCommentContents[indexOfComment].content = e;
    }
    setCommentContents(oldCommentContents);
  }

  onPostComment = (index, postId) => {
    let indexOfComment = commentContents.findIndex(e => e.id == index);
    if(indexOfComment == -1)
    {
      Alert.alert('Error', 'Enter invalid');
      return;
    }
    let comment = commentContents[indexOfComment];
    let formdata = new FormData();
    formdata.append('func', 'insert_user_lcb');
    formdata.append('user_id', userData.id);
    formdata.append('post_id', postId);
    formdata.append('likes', like_num);
    formdata.append('bookmark', bookmark_num);
    formdata.append('comment', comment?.content);
    fetch(postUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    }).then(response => response.json())
      .then(responseData => {
        // console.log(responseData);
        fetchPosts();
      }).catch(err => console.log(err));
  }

  onUpdateLike = (index, postId, likes) => {
    let l = Number(likes)+1;
    let formdata = new FormData();
    formdata.append('func', 'update_likes');
    formdata.append('user_id', userData.id);
    formdata.append('post_id', postId);
    formdata.append('likes', l);
    fetch(postUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    }).then(response => response.json())
      .then(responseData => {
        fetchPosts();
      }).catch(err => console.log(err));
  }
  
  onUpdateBookmark = (index, postId, bookmark) => {
    let formdata = new FormData();
    let b = Number(bookmark)+1;
    formdata.append('func', 'update_bookmark');
    formdata.append('user_id', userData.id);
    formdata.append('post_id', postId);
    formdata.append('bookmark', b);
    fetch(postUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    }).then(response => response.json())
      .then(responseData => {
        fetchPosts();
      }).catch(err => console.log(err));
  }

  onToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  onToggleBottomMenu = () => {
    setBottomMenuVisible(!bottomMenuVisible);
  };

  onTogglePostMenu = (id = 0) => {
    let oldPostMenuVisibles = postMenuVisibles.concat();
    if (oldPostMenuVisibles[id] == false) {
      oldPostMenuVisibles.fill(false);
    }
    oldPostMenuVisibles[id] = !oldPostMenuVisibles[id];
    setPostMenuvisibles(oldPostMenuVisibles);
  };

  onToggleComments = (id = 0) => {
    let oldCommentsVisibles = commentsVisibles.concat();
    if (oldCommentsVisibles[id] == false) {
      oldCommentsVisibles.fill(false);
    }
    oldCommentsVisibles[id] = !oldCommentsVisibles[id];
    setCommentsVisibles(oldCommentsVisibles);
  };

  onLogOut = () => {
    removeUserData();
    navigation.navigate('Auth');
  }

  onEditPost = (key, content) => {
    Alert.alert(
      '',
      'Are you sure?',
      [
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('CreatePost', {
              editMode: true,
              content: content,
              key: key
            })
          }
        },
        {
          text: 'No',
        }
      ],
      {
        cancelable: true
      }
    )
  }

  onDeletePost = (key) => {
    Alert.alert(
      '',
      'Are you sure?',
      [
        {
          text: 'Yes',
          onPress: () => sendRqPost('del', key)
        },
        {
          text: 'No',
        }
      ],
      {
        cancelable: true
      }
    )
  }

  onUnFollow = (key) => {
    Toast.show({
      type: 'error',
      text1: 'not implemented yet.'
    })
  }

  onHidePost = (key) => {
    Alert.alert('', 'Are you sure?',
      [
        {
          text: 'Yes',
          onPress: () => {
            let oldHideLists = hideLists.concat();
            oldHideLists.push(key);
            setHideLists(oldHideLists);
            let oldPosts = posts.concat();
            setPosts(oldPosts.filter(e => oldHideLists.findIndex(i => i == e.post_id) == -1));
          }
        },
        {
          text: 'No'
        }
      ], {
      cancelable: true
    })
  }

  sendRqPost = (action, key) => {
    if (action == 'del') {
      let delPostInfo = new FormData();
      delPostInfo.append('func', 'delete_post');
      delPostInfo.append('id', key);
      fetch(postUrl, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: delPostInfo,
      }).then(response => response.json()).then(responseData => {
        // console.log(responseData);
        Toast.show({
          type: 'success',
          text1: 'Removed successfully.'
        });
        fetchPosts();
      }).catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Sorry, Failed. Try again later.'
        })
      })
    }
  }

  const SideMenu = () => {
    return (
      <>
        <View style={styles.HomeMenu}>
          <View
            style={{ alignSelf: 'flex-start', marginLeft: 20 }}
            onStartShouldSetResponder={() => onToggleMenu()}
          >
            <Image source={require('./i_close_black.png')} />
          </View>
          <Pressable onPress={() => navigation.navigate('EditProfile', {data: userData})}>
            <Text style={styles.fontMenu}>Edit Profile</Text>
          </Pressable>
          {accountType == 2 && (
            <Pressable onPress={() => navigation.navigate('Events')}>
              <Text style={styles.fontMenu}>Calendar</Text>
            </Pressable>
          )}
          {accountType == 1 && (
            <Pressable onPress={() => navigation.navigate('EventCalendar')}>
              <Text style={styles.fontMenu}>Calendar</Text>
            </Pressable>
          )}
          <Pressable onPress={() => navigation.navigate('Store', { id: userData.id})}>
            <Text style={styles.fontMenu}>Store</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('PurchasedItems')}>
            <Text style={styles.fontMenu}>Purchased Items</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('FriendsList')}>
            <Text style={styles.fontMenu}>FriendsList</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('TermsOfUse')}>
            <Text style={styles.fontMenu}>Terms and Conditions</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.fontMenu}>Privacy Policy</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Setting', {data: userData})}>
            <Text style={styles.fontMenu}>Setting</Text>
          </Pressable>
          <Pressable onPress={() => onLogOut()}>
            <Text style={styles.fontMenu}>Logout</Text>
          </Pressable>
        </View>
      </>
    );
  };

  const getUserImage = (uri) => {
    if (uri != undefined && uri != '') {
      return <Image
        source={{ uri: uri }}
        style={{
          alignSelf: 'center',
          width: 20,
          aspectRatio: 1,
          height: 'auto',
        }}
      />
    } else {
      return <Image
        source={require('../../assets/img/default-avatar.png')}
        style={{
          alignSelf: 'center',
          width: 20,
          aspectRatio: 1,
          height: 'auto',
          borderRadius: 50,
        }}
      />
    }
  }

  const onePost = (data, key) => {
    let comments = [];
    if (Array.isArray(data.comments)) {
      comments = data.comments.concat();
    } else {
      for (const item in data.comments) {
        if (!isNaN(parseInt(item))) {
          comments.push(data.comments[item]);
        }
      }
    }
    like_num = comments.length?comments[0]?.likes:0;
    bookmark_num = comments.length?comments[0]?.bookmark:0;
    let postTime = calcTime(data.modified);
    let displayTime = (postTime[0] > 0 ? postTime[0] + ' day ago' : (postTime[1] > 0 ? postTime[1] + ' hours ago' : (postTime[2] > 0 ? postTime[2] + ' minutes ago' : 'Just Now')))
    const userAvatar = data.userInfo?.profile_pic ? (
      <Image
        source={{ uri: imageUrl +"profile_pic/"+ data.userInfo?.profile_pic }}
        style={{
          alignSelf: 'center',
          width: 45,
          aspectRatio: 1,
          borderRadius: 50,
          height: 'auto',
        }}
      />
    ) : (
      <Image
        source={require('../../assets/img/default-avatar.png')}
        style={{
          alignSelf: 'center',
          width: 45,
          aspectRatio: 1,
          height: 'auto',
          borderRadius: 50,
        }}
      />
    );
    return (
      <View style={{ paddingHorizontal: 20, marginTop: 30 }} key={key}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          {userAvatar}
          <View style={{ ...styles.columnStyle, marginLeft: 20 }}>
            <Text style={{ color: 'orange', fontStyle: 'italic' }}>{data.userInfo?.first_name + ' ' + data.userInfo?.last_name + '(' + data.userInfo?.dob + ')'}</Text>
            <Text style={styles.Txt9010}>{displayTime}</Text>
          </View>
          <Image
            source={require('./i_three_dot.png')}
            style={{ position: 'absolute', right: 10 }}
            onStartShouldSetResponder={() => onTogglePostMenu(key)}
          />
        </View>
        <View>
          {postMenuVisibles[key] ? (
            data.user_id != userData.id ? (
              <View
                style={{
                  ...styles.columnStyle,
                  position: 'absolute',
                  top: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingLeft: 40,
                }}
                onTouchEnd={() => onTogglePostMenu(key)}
              >
                <View style={{ ...styles.rowStyle, padding: 5 }}>
                  <Image
                    source={require('./i_eyehide.png')}
                    style={{ alignSelf: 'center' }}
                  />
                  <View style={{ ...styles.columnStyle, marginLeft: 20 }} onTouchEnd={() => onHidePost(data.post_id)}>
                    <Text>Hide Post</Text>
                    <Text style={{ fontSize: 10 }}>
                      See fewer posts like this.
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.rowStyle, padding: 5 }}>
                  <Image
                    source={require('./i_warning.png')}
                    style={{ alignSelf: 'center' }}
                  />
                  <View style={{ ...styles.columnStyle, marginLeft: 20 }}>
                    <Text>Report this post</Text>
                    <Text style={{ fontSize: 10 }}>
                      Tell us a problem with this post.
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.rowStyle, padding: 5 }}>
                  <Image
                    source={require('./i_minus.png')}
                    style={{ alignSelf: 'center' }}
                  />
                  <View style={{ ...styles.columnStyle, marginLeft: 20 }}>
                    <Text>Block</Text>
                    <Text style={{ fontSize: 10 }}>Block this user.</Text>
                  </View>
                </View>
                <View style={{ ...styles.rowStyle, padding: 5 }}>
                  <Image
                    source={require('./i_user_delete.png')}
                    style={{ alignSelf: 'center' }}
                  />
                  <View style={{ ...styles.columnStyle, marginLeft: 20 }} onTouchEnd={() => onUnFollow(data.user_id)}>
                    <Text>Unfollow</Text>
                    <Text style={{ fontSize: 10 }}>
                      Stop seeing post from the user.
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  ...styles.columnStyle,
                  position: 'absolute',
                  top: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingLeft: 40,
                }}
              >
                <View style={{ ...styles.rowStyle, padding: 10, marginVertical: 5 }} onTouchEnd={() => onEditPost(data.id, data.content)}>
                  <Image
                    source={require('./i_edit.png')}
                    style={{ alignSelf: 'center', width: 24, height: 24, tintColor: 'blue' }}
                  />
                  <View style={{ ...styles.columnStyle, marginLeft: 20 }} on>
                    <Text style={{ fontSize: 14 }}>Edit Post</Text>
                  </View>
                </View>
                <View style={{ ...styles.rowStyle, padding: 10, marginVertical: 5 }}>
                  <Image
                    source={require('./i_warning.png')}
                    style={{ alignSelf: 'center', tintColor: 'red' }}
                  />
                  <View style={{ ...styles.columnStyle, marginLeft: 20 }} onTouchEnd={() => onDeletePost(data.id)}>
                    <Text style={{ fontSize: 14 }}>Delete post</Text>
                  </View>
                </View>
              </View>
            )
          ) : null}

          <Text style={{ color: 'white', fontSize: 12, lineHeight: 20 }}>
            {data.content}
            {/* <Text style={{ color: 'grey' }} onPressIn={() => onClickMore()}>...more</Text> */}
          </Text>
        </View>
        <View
          style={{
            ...styles.rowStyle,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            marginTop: 5,
          }}
        >
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{onUpdateLike(key, data.post_id, like_num)}}>
              <Image
                source={require('./i_heart_white.png')}
                style={styles.footerIcon}
              />
              <Text style={styles.fontWhite}>{like_num}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require('./i_message_white.png')}
              style={styles.footerIcon}
              onTouchEnd={() => onToggleComments(key)}
            />
            <Text style={styles.fontWhite}>{comments?.length}</Text>
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{onUpdateBookmark(key, data.post_id, bookmark_num)}}>
              <Image
                source={require('./i_bookmark_white.png')}
                style={{ ...styles.footerIcon, width: 40 }}
                />
              <Text style={{color: '#fff', textAlign: 'center'}}>{bookmark_num}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {commentsVisibles[key] ? (
          <View
            style={{
              backgroundColor: 'black',
              width: '100%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingHorizontal: 20,
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 2
            }}
          >
            {comments.map((comment, key) => {
              return (
                <View key={key} style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 2, borderRadius: 10, width: '100%', marginVertical: 10, padding: 10 }}>
                  {getUserImage(comment.profile_pic)}
                  <Text style={{ color: 'orange', marginLeft: 10, width: '20%', fontSize: 12, textAlignVertical: 'center', textAlign: 'center', fontStyle: 'italic' }}>{comment.first_name + ' ' + comment.last_name}</Text>
                  <Text style={{ color: 'white', marginLeft: 10, fontSize: 12, flex: 1, textAlignVertical: 'center' }}>{comment.comment.length > 0 ? comment.comment : 'No Comment.'}</Text>
                </View>
              )
            })}
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={{ color: 'white', textAlignVertical: 'top', borderRadius: 10, borderColor: 'white', borderWidth: 3, width: '100%', marginTop: 20 }}
              placeholder=" Type here..."
              selectionColor={'orange'}
              placeholderTextColor={'#fff2f0'}
              onChangeText={(e) => setComments(e, key)}
            />
            <View style={{ backgroundColor: '#1455F5', borderRadius: 15, width: '100%', marginBottom: 10 }} onTouchEnd={() => onPostComment(key, data.id)}>
              <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 10 }}>Post a Comment</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const Content = () => {
    return (
      <View style={{ ...styles.Home, opacity: uploadVisible ? 0.3 : 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Image
            style={styles.CarbonOverflowMenuVertical1}
            source={require('./MenuIcon.png')}
            onStartShouldSetResponder={() => onToggleMenu()}
          />
          <Image
            style={styles.CarbonOverflowMenuVertica}
            source={require('./AppIcon.png')}
          />
          <Image
            style={styles.CarbonOverflowMenuVertical2}
            source={require('./SearchIcon.png')}
            onTouchEnd={() => navigation.navigate('UserSearch')}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={styles.Txt840}>Hot5</Text>
          <Image
            source={require('./emojione_fire.png')}
            style={styles.emojione_fire}
          ></Image>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onTouchEnd={() => navigation.navigate('Hot5', { id: userData.id})}
        >
          <Image
            source={require('./hotImage1.png')}
            style={styles.hotImage}
          ></Image>
          <Image
            source={require('./hotImage2.png')}
            style={styles.hotImage}
          ></Image>
          <Image
            source={require('./hotImage3.png')}
            style={styles.hotImage}
          ></Image>
          <Image
            source={require('./hotImage4.png')}
            style={styles.hotImage}
          ></Image>
          <Image
            source={require('./hotImgae5.png')}
            style={styles.hotImage}
          ></Image>
        </View>
        {isLoadingPosts ? <View style={{ width: '100%', justifyContent: 'center', height: height - 200 }}>
          <ActivityIndicator color="white" size="large" style={{ alignSelf: 'center' }} />
        </View> : <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {posts.map((post, key) => onePost(post, key))}
          {posts.length == 0 && <Text style={{ color: 'white', textAlign: 'center', flex: 1, marginTop: 200, fontSize: 20 }}>No Posts</Text>}
          {/* <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Image source={require('./featured_talent2.png')}></Image>
              <View style={{ ...styles.columnStyle, marginLeft: 20 }}>
                <Text style={{ color: 'white' }}>
                  Featured_Talent(Rock Music)
                </Text>
                <Text style={styles.Txt9010}>
                  Based on your preferences here’s an artist you may like
                </Text>
              </View>
              <Image
                source={require('./i_three_dot.png')}
                style={{ position: 'absolute', right: 10 }}
              />
            </View>
            <Image
              source={require('./featured_talent2_1.png')}
              style={{ width: '100%', borderRadius: 10, marginTop: 10 }}
            ></Image>
            <View
              style={{
                ...styles.rowStyle,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 5,
              }}
            >
              <View>
                <Image
                  source={require('./i_heart_white.png')}
                  style={styles.footerIcon}
                />
                <Text style={styles.fontWhite}>1.1k</Text>
              </View>
              <View>
                <Image
                  source={require('./i_message_white.png')}
                  style={styles.footerIcon}
                />
                <Text style={styles.fontWhite}>527</Text>
              </View>
              <View>
                <Image
                  source={require('./i_bookmark_white.png')}
                  style={{ ...styles.footerIcon, width: 40 }}
                />
                <Text style={styles.fontBlack}>527</Text>
              </View>
            </View>
          </View> */}
        </ScrollView>}
        <View
          style={{
            ...styles.rowStyle,
            position: 'absolute',
            height: width / 5,
            width: width,
            backgroundColor: 'white',
            opacity: 0.9,
            bottom: bottomNavBarHeight,
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 20,
          }}
        >
          <Image source={require('../HomeScreen/i_navbar1.png')} />
          <View onTouchEnd={() => navigation.navigate('Chatlist')}>
            <Image source={require('../HomeScreen/i_navbar2.png')} />
            <View style={styles.iconNumber}>
              <Text style={{ fontSize: 7, color: 'white' }}>12</Text>
            </View>
          </View>
          <View onTouchEnd={() => navigation.navigate('Notification', { id: userData.id})}>
            <Image source={require('../HomeScreen/i_navbar3.png')} />
            {
            notifylen != 0 &&(
            <View style={styles.iconNumber}>
              <Text style={{ fontSize: 7, color: 'white' }}>{notifylen}</Text>
            </View>)
            }
          </View>
          <Image
            source={require('../HomeScreen/i_navbar4.png')}
            onTouchEnd={() => navigation.navigate('EditProfile', { data: userData})}
          />
        </View>
        {bottomMenuVisible ? (
          <View style={styles.bottomMenu}>
            <View
              style={{
                backgroundColor: '#2f2f2f',
                height: 80,
                width: '100%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginTop: 30,
                }}
              >
                Whats on Your Mind
              </Text>
              <Image
                source={require('./i_close_white.png')}
                style={{ position: 'absolute', right: 20, top: 20 }}
                onStartShouldSetResponder={() => onToggleBottomMenu()}
              />
            </View>
            <View style={{ ...styles.bottomMenuItem }}>
              <View
                style={{
                  ...styles.rowStyle,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width: '100%',
                  paddingBottom: 10,
                  alignItems: 'center',
                }}
                onTouchEnd={() => {
                  setBottomMenuVisible(false);
                  navigation.navigate('CreatePost');
                }}
              >
                <Image source={require('./i_note.png')} />
                <Text
                  style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 30 }}
                >
                  Write
                </Text>
              </View>
            </View>
            <View style={{ ...styles.bottomMenuItem }}>
              <View
                style={{
                  ...styles.rowStyle,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width: '100%',
                  paddingBottom: 10,
                  alignItems: 'center',
                }}
                onTouchEnd={() => {
                  setBottomMenuVisible(false);
                  navigation.navigate('CreateImagePost');
                }}
              >
                <Image source={require('./i_camera.png')} />
                <Text
                  style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 30 }}
                >
                  Photo/Video
                </Text>
              </View>
            </View>
            <View
              style={{ ...styles.bottomMenuItem }}
              onTouchEnd={() => navigation.navigate('LiveVideo')}
            >
              <View
                style={{
                  ...styles.rowStyle,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width: '100%',
                  paddingBottom: 10,
                  alignItems: 'center',
                }}
              >
                <Image source={require('./i_wifi.png')} />
                <Text
                  style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 30 }}
                >
                  Live Video
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={styles.bottomPlusIcon}
            onStartShouldSetResponder={() => onToggleBottomMenu()}
          >
            <Image source={require('./i_plus_white.png')} />
          </View>
        )}
      </View>
    );
  };

  const uploadScreen = () => {
    return (
      <>
        {uploadVisible ? (
          <Progress.Circle
            style={{
              margin: 10,
              zIndex: 1,
              position: 'absolute',
              top: height / 2,
              left: width / 2.2,
              zIndex: 1,
            }}
            progress={uploadProgress}
            indeterminate={uploadIndeterminate}
          >
            <Text style={{ color: 'black', marginLeft: 10 }}>
              {Math.round(uploadProgress.toFixed(2) * 100)}%
            </Text>
          </Progress.Circle>
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView>
      {menuVisible ? SideMenu() : Content()}
      {uploadScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Home: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,1)',
    shadowColor: 'rgba(0,0,0,0.25)',
    elevation: 0,
    shadowOffset: { width: 0, height: 4 },
    padding: 10,
    width: width,
    height: height,
  },
  HomeMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width,
    height: height,
    paddingTop: width / 3.5,
  },
  Group496: {
    position: 'absolute',
    bottom: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    /*  linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)),url(https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/tkx4f9zuvda-2343%3A3994?alt=media&token=0d34018b-0de5-46a0-8c80-063f340dad0d) */
    width: width / 1.1,
  },
  Vector: {
    position: 'absolute',
    bottom: 150,
    right: 50,
    width: 21.74,
    height: 21.86,
    backgroundColor: 'blue',
    zIndex: 3,
  },
  Group499: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: 106,
    height: 16,
  },
  Group362: {
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 2,
    borderRadius: 8,
    left: width / 3,
    backgroundColor: 'rgba(255,0,0,1)',
    width: 16,
    height: 16,
  },
  Txt594: {
    fontSize: 7.06,
    // // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },

  Group163: {
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 2,
    borderRadius: 8,
    left: width / 1.85,
    backgroundColor: 'rgba(255,0,0,1)',
    width: 16,
    height: 16,
  },
  Txt594: {
    fontSize: 7.06,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },

  NavBar: {
    position: 'absolute',
    bottom: 20,
    width: width,
    height: 75,
    zIndex: -1,
  },
  Group5377: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    top: '81.4%',
    bottom: '11.42%',
    left: '80.8%',
    right: '3.74%',
    borderRadius: 51,
    backgroundColor: 'white',
    /*  linear-gradient(136.42deg, rgba(20,85,245,0.6) 0%, rgba(20,85,245,0.29) 100%, )  */
    // backdropFilter: "blur(20px)",
    width: 60,
    height: 60,
  },

  Group279: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
  },
  ThemeLightNotchFalseCallInTrueWifiTrueBackFalse: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 4,
    paddingLeft: 19,
    paddingRight: 18,
    marginBottom: 18,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  Service: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 66,
  },
  Reception: {
    width: 16.5,
    height: 10,
    marginRight: 4,
  },
  Txt512: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '700',
    lineHeight: 12,
    letterSpacing: -0.12,
    color: 'rgba(255, 255, 255, 1)',
    marginRight: 4,
  },
  Wifi: {
    width: 16.62,
    height: 12,
  },

  Time: {
    width: 31.8,
    height: 8.88,
    marginRight: 125,
  },
  Battery: {
    width: 26.5,
    height: 11.5,
  },

  Group1089: {
    display: 'flex',
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  BxMenu: {
    width: 38,
    height: 38,
  },
  Group1: {
    width: 54,
    height: 54,
    aspectRatio: 1,
  },
  Frame162: {
    marginTop: 10,
    width: 22,
    aspectRatio: 1,
  },

  Group48095695: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 7,
    paddingLeft: 10,
  },
  Txt840: {
    fontSize: 13,
    fontFamily: 'Nunito, sans-serif',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 10,
    marginRight: 5,
  },
  EmojioneFire: {
    width: 17,
    height: 17,
  },

  Frame74: {
    marginHorizontal: 10,
    width: width / 1.05,
    height: 77,
    marginBottom: 32,
  },
  Group979: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 11,
    paddingLeft: 15,
  },
  Group5457: {
    width: 43,
    height: 43,
    marginRight: 6,
  },
  // multiple1: {
  //   main: "Txt471",
  //   seg1: "[object Object]",
  //   seg2: "[object Object]",
  // },

  // multiple2: {
  //   main: "Txt948",
  //   seg1: "[object Object]",
  //   seg2: "[object Object]",
  // },
  Group205: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 14,
    position: 'absolute',
    top: 450,
    justifyContent: 'space-around',
    width: width,
  },
  Group312: {
    display: 'flex',
    flexDirection: 'column',
  },
  Frame160: {
    width: 26,
    height: 24,
    marginBottom: 2,
  },
  Txt188: {
    fontSize: 10,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },

  Group453: {
    display: 'flex',
    flexDirection: 'column',
  },
  Frame157: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  Txt188: {
    fontSize: 10,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },

  BytesizeFlag: {
    width: 30,
    height: 30,
  },

  Group322: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 500,
    left: 15,
  },
  Group5457: {
    width: 43,
    height: 43,
    marginRight: 6,
  },
  Group5455: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 30,
  },
  // multiple3: {
  //   main: "Txt6510",
  //   seg1: "[object Object]",
  //   seg2: "[object Object]",
  // },
  Txt580: {
    fontSize: 9,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(116,116,116,1)',
  },

  CarbonOverflowMenuVertical: {
    width: 60,
    height: 60,
  },

  CarbonOverflowMenuVertical1: {
    width: 40,
    height: 40,
  },

  CarbonOverflowMenuVertical2: {
    width: 30,
    height: 30,
  },
  hotImage: {
    width: (width - 100) / 5,
    height: width / 5.7,
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnStyle: {
    display: 'flex',
    flexDirection: 'column',
  },

  Txt9010: {
    fontSize: 9,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(116,116,116,1)',
  },
  footerIcon: {
    width: 26,
    height: 25,
  },
  fontWhite: {
    color: 'white',
    alignSelf: 'center'
  },
  fontBlack: {
    color: 'black',
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
  bottomPlusIcon: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#1455F5',
    width: 58,
    height: 58,
    borderRadius: 29,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 120,
    right: width / 10,
    width: width / 1.2,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    zIndex: 1,
  },
  fontMenu: {
    fontSize: 32,
    color: 'black',
    lineHeight: 50,
  },
  bottomMenuItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 80,
    width: '100%',
    paddingHorizontal: 50,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  accountType: state.accounts.userData.role ? state.accounts.userData.role : 3,
  userData: state.accounts.userData,
});
const mapDispatchToProps = dispatch => ({
  removeUserData: () => removeUserData(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
