import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, 
  Image, Modal, TextInput, View } from "react-native";
import { IconButton } from 'react-native-paper';
import firebase from "firebase";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { GiftedChat, Bubble, Send, SystemMessage, Actions, ActionsProps, Avatar, GiftedAvatar } from 'react-native-gifted-chat';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ChatRoom({route, user}) {
    const [messages, setMessages] = useState([]);
    const {threads} = route.params;
    //console.log("testing: " + threads._id + " and " + threads.name)
    var user = firebase.auth().currentUser.uid;
    var email = firebase.auth().currentUser.email;
    //threads._id is the friend's email

    /*const [imgFriend, setImgFriend] = React.useState('');
    const otherUser = {
        name: 'A',
        avatar: imgFriend
    }

    var friendUser = firebase.firestore()
    .collection('info')
    .doc(threads._id)
    .get()
    .then(snap =>  {
        //console.log(snap.data().avatar)
        setImgFriend(snap.data().avatar);
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });*/
    

    async function handleSend(messages) {
        console.log(messages);
        const text = messages[0].text;
      
        // current user add
        firebase.firestore()
                .collection('chats: ' + email)
                .doc(threads._id)
                .collection('msg')
                .add({
                    text,
                    timeStamp: new Date().getTime(),
                    user: {
                        _id: user,
                        email: email
                    }
                });
        
        await firebase.firestore()
                .collection('chats: ' + email)
                .doc(threads._id)
                .set(
                {
                    latestMessage: {
                        text,
                        timeStamp: new Date().getTime()
                    }
                },
                { merge: true }
                )
                .catch(function(error) {
                    console.log("Eeeeerror getting document:", error);
                });

        // friend user add
        firebase.firestore()
                .collection('chats: ' + threads._id)
                .doc(email)
                .collection('msg')
                .add({
                    text,
                    timeStamp: new Date().getTime(),
                    user: {
                        _id: threads.name,
                        email: threads._id
                    }
                });
        
        await firebase.firestore()
                .collection('chats: ' + threads._id)
                .doc(email)
                .set(
                {
                    latestMessage: {
                        text,
                        timeStamp: new Date().getTime()
                    },
                },
                { merge: true }
                )
                .catch(function(error) {
                    console.log("Eeeeerror getting document:", error);
                });
    }

    useEffect(() => {
        const messagesListener = firebase.firestore()
                                         .collection('chats: ' + email)
                                         .doc(threads._id)
                                         .collection('msg')
                                         .orderBy('timeStamp', 'desc')
                                         .onSnapshot(querySnapshot => {
                                         const msg = querySnapshot.docs.map(doc => {
                                            const firebaseData = doc.data();
                                            const data = {
                                                _id: doc.id,
                                                text: '',
                                                timeStamp: new Date().getTime(),
                                                ...firebaseData
                                            };
                                            /*if (!firebaseData.system) {
                                                data.user = {
                                                    ...firebaseData.user,
                                                    name: firebaseData.user.email
                                                };
                                            }*/
                                            return data;
                                         });
                                         setMessages(msg); 
                                         });
                            return () => messagesListener();
                        }, []);
    
    // display messages in bubbles
    function renderBubble(props) {
        return (
            <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#266E7D',
                    padding: 5,
                    marginRight: 10,
                    marginVertical: 2
                },
                left: {
                    backgroundColor: '#0b323b',
                    padding: 5,
                    marginLeft: 10,
                    marginVertical: 2
                }
            }}
            textStyle={{
                right: {
                    color: '#fff',
                    fontSize: 20
                },
                left: {
                    color: '#fff',
                    fontSize: 20
                }
            }}
            />
        );
    }

    // add send button icon
    function renderSend(props) {
        return (
        <Send {...props}>
            <View style={styles.sendingContainer}>
            <IconButton icon='send-circle' size={36} color='#266E7D' />
            </View>
        </Send>
        );
    }

    // function to always scroll to latest message
    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={40} color='#266E7D' />
            </View>
        );
    }

   function renderAvatar(props) {
        return (
            <GiftedAvatar 
                {...props}
               // containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: {} }}
               //imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
            />
        
        )
    }

    function renderLoading() {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
          </View>
        );
      }

    function renderImage(props) {
        return (
        <Actions 
            {...props}
            icon={() => (
                <FontAwesome5 name = "plus" size = {20} color = "#266E7D" style = {{marginTop: -5, marginLeft: 8}}/>
            )}
            options={{
                /*'Choose from Library': async () => {
                    //askPermission
                    if (Constants.platform.ios) {
                        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                        console.log(status)
                        if (status !== 'granted') {
                          alert('Oops, we need camera roll permission :")');
                        } else if (status == 'granted'){
                            let result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [4, 3],
                                quality: 1,
                              });
                              /*if (!result.cancelled) {
                                //this.setState({userAvatar: result.uri});
                                //this.setState({imageChosen: true});
                                console.log("test: " + result.uri)
                                var arr = [result.uri, ""]
                                console.log("test2: " + arr[0])
                                handleSend(result.uri);
                              }*/
                        //}
                      //}
                //}
                Cancel: () => {
                    //console.log('Cancel');
                }
            }}
            optionTintColor="#222B45"
        />
        )
    }
         
    /*const [img, setImg] = React.useState('');
    //current user
    firebase.firestore()
    .collection('info')
    .doc(email)
    .get()
    .then(snap => {
        //console.log(snap.data().avatar)
        setImg(snap.data().avatar);
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });*/
    //console.log(img)
    return (
    
        <GiftedChat 
            messages={messages}
            onSend={handleSend}
            user={{ _id: user, avatar: img}}
            renderBubble={renderBubble} // bubble display function
            placeholder='Message'
            showUserAvatar// shows users icon
            showAvatarForEveryMessage
            alwaysShowSend // shows send button
            scrollToBottom // always scrolls to latest message at bottom
            renderSend={renderSend} // send icon function
            renderActions={renderImage}
            renderLoading={renderLoading}
            scrollToBottomComponent={scrollToBottomComponent}
            textInputStyle={styles.composer}
            isTyping = {true}
            bottomOffset = {70}
            renderAvatar = {renderAvatar}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5
    },
    bottomComponentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
    },
    systemMessageWrapper: {
      backgroundColor: '#6646ee',
      borderRadius: 4,
      padding: 5,
      marginBottom: 5
    },
    systemMessageText: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 5
    },
    composer:{
        //borderRadius: 25, 
        //borderWidth: 0.5,
        //borderColor: '#266E7D',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 8,
        paddingBottom: 5,
        paddingRight: 10,
        fontSize: 16,
      },
});