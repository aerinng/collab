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
      unsubscribe: null
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
    this.getChats(firebase.auth().currentUser.uid);
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
                                     //.where('latestMessage.timeStamp', '>', 'A')
                                     .orderBy('latestMessage.timeStamp', 'desc')
                                     .onSnapshot(querySnapshot => {
                                         const threads = querySnapshot.docs.map(documentSnapshot => {
                                          //console.log(documentSnapshot.get('name'))
                                          return {
                                            _id: documentSnapshot.id,
                                            name: '',
                                            latestMessage: {
                                              text: ''
                                            },
                                            ...documentSnapshot.data()
                                          };
                                        });
                                        this.setThreads(threads);
                                      });
      }

  render() {
    var user = firebase.auth().currentUser.uid;
    const { modalVisible } = this.state;
    return (
        <SafeAreaView style = {styles.container}>
            <GorgeousHeader
                title = "Chats"
                subtitle = ""
                menuImageStyle = {{resizeMode: 'stretch', width: 0, height: 0}}
                profileImageSource = {require('../../../../assets/edit.png')}
                profileImageStyle = {{marginTop: -5, resizeMode: 'stretch', width: 25, height: 25}}
                profileImageOnPress = {() => {
                  this.setModalVisible(true);
                  //console.log("before " + this.state.modalVisible);
                  
                }}
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
                          placeholder = "Whom would you like to message?"
                          onChangeText={
                            textInputName => this.setState({ textInputName })
                            //firebase.auth().
                          }
                          style ={{backgroundColor: "#fff", marginTop: 250, marginHorizontal: 10, borderRadius: 15, padding: 10}}
                        />
                        <TouchableOpacity
                          style = {{paddingHorizontal: 37, 
                            paddingVertical: 15, backgroundColor: "#266E7D", marginTop: 10, 
                            alignSelf: 'center', borderRadius: 10}}
                          onPress = {() => {
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
                            onPress={() => this.props.navigation.navigate('ChatRoom', { threads: item , user: user})}
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
