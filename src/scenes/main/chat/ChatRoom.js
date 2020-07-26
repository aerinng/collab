import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, 
  Image, Modal, TextInput, View, KeyboardAvoidingView } from "react-native";
import { IconButton } from 'react-native-paper';
import firebase from "firebase";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { GiftedChat, Bubble, Send, SystemMessage, Actions, ActionsProps, Avatar, GiftedAvatar } from 'react-native-gifted-chat';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ChatRoom({route, user}) {
    const [messages, setMessages] = useState([]);
    const {threads} = route.params;
    try{
        if (route.params.route.result.user != null){ 
            var user = route.params.route.result.user.id;
            var email = route.params.route.result.user.email; 
         } else {
            var user = firebase.auth().currentUser.uid;
            var email = firebase.auth().currentUser.email;
         } 
    } catch {
        var user = firebase.auth().currentUser.uid;
        var email = firebase.auth().currentUser.email;
    }    
    
    // enable the sending of messages from the sender to the receiver
    async function handleSend(messages) {
        var text = messages[0].text;
        var image = '';
        if (text.includes("file") || text.includes(".jpg") || text.includes(".png")) {
            image = messages[0].text;
            text = '';
        }        


        // current user to add message
        firebase.firestore()
                .collection('chats: ' + email)
                .doc(threads._id)
                .collection('msg')
                .add({
                    text,
                    image,
                    timeStamp: new Date().getTime(),
                    user: {
                        _id: user,
                        email: email
                    }
                });

                

        //Sends notifications for every message sent
        firebase.firestore().collection("info").where("username","==", threads.name)
        .get()
        .then(sn => {
            sn.forEach(qs =>{
                const response = fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    to: qs.data().pushToken,
                    sound: 'default',
                    title: 'Order Added!',
                    body: 'A chat has been sent!',
                    _displayInForeground: true,
                    })
                });                 
            })
        })
                          
        
        await firebase.firestore()
                .collection('chats: ' + email)
                .doc(threads._id)
                .set(
                {
                    latestMessage: {
                        text,
                        image,
                        timeStamp: new Date().getTime()
                    }
                },
                { merge: true })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                }); 
                

        // friend user to add message
        firebase.firestore()
                .collection('chats: ' + threads._id)
                .doc(email)
                .collection('msg')
                .add({
                    text,
                    image,
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
                        image,
                        timeStamp: new Date().getTime()
                    },
                },
                { merge: true }
                )
                .catch(function(error) {
                    console.log("Eeeeerror getting document:", error);
                });
    }

    // fetch the messages from Cloud Firestore database
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
                                                image: '',
                                                timeStamp: new Date().getTime(),
                                                ...firebaseData
                                            };
                                            return data;
                                         });
                                         setMessages(msg); 
                                         });
                            return () => messagesListener();
                        }, []);
    
    // display messages in nice bubbles
    function renderBubble(props) {
        return (
            <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#266E7D',
                    padding: 5,
                    marginRight: 10,
                    marginTop: 2,
                    marginBottom: 10
                },
                left: {
                    backgroundColor: '#0b323b',
                    padding: 5,
                    marginLeft: 10,
                    marginTop: 2,
                    marginBottom: 10
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

    // add send button icon on the right of the sending container
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

    // function to display avatar icon
   function renderAvatar(props) {
        return (
            <GiftedAvatar 
                {...props}
                avatarStyle = {{ marginBottom: 10 }}
            />
        
        )
    }

    // function to display loading container 
    function renderLoading() {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
          </View>
        );
    }
    
    // function to allow the choosing of image to be sent
    function renderImage(props) {
        return (
        <Actions 
            {...props}
            icon={() => (
                <FontAwesome5 name = "plus" size = {20} color = "#266E7D" style = {{marginTop: -5, marginLeft: 8}}/>
            )}
            options={{
                'Choose from Library': async () => {
                    //askPermission
                    if (Constants.platform.ios || Constants.platform.android) {
                        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                        if (status !== 'granted') {
                          alert('Oops, we need camera roll permission :")');
                        } else if (status == 'granted'){
                            let result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [4, 3],
                                quality: 1,
                              });
                              if (!result.cancelled) {
                                var obj = new Object();
                                obj.text = result.uri;
                                var arr = [obj];
                                handleSend(arr);
                              }
                        }
                      }
                },
                Cancel: () => {}
            }}
            optionTintColor="#266E7D"
        />
        )
    }
    
    return (
        <View style={{ flex: 1 }}>
            <GiftedChat 
                messages={messages}
                onSend={handleSend}
                user={{ _id: user, name: email, avatar: "https://img.icons8.com/dusk/64/000000/guest-male.png"}}
                renderBubble={renderBubble} // bubble display function
                placeholder='Message' // placeholder text in sending container
                showUserAvatar// shows users icon
                showAvatarForEveryMessage
                alwaysShowSend // shows send button
                scrollToBottom // always scrolls to latest message at bottom
                renderSend={renderSend} // send icon function
                renderActions={renderImage} // send image
                renderLoading={renderLoading} // loading screen
                scrollToBottomComponent={scrollToBottomComponent} // function that scrolls to latest message at bottom
                textInputStyle={styles.composer}
                isTyping = {true}
                bottomOffset = {45}
                renderAvatar = {renderAvatar} // user's avatar
            />
            {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-155}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 275
    },
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    bottomComponentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    systemMessageWrapper: {
      backgroundColor: '#6646ee',
      borderRadius: 4,
      padding: 5,
      marginBottom: 5,
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