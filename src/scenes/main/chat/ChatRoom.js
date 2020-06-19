import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, 
  Image, Modal, TextInput, View } from "react-native";
import { IconButton } from 'react-native-paper';
import firebase from "firebase";
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';

export default function ChatRoom({route, user}) {
    const [messages, setMessages] = useState([]);
    const {threads} = route.params;
    var user = firebase.auth().currentUser.uid;
    var email = firebase.auth().currentUser.email;

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
        /*firebase.firestore()
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
                );*/
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
                                            if (!firebaseData.system) {
                                                data.user = {
                                                    ...firebaseData.user,
                                                    name: firebaseData.user.email
                                                };
                                            }
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
                backgroundColor: '#266E7D'
                }
            }}
            textStyle={{
                right: {
                color: '#fff'
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
            <IconButton icon='send-circle' size={32} color='#266E7D' />
            </View>
        </Send>
        );
    }

    // function to always scroll to latest message
    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
            <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
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
            showUserAvatar // shows users icon
            alwaysShowSend // shows send button
            scrollToBottom // always scrolls to latest message at bottom
            renderSend={renderSend} // send icon function
            scrollToBottomComponent={scrollToBottomComponent} 
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
      alignItems: 'center'
    },
    bottomComponentContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    systemMessageWrapper: {
      backgroundColor: '#6646ee',
      borderRadius: 4,
      padding: 5
    },
    systemMessageText: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold'
    }
});