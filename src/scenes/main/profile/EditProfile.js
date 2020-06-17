import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, TextInput } from "react-native";
import { Divider } from 'react-native-paper';
import firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

class EditProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            textInputName: '',
            textInputUsername: '',
            textInputEmail: '',
            textInputAddress: '',
            name: '',
            username: '',
            address: '',
            err: '',
            unsubscribe: '',
            userAvatar: 'null',
            imageChosen: false
        };
    }

    setName = (name) => {
        this.setState({textInputName: name});
    }

    setUsername = (username) => {
        this.setState({textInputUsername: username});
    }

    setEmail = (email) => {
        this.setState({textInputEmail: email});
    }

    // to be added
    setAddress = (address) => {
        this.setState({textInputAddress: address});
    }
    
    changeName = () => {
        var user = firebase.auth().currentUser;
        firebase.firestore().collection('info').doc(user.email).update({
            name: this.state.textInputName
        })
    }

    changeUsername = () => {
        var user = firebase.auth().currentUser;
        firebase.firestore().collection('info').doc(user.email).update({
            username: this.state.textInputUsername
        })
    }

    changeEmail = () => {
        firebase.auth().currentUser.updateEmail(this.state.textInputEmail).then(function() {
            alert("Email updated successfully.");
          }).catch(function(error) {
            alert(error.message);
          });
    }

    changeAddress = () => {
        var user = firebase.auth().currentUser;
        firebase.firestore().collection('info').doc(user.email).update({
            address: this.state.textInputAddress
        })
    }

    setsStates = (data) => {
        this.setState({username: data.username});
        this.setState({name: data.name});
        this.setState({address: data.address});
        this.setState({userAvatar: data.avatar});
        if (this.state.userAvatar !== 'null') {
            this.setState({imageChosen: true})
        }
    }

    getData = () => {
        var user = firebase.auth().currentUser;
        var document = firebase.firestore().collection('info').doc(user.email);
        this.state.unsubscribe = document.get().then((doc) => {
            var data = doc.data();
            this.setsStates(data);
            console.log("1. " + this.state.username);
            console.log("2. " + this.state.name);
            console.log("3. " + this.state.address);
            console.log("4. " + this.state.userAvatar);
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    handleUserAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            this.setState({userAvatar: result.uri});
            this.setState({imageChosen: true});
            var user = firebase.auth().currentUser;
            firebase.firestore().collection('info').doc(user.email).update({
                avatar: this.state.userAvatar
            })
          }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        var unsubscribe = this.state.unsubscribe;
        unsubscribe;
    }

    render(){
        var user = firebase.auth().currentUser;
        return (
            <KeyboardAwareScrollView>
                <Image source = {require('../../../../assets/banner.jpg')} style = {styles.banner}/>
                <View style={styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {{color: "#266E7D", width: 150, height: 100}}
                        onPress = {this.handleUserAvatar}
                    >
                        <Image source = {{uri: this.state.userAvatar}} style = {styles.userIcon}/>
                        <Ionicons 
                            name="ios-add"
                            size={70}
                            color={"#FFF"}
                            style={{opacity: this.state.imageChosen ? 0 : 1, zIndex: 1, marginLeft: 52, marginTop: -125, justifyContent: 'center'}}
                        />
                    </TouchableOpacity>
                    <Text style = {styles.header}>{this.state.username}</Text>
                    <Text style = {styles.fieldName}>Name</Text>
                    <TextInput 
                        style = {styles.fieldText}
                        placeholder = {this.state.name}
                        placeholderTextColor = "#000"
                        onChangeText={textInput => {
                            this.setName(textInput);
                        }}
                    />
                    <Divider />
                    <Text style = {styles.fieldName}>Username</Text>
                    <Divider />
                    <TextInput 
                        style = {styles.fieldText}
                        placeholder = {this.state.username}
                        placeholderTextColor = "#000"
                        onChangeText={textInput => {
                            this.setUsername(textInput);
                        }}
                    />
                    <Text style = {styles.fieldName}>Email</Text>
                    <TextInput 
                        style = {styles.fieldText}
                        placeholder = {user.email}
                        placeholderTextColor = "#000"
                        onChangeText={textInput => {
                            this.setEmail(textInput);
                        }}
                    />
                    <Divider />
                    <Text style = {styles.fieldName}>My Address</Text>
                    <TextInput 
                        style = {styles.fieldText}
                        multiline = {true}
                        //numberOfLines = {5}
                        placeholder = {this.state.address}
                        placeholderTextColor = "#000"
                        onChangeText={textInput => {
                            this.setAddress(textInput);
                        }}
                    />
                    <Divider />
                    <TouchableOpacity 
                        style = {styles.item}
                        onPress = {() => {
                            if (this.state.textInputAddress != '') {
                                this.changeAddress();
                            }
                            if (this.state.textInputName != '') {
                                this.changeName();
                            }
                            if (this.state.textInputUsername != '') {
                                this.changeUsername();
                            }
                            if (this.state.textInputEmail != '') {
                                this.changeEmail();
                            }
                            this.props.navigation.goBack();
                        }}
                    >
                        <Text style = {styles.detailsTitle}>Save</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        )
    }
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1
    },
    scrollView: {
        padding: 30,
        marginVertical: 10
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        marginTop: -60,
    },
    titles: {
        alignItems: 'stretch',
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 15
    },
    data: {
        alignItems: 'stretch',
        marginBottom: 8,
        fontSize: 15
    },
    header: {
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'right',
        marginLeft: 210,
        position: 'absolute'
    },
    userIcon: {
        width: 140,
        height: 140,
        alignSelf: 'flex-start',
        backgroundColor: '#266E7D',
        borderRadius: 100,
        marginTop: -50,
        marginBottom: 20
    },
    banner: {
        height: 150,
        alignSelf: 'center',
    },
    fieldName: {
        fontSize: 25,
        fontWeight: '600',
        marginTop: 20
    },
    fieldText: {
        marginTop: -30,
        marginBottom: 30,
        marginLeft: 160,
        marginRight: 5,
        fontSize: 18
    },
    item: {
        marginTop: 50,
        marginHorizontal: 80,
        borderRadius: 15,
        backgroundColor: "#266E7D"
    },
    detailsTitle: {
        fontSize: 25,
        fontWeight: '600',
        color: "#fff",
        textAlign: 'center',
        zIndex: 1,
        padding: 15
    },
});
