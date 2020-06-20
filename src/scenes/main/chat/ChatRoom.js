import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, 
  Image, Modal, TextInput, View } from "react-native";
import { IconButton } from 'react-native-paper';
import firebase from "firebase";
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';

export default function ChatRoom({route, user}) {
    const [messages, setMessages] = useState([]);
    const {threads} = route.params;
    //console.log("testing: " + threads._id + " and " + threads.name)
    var user = firebase.auth().currentUser.uid;
    var email = firebase.auth().currentUser.email;
    //threads._id is the friend's email

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
                );

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
                );
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

    function renderLoading() {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
          </View>
        );
      }
                    
    return (
        <GiftedChat 
            messages={messages}
            onSend={handleSend}
            user={{ _id: user}}
            renderBubble={renderBubble} // bubble display function
            placeholder='Message'
            //showUserAvatar // shows users icon
            alwaysShowSend // shows send button
            scrollToBottom // always scrolls to latest message at bottom
            renderSend={renderSend} // send icon function
            renderLoading={renderLoading}
            scrollToBottomComponent={scrollToBottomComponent}
            textInputStyle={styles.composer}
            isTyping = {true}
            bottomOffset = {70}
            renderAvatar = {null}
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