import React, {useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, 
  Image, Modal, TextInput, View } from "react-native";
import { GorgeousHeader } from "@freakycoder/react-native-header-view";
import firebase from "firebase";
import { List, Divider } from 'react-native-paper';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputName: '',
      modalVisible: false,
      threads: '',
      unsubscribe: null,
      username: '',
      gotUser: false
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setThreads = (thread) => {
    this.setState({threads: thread});
  }

  // fetch chats data from Firestore
  componentDidMount() {
    this.getChats(firebase.auth().currentUser.email);
  }

  // stop listening to changes from Firestore
  componentWillUnmount() {
    var unsubscribe = this.state.unsubscribe;
    unsubscribe();
  }

  // onSnapshot get realtime updates from Firestore
  getChats = (user) => {
    this.state.unsubscribe = firebase.firestore()
                                     .collection('chats: ' + user)
                                     .orderBy('latestMessage.timeStamp', 'desc')
                                     .onSnapshot(querySnapshot => {
                                         const threads = querySnapshot.docs.map(documentSnapshot => {
                                          //console.log(documentSnapshot.get('name'))
                                          const firebaseData = documentSnapshot.data();
                                          const data = {
                                            _id: documentSnapshot.id,
                                            name: '',
                                            latestMessage: {
                                              text: ''
                                            },
                                            ...firebaseData
                                          };
                                          return data;
                                        });
                                        this.setThreads(threads);
                                      });
  }

  findUsername = () => {
    firebase.firestore()
            .collection('info')
            .where('username', '==', this.state.textInputName)
            .get()
            .then(querySnapshot => {
              var curr = this;
              const threads = querySnapshot.forEach(function(doc) {
                //curr.setState({username: doc.data().username})
                var mail = doc.id;
                console.log("firstmail: " + mail)
                curr.findName(mail);
                /*if (doc.data().username !== curr.state.textInputName) {
                  alert("Username cannot be found.");
                }*/
                console.log("text input: " + curr.state.textInputName)
                console.log("username found: " + doc.data().username)
              })
              //console.log("username updated " + this.state.username)
              this.setState({gotUser: true})
            })
            .catch((error) => {
              alert("Username cannot be found.");
              console.log(error)
            });
  }

  findName = (email) => {
    var mail = email;
    var currU = firebase.auth().currentUser.email;
    console.log("curr email: " + currU)
    console.log("friendMail: " + mail)
    var document = firebase.firestore().collection('info').doc(currU);

    document.get()
            .then(doc => {
              var curr = this;
              this.setState({username: doc.data().username})
              console.log("name attained11: " + this.state.username)
              this.addOwnChat(currU);
              this.addFriendChat(mail, this.state.username);
            })
            .catch(function(error) {
              console.log("Eeeeerror getting document:", error);
            });
          console.log("name attained: " + this.state.username)
    //this.addFriendChat(mail, this.state.username);
  }

  addOwnChat = (user) => {
  firebase.firestore()
          .collection('chats: ' + user)
          .add({
            name: this.state.textInputName,
            latestMessage: {
              timeStamp: new Date().getTime(),
              text: 'You have created a room.'
            },
          })
          .then(docRef => {
            docRef.collection('msg').add({
              timeStamp: new Date().getTime(),
              text: 'You have created a room.',
              system: true
            })
            this.props.navigation.navigate('Chat');
          });
  }

  addFriendChat = (email, name) => {
    firebase.firestore()
            .collection('chats: ' + email)
            .add({
              name: name,
              latestMessage: {
                timeStamp: new Date().getTime(),
                text: 'You have created a room.'
              },
            })
            .then(docRef => {
              docRef.collection('msg').add({
                timeStamp: new Date().getTime(),
                text: 'You have created a room.',
                system: true
              })
              //this.props.navigation.navigate('Chat');
            });
  }

  render() {
    var user = firebase.auth().currentUser.email;
    const { modalVisible } = this.state;
    return (
        <SafeAreaView style = {styles.container}>
            <GorgeousHeader
                title = "Chats"
                subtitle = ""
                menuImageStyle = {{resizeMode: 'stretch', width: 0, height: 0}}
                profileImageSource = {require('../../../../assets/edit.png')}
                profileImageStyle = {{marginTop: -5, resizeMode: 'stretch', width: 25, height: 25}}
                profileImageOnPress = {() => {this.setModalVisible(true)}}
                titleTextStyle = {{fontSize: 30, fontWeight: '600', marginTop: -55, alignSelf: 'center', borderRadius:15}}
                searchBarStyle = {{backgroundColor: '#ffffff', borderRadius: 15, padding: 10}}
                searchInputStyle ={{marginLeft: 30, marginTop: -20}}
            />
            <View style = {[styles.container]}>
                    <Modal
                      transparent={true}
                      style = {{
                        marginHorizontal: 30,
                        flex: 1,
                        backgroundColor: "#266E7D",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",}}
                      visible = {modalVisible}
                      animationType="slide"
                    >
                      <View style = {styles.container}>
                        <TouchableOpacity
                          onPress = {() => this.setModalVisible(!modalVisible)}
                        >
                          <Image source = {require('../../../../assets/delete.png')} style = {{resizeMode: 'stretch', width: 15, height: 15, marginTop: 200, marginBottom: -310}}/>
                        </TouchableOpacity>
                        <TextInput 
                          placeholder = "Enter a username to start chatting!"
                          autoCapitalize = 'none'
                          onChangeText={(textInputName) => {
                            this.setState({ textInputName: textInputName })
                          }}
                          style ={{backgroundColor: "#fff", marginTop: 250, marginHorizontal: 10, borderRadius: 15, padding: 10}}
                        />
                        <TouchableOpacity
                          style = {{paddingHorizontal: 37, 
                            paddingVertical: 15, backgroundColor: "#266E7D", marginTop: 10, 
                            alignSelf: 'center', borderRadius: 10}}
                          onPress = {() => {
                            console.log("hello " + this.state.textInputName)
                            this.findUsername();
                            this.setModalVisible(!modalVisible);
                            //console.log("after " + this.state.modalVisible);
                          }}
                        >
                            <Text
                              style = {{textAlign: 'center', fontSize: 18, fontWeight: '600', 
                              position: 'absolute', marginTop: 3, color: "#fff", marginLeft: 8}}
                            > 
                              Create 
                            </Text>
                          </TouchableOpacity>
                          </View>
                      </Modal>
                    </View>
                    <View style = {styles.container2}>
                      <FlatList
                        data={this.state.threads}
                        keyExtractor={(item) => item._id}
                        ItemSeparatorComponent={() => <Divider />}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ChatRoom', { threads: item , user: user, })}
                          >
                          <List.Item
                            title={item.name}
                            description={item.latestMessage.text}
                            titleNumberOfLines={1}
                            titleStyle={styles.listTitle}
                            descriptionStyle={styles.listDescription}
                            descriptionNumberOfLines={1}
                          />
                          </TouchableOpacity>
                        )}
                      />
            </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1
    },
    container2: {
      paddingHorizontal: 15,
      flex: 300,
      marginTop: -90
    },
    listTitle: {
      fontSize: 22,
    },
    listDescription: {
      fontSize: 16,
    },
});
