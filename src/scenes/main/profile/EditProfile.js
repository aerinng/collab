import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, TextInput } from "react-native";
import { Divider } from 'react-native-paper';
import firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

class EditProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            textInputName: '',
            textInputUsername: '',
            textInputEmail: '',
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
    setAddress1 = (address) => {
        this.setState({textInputAddressLine1: address});
    }

    setAddress2 = (address) => {
        this.setState({textInputAddressLine2: address});
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

    /*changeEmail = () => {
        firebase.auth().currentUser.updateEmail(this.state.textInputEmail).then(function() {
            alert("Email updated successfully.");
          }).catch(function(error) {
            alert(error.message);
          });
    }*/

    changeAddress = () => {
        var user = firebase.auth().currentUser;
        firebase.firestore().collection('info').doc(user.email).update({
            addressLine1: this.state.textInputAddressLine1,
            addressLine2: this.state.textInputAddressLine2,
        })
    }

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

    getData = () => {
        var user = firebase.auth().currentUser;
        var document = firebase.firestore().collection('info').doc(user.email);
        this.state.unsubscribe = document.get().then((doc) => {
            var data = doc.data();
            this.setsStates(data);
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    askPermission = async () => {
        if (Constants.platform.ios) {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          console.log(status)
          if (status !== 'granted') {
            alert('Oops, we need camera roll permission :")');
          } else if (status == 'granted'){
              this.handleUserAvatar();
          }
        }
    }

    handleUserAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        if (this.state.status == 'undetermined' && Constants.platform.ios) {
            this.state.status = ImagePicker.requestCameraRollPermissionsAsync();
        }
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
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {{color: "#266E7D", width: 150, height: 100}}
                        onPress = {() => {
                            this.askPermission();
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
                    <Text style = {{fontSize: 10}}>Oops, you can't change this!</Text>
                    <Text 
                        style = {styles.fieldText}
                        placeholder = {user.email}
                        placeholderTextColor = "#000"
                        onChangeText={textInput => {
                            this.setEmail(textInput);
                        }}
                    >{user.email}</Text>
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
// import React from 'react';
// import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
// import { List, Divider } from 'react-native-paper';
// import firebase from 'firebase'; 

// class EditProfile extends React.Component{
//     render(){
//         //const {name} = this.props.route.params;
//         return (
//             <View>
//                 <ScrollView>
//                 <Image source = {require('../../../../assets/banner.jpg')} style = {styles.banner}/>
//                 <View style={styles.scrollView}>
//                     <TouchableOpacity  
//                         style = {styles.backbutton}
//                         onPress={() => this.props.navigation.goBack()}
//                     >
//                         <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
//                     </TouchableOpacity>
//                     <Image source = {require('../../../../assets/userMask.png')} style = {styles.userIcon}/>
//                     <Text style = {styles.header}> username </Text>
//                     <Text style = {styles.fieldName}>Username</Text>
//                     <TouchableOpacity>
//                         <Text style = {styles.fieldButton}> Change Username </Text>
//                     </TouchableOpacity>
//                     <Divider />
//                     <Text style = {styles.fieldText}>myUsername</Text>
//                     <Text style = {styles.fieldName}>Email</Text>
//                     <TouchableOpacity>
//                         <Text style = {styles.fieldButton}> Update Email </Text>
//                     </TouchableOpacity>
//                     <Text style = {styles.fieldText}>lorem@gmail.com</Text>
//                     <Divider />
//                     <Text style = {styles.fieldName}>My Address</Text>
//                     <TouchableOpacity>
//                         <Text style = {styles.fieldButton}> Update Address </Text>
//                     </TouchableOpacity>
//                     <Text style = {styles.fieldText}>10 Admiralty Street Northlink Building 757695</Text>
//                     <Divider />
//                     <TouchableOpacity 
//                         style = {styles.item}
//                     >
//                         <Text style = {styles.detailsTitle}> Change Password</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                         style = {styles.item}
//                         onPress={() => {
//                             firebase.auth().signOut()
//                             this.props.navigation.navigate('Login')
//                         }
//                     }
//                     >
//                         <Text style = {styles.detailsTitle}>Log Out</Text>
//                     </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </View>
//         )
//     }
// };

// export default EditProfile;

// const styles = StyleSheet.create({
//     container: {
//       alignSelf: 'stretch',
//       padding: 35,
//       flex: 1
//     },
//     scrollView: {
//         padding: 30,
//         marginVertical: 10
//     },
//     header: {
//         fontSize: 24,
//         marginBottom: 18,
//         marginTop: 0,
//         fontWeight: 'bold',
//         alignItems: 'center',
//         textAlign: 'center',
//     },
//     backbutton: {
//         zIndex: 1,
//         width: 20,
//         height: 20,
//         resizeMode: 'stretch',
//         //position: 'absolute',
//         marginTop: -60,
//     },
//     titles: {
//         alignItems: 'stretch',
//         marginBottom: 8,
//         fontWeight: 'bold',
//         fontSize: 15
//     },
//     data: {
//         alignItems: 'stretch',
//         marginBottom: 8,
//         fontSize: 15
//     },
//     header: {
//         fontSize: 33,
//         marginTop: -20,
//         fontWeight: 'bold',
//         textAlign: 'right',
//         marginLeft: 200,
//         position: 'absolute'
//     },
//     userIcon: {
//         width: 150,
//         height: 150,
//         alignSelf: 'flex-start',
//         borderRadius: 50,
//         marginTop: -50,
//         marginBottom: 20
//     },
//     banner: {
//         height: 150,
//         alignSelf: 'center',
//     },
//     fieldName: {
//         fontSize: 25,
//         fontWeight: '600',
//         marginTop: 20
//     },
//     fieldButton: {
//         color: '#266E7D',
//         fontSize: 16,
//         fontWeight: '600',
//         marginLeft: -5,
//         marginBottom: 10
//     },
//     fieldText: {
//         marginTop: -55,
//         marginBottom: 30,
//         marginLeft: 200,
//         fontSize: 18
//     },
//     item: {
//         marginTop: 25,
//         marginHorizontal: 70,
//         borderRadius: 15,
//         backgroundColor: "#C5C5C5",
//     },
//     detailsTitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         textAlign: 'center',
//         zIndex: 1,
//         padding: 15,
//         color: "#266E7D"
//     },
// });