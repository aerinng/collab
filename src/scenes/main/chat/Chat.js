import React, {useEffect} from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, 
  Image, Modal, TextInput, View, Alert } from "react-native";
import firebase from "firebase";
import { List, Divider, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// function for the search bar to filter by usernames
const searchFilterFunction = (text, threads) => {
  var DATA = threads;
  const newData = (DATA.filter(function(item) {
    return item.name.indexOf(text) > -1;
  }));
  DATA.length = 0;
  DATA.push(...newData);
};

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
      gotUser: false,
      query: '',
      typingTimeout: 0
    };
  }

  // set visibility of modal to input username
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setThreads = (thread) => {
    this.setState({threads: thread});
  }

  setFriendDetails = (email, user) => {
    this.setState({friendEmail: email});
    this.setState({friendUsername: user});
  }

  // fetch chats data from Cloud Firestore database
  componentDidMount() {
    //NEW CODES: to see if user is:
    //Google login OR Collab login    
    if (this.props.route.params.result != null){
      const {result} = this.props.route.params;
      var user = result.user; 
    } else {
        var user = firebase.auth().currentUser;
    }       
    this.getChats(user.email)
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
                                              text: '',
                                              image: ''
                                            },
                                            ...firebaseData
                                          };
                                          return data;
                                        });
                                        this.setThreads(threads);
                                      });
  }

  // find username from user's text input
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
                  curr.setFriendDetails(mail, userObtained);
                  curr.findName(mail);
                  curr.setCurrUser();
              })
            })
            .catch((error) => {
              this.setState({gotUser: false})
              alert("Username cannot be found.");
              console.log(error)
            });
  }

  // set boolean as true if user is found
  setCurrUser = () => {
    this.setState({gotUser: true})
  }
  
  // impose a timeout before function starts checking if username exists
  seeGotUserNot = () => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
   }
   var temp = setTimeout(
     this.checkUser
   , 500);
  
   this.setState({typingTimeout: temp})
  }

  // function to check if username exists
  checkUser = () => {
    //console.log(this.state.gotUser)
    if (!this.state.gotUser) {
      Alert.alert("Alert", "Username cannot be found!")
    } else {
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  // find username of sender and call functions to add chats into databases
  findName = (email) => {
    var mail = email;
    //NEW CODES: to see if user is:
    //Google login OR Collab login    
    if (this.props.route.params.result != null){
        const {result} = this.props.route.params;
        var currU = result.user.email; 
    } else {
        var currU = firebase.auth().currentUser.email;
    }       
    var document = firebase.firestore().collection('info').doc(currU);

    document.get()
            .then(doc => {
              var curr = this;
              this.setState({username: doc.data().username})
              this.addOwnChat(currU, mail);
              this.addFriendChat(mail, this.state.username, currU);
            })
            .catch(function(error) {
              console.log("Error getting document:", error);
            });
  }

  // add chat into sender's database
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
  }

  // add chat into receiver's database
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
    docRef.collection('msg')
          .add({
            timeStamp: new Date().getTime(),
            text: 'You have created a room.',
            system: true
          })
  }

  // impose a timeout before starting the filtering via username on the search bar
  searched = (text) => {
    this.setState({query: text});
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    var data = this.state.threads;
    var temp = setTimeout(function() {
      searchFilterFunction(text, data)
    }, 500);
    
    this.setState({typingTimeout: temp})
  }

  render() {
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
              onChangeText={text => {this.searched(text)}}
              placeholder = "Search Chats"
              autoCapitalize = 'none'
              style = {{backgroundColor: '#fff', borderRadius: 15, marginHorizontal: 20, marginTop: 15, marginBottom: 25}}
              value = {this.state.query}
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
                            this.findUsername();
                            this.seeGotUserNot();
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
                                threads: item
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
                        // optimisation, length number is a random number,
                        // doesn't seem to affect anything
                        getItemLayout={(data, index) => (
                          {length: 15, offset: 15 * index, index}
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
