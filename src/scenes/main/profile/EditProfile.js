import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, TextInput } from "react-native";
import { Divider } from 'react-native-paper';
import firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';

class EditProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            textInputName: '',
            textInputAddressLine1: '',
            textInputAddressLine2: '',
            name: '',
            username: '',
            addressLine1: 'Address Line 1',
            addressLine2: 'Address Line 2',
            err: '',
            unsubscribe: '',
            userAvatar: 'null',
            imageChosen: false
        };
    }

    // allowing the setting of new name
    setName = (name) => {
        this.setState({textInputName: name});
    }

    // allow the setting of new address line 1
    setAddress1 = (address) => {
        this.setState({textInputAddressLine1: address});
    }

    // allow the setting of new address line 2
    setAddress2 = (address) => {
        this.setState({textInputAddressLine2: address});
    }
    
    // allow the changing of user's name
    changeName = (result) => {
        if (result != null){ 
            var user = result.user;
        } else {
            var user = firebase.auth().currentUser;
        }
        firebase.firestore().collection('info').doc(user.email).update({
            name: this.state.textInputName
        })
    }

    // allow the changing of address
    changeAddress = (result) => {
        if (result != null){ 
            var user = result.user;
        } else {
            var user = firebase.auth().currentUser;
        }
        firebase.firestore().collection('info').doc(user.email).update({
            addressLine1: this.state.textInputAddressLine1,
            addressLine2: this.state.textInputAddressLine2,
        })
    }

    // set the states for username, name, address, avatar and status
    setsStates = (data) => {
        this.setState({username: data.username});
        this.setState({name: data.name});
        if (data.addressLine1 != '') {
            this.setState({addressLine1: data.addressLine1});
        }
        if (data.addressLine2 != '') {
            this.setState({addressLine2: data.addressLine2});
        }
        this.setState({userAvatar: data.avatar});
        this.setState({status: data.status})
        if (this.state.userAvatar !== 'null') {
            this.setState({imageChosen: true})
        }
    }

    // fetch profile data from Cloud Firestore database
    getData = () => {
        var user = this.props.route.params.user;
        var document = firebase.firestore().collection('info').doc(user);
        this.state.unsubscribe = document.get().then((doc) => {
            var data = doc.data();
            this.setsStates(data);
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    // ask for user's permission to access camera roll
    askPermission = async (result) => {
        if (Constants.platform.ios || Constants.platform.android) {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Oops, we need camera roll permission :")');
          } else if (status == 'granted'){
              this.handleUserAvatar(result);
          }
        }
    }

    // allow the setting of user's avatar
    handleUserAvatar = async (result) => {
        let results = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    
          if (!results.cancelled) {
            this.setState({userAvatar: results.uri});
            this.setState({imageChosen: true});
            if (result != null){ 
                var user = result.user;
            } else {
                var user = firebase.auth().currentUser;
            }
            firebase.firestore().collection('info').doc(user.email).update({
                avatar: this.state.userAvatar
            })
          }
    }

    // fetch profile data from Cloud Firestore database upon renders
    componentDidMount() {
        this.getData();
        if (this.state.status == 'undetermined' && Constants.platform.ios) {
            this.state.status = ImagePicker.requestCameraRollPermissionsAsync();
        }
    }

    // unsubscribe from fetching data from Cloud Firestore database
    componentWillUnmount() {
        var unsubscribe = this.state.unsubscribe;
        unsubscribe;
    }

    // add into analytics
    logsEvent = async () => { 
        await Analytics.logEvent('EditProfile', {
            name: 'editprofile',
            screen: 'editprofile',
            purpose: 'Successfully edited profile',
          });
    }

    render(){
        var user = this.props.route.params.user; // email
        var result = this.props.route.params.result;
        return (
            <KeyboardAwareScrollView>
                <Image source = {require('../../../../assets/banner.jpg')} style = {styles.banner}/>
                <View style={styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {{color: "#266E7D", width: 150, height: 100}}
                        onPress = {() => {
                            this.askPermission(result);
                        }}
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
                    <Text style = {{fontSize: 10}}>Oops, you can't change this!</Text>
                    
                    <Text
                        style = {styles.fieldText}
                        placeholder = {this.state.username}
                        placeholderTextColor = "#000"
                        onChangeText={textInput => {
                            this.setUsername(textInput);
                        }}
                    >{this.state.username}</Text>
                    <Divider />
                    <Text style = {styles.fieldName}>Email</Text>
                    <Text style = {{fontSize: 10}}>Oops, you can't change this!</Text>
                    <Text 
                        style = {styles.fieldText}
                        placeholder = {user}
                        placeholderTextColor = "#000"
                        onChangeText={textInput => {
                            this.setEmail(textInput);
                        }}
                    >{user}</Text>
                    <Divider />
                    <Text style = {styles.fieldName}>My Address</Text>
                    <TextInput 
                        style = {styles.fieldText}
                        placeholder = {this.state.addressLine1}
                        placeholderTextColor = "#000"
                        maxLength ={20}
                        onChangeText={textInput => {
                            this.setAddress1(textInput);
                        }}
                    />
                    <TextInput 
                        style = {styles.fieldText}
                        placeholder = {this.state.addressLine2}
                        placeholderTextColor = "#000"
                        maxLength ={20}
                        onChangeText={textInput => {
                            this.setAddress2(textInput);
                        }}
                    />
                    <Divider />
                    <TouchableOpacity 
                        style = {styles.item}
                        onPress = {() => {
                            if (this.state.textInputAddressLine1 != '' || this.state.textInputAddressLine2 != '') {
                                this.changeAddress(result);
                            }
                            if (this.state.textInputName != '') {
                                this.changeName(result);
                            }
                            this.logsEvent();
                            this.props.navigation.navigate('Profile');
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
        marginLeft: 185,
        position: 'absolute',
        marginRight: -30
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
