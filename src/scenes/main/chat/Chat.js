import React, {useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, 
  Image, Modal, TextInput, View } from "react-native";
import firebase from "firebase";
import { List, Divider, Searchbar } from 'react-native-paper';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputName: '',
      modalVisible: false,
      threads: '',
      unsubscribe: null,
      username: '',
      friendUsername: '',
      friendEmail: '',
      gotUser: false
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setThreads = (thread) => {
    this.setState({threads: thread});
  }

  setFriendDetails = (email, user) => {
    this.setState({friendEmail: email});
    this.setState({friendUsername: user});
   //console.log("test1: " + this.state.friendEmail);
    //console.log("test2: " + this.state.friendUsername)
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
                                          //console.log("SUBS: " + documentSnapshot.id)
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
                var mail = doc.id;
                var userObtained = doc.data().username;
                //console.log("firstmail: " + mail)
                //console.log("firstuser: " + userObtained)
                curr.setFriendDetails(mail, userObtained);
                curr.findName(mail);
                //console.log("text input: " + curr.state.textInputName)
                //console.log("username found: " + doc.data().username)
              })
              //console.log("username updated " + this.state.username)
              this.setState({gotUser: true})
            })
            .catch((error) => {
              this.setState({gotUser: false})
              alert("Username cannot be found.");
              console.log(error)
            });
  }

  findName = (email) => {
    var mail = email;
    var currU = firebase.auth().currentUser.email;
    //console.log("curr email: " + currU)
    //console.log("friendMail: " + mail)
    var document = firebase.firestore().collection('info').doc(currU);

    document.get()
            .then(doc => {
              var curr = this;
              this.setState({username: doc.data().username})
              //console.log("name attained11: " + this.state.username)
              this.addOwnChat(currU, mail);
              this.addFriendChat(mail, this.state.username, currU);
            })
            .catch(function(error) {
              console.log("Eeeeerror getting document:", error);
            });
          //console.log("name attained: " + this.state.username)
  }

  addOwnChat = (user, friendEmail) => {
    var docRef = firebase.firestore()
                         .collection('chats: ' + user)
                         .doc(friendEmail);
    docRef.set({
            name: this.state.textInputName,
            latestMessage: {
              timeStamp: new Date().getTime(),
              text: 'You have created a room.'
            },
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });

          //.then(docRef => {
    docRef.collection('msg')
          .add({
            timeStamp: new Date().getTime(),
            text: 'You have created a room.',
            system: true
          })
            //this.props.navigation.navigate('Chat');
          //})
          
  }

  addFriendChat = (email, name, ownEmail) => {
    var docRef = firebase.firestore()
            .collection('chats: ' + email)
            .doc(ownEmail);
    docRef.set({
            name: name,
            latestMessage: {
              timeStamp: new Date().getTime(),
              text: 'You have created a room.'
            },
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
            //.then(docRef => {
    docRef.collection('msg')
          .add({
            timeStamp: new Date().getTime(),
            text: 'You have created a room.',
            system: true
          })
              //this.props.navigation.navigate('Chat');
            //})
            
          
  }

  render() {
    var user = firebase.auth().currentUser.email;
    const { modalVisible } = this.state;
    return (
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity onPress = {() => {this.setModalVisible(true)}} >
              <Image
                source = {require('../../../../assets/edit.png')}
                style = {{marginTop: 15, resizeMode: 'stretch', width: 30, height: 30, alignSelf: 'flex-end', marginRight: 25}}
              />
            </TouchableOpacity>
            <Text 
              style = {{fontSize: 30, fontWeight: '600', marginTop: -30, alignSelf: 'center', borderRadius:15}}
            >
              Chats
            </Text>
            <Searchbar 
              //onChangeText={text => {
              // setTimeout((text) => searched(text), 1500);
              //}}
              placeholder = "Search Chats"
              style = {{backgroundColor: '#fff', borderRadius: 15, marginHorizontal: 20, marginTop: 15, marginBottom: 25}}
              //value = {query}
              //theme = {{color: "266E7D"}}
              // to change cursor colour bc its purple rn 
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
                            //console.log("hello " + this.state.textInputName)
                            this.findUsername();
                            this.setModalVisible(!modalVisible);
                            /*if (!this.state.gotUser) {
                              alert("Username cannot be found!")
                            }*/
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
                            onPress={() => this.props.navigation.navigate(
                              'ChatRoom', { 
                                threads: item , 
                                //friendEmail: this.state.friendEmail, 
                                //friendUsername: this.state.friendUsername 
                              })}
                          >
                          <List.Item
                            title={item.name}
                            description={item.latestMessage.text}
                            left = {props => <List.Icon {...props} icon="chat" />}
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
