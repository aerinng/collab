import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from "react-native";
import firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Analytics from 'expo-firebase-analytics';
import md5 from 'md5';

export default class Signup extends React.Component{
    //Set the state to give each TextInput an 'identity' to call them. Helpful for Firebase.
    state = {
        name:'',
        email:'',
        username: '',
        password:'',
        addressLine1: '',
        addressLine2: '',
        error:'',
        err: ''
    }

    // Add into analytics
    logsEvent = async () => { 
        await Analytics.logEvent('Signup', {
            name: 'signup',
            screen: 'signup',
            purpose: 'User successfully signed up via Collab login method',
        });
    }
    
    //Create users with the given email and password (FOR AUTHENTICATION)
    onBottomPress = () => {
        firebase.auth()
                .createUserWithEmailAndPassword(this.state.email,this.state.password)
                .catch(err => {
                    alert(err);
                })
        this.onSignupSuccess();
    }

    //If successful, no error message shown
    onSignupSuccess =  () => {
        //Creates individual email user as a Collection
        var mail = this.state.email;
        firebase.firestore()
                .collection('info')
                .doc(mail)
                .set({
                    promo:'',
                    location:'',
                    category:'',
                    total:'', 
                    date:'',
                    desc:'',
                    avatar: 'null',
                    addressLine1: this.state.addressLine1,
                    addressLine2: this.state.addressLine2,
                    name: this.state.name,
                    username: this.state.username,
                    pushToken: '',
                    frequency: '',
                    hashPwd: md5(this.state.password)
                })
                .then(() => {
                   this.props.navigation.navigate(
                       'Preferences', 
                       {email: mail, 
                        name: this.state.name, 
                        username: this.state.username,
                        byGoogle: false,
                        password: this.state.password
                    });
                })
                .catch(error => {
                    alert(error);
                });
    }

    // Email validation
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
    };

    render() {
        return (           
            <SafeAreaView style = {styles.container}>
                <KeyboardAwareScrollView>
                <View style = {styles.container}>
                    <Image 
                        style = {styles.image}
                        source = {require('../../../assets/collab_transparent.png')}
                    />
                    <Text style = {styles.Title}> Register </Text>
                    <Image 
                        style = {styles.icons3}
                        source = {require('../../../assets/name.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Name"
                        //value={this.state.name}
                        onChangeText={name => this.setState({name: name})}
                        autoCapitalize = 'none'
                    />
                    <Image 
                        style = {styles.icons4}
                        source = {require('../../../assets/email.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Email"
                        //value={this.state.email}
                        onChangeText={email => {
                                this.setState({email: email})
                        }}
                        autoCapitalize = 'none'
                    />
                    <Image 
                        style = {styles.icons}
                        source = {require('../../../assets/user.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Username"
                        //value={this.state.username}
                        onChangeText={username => this.setState({username: username})}
                        autoCapitalize = 'none'
                    />
                    <Image 
                        style = {styles.icons2}
                        source = {require('../../../assets/password.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Password"
                        //value={this.state.password}
                        onChangeText={password => this.setState({password: password})}
                        secureTextEntry = {true}
                        autoCapitalize = 'none'
                    />
                    <TouchableOpacity 
                        style = {styles.Button} 
                        onPress = {() => {
                            if (this.state.name == '' || 
                                this.state.email == '' ||
                                this.state.username == '' ||
                                this.state.password =='') {
                                alert("Please input all mandatory fields!")
                            } else if (!this.validateEmail(this.state.email)) {
                                alert("Please input a valid email!")
                            } else {
                                this.logsEvent();
                                this.onBottomPress();
                            }
                        }}
                    > 
                        <Text style = {styles.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1
    },
    image: {
        resizeMode: 'contain',
        width: 130,
        height: 130,
        alignSelf: 'center',
    },
    icons: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 425,
        padding: 10,
        zIndex: 1
    },
    icons2: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 495,
        padding: 10,
        zIndex: 1
    },
    icons3: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 270,
        padding: 10,
        zIndex: 1
    },
    icons4: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 345,
        padding: 10,
        zIndex: 1
    },
    Title: {
        textAlign: 'center',
        fontSize: 45,
        fontWeight: '600',
        paddingBottom: 30
    },
    TextInput: {
        alignSelf: 'stretch',
        height: 55,
        color: '#000000',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 55,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#E5E5E5'
    },
    Button: {
        backgroundColor: "#266E7D",
        padding: 10,
        marginHorizontal: 70,
        marginVertical: 25,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffff',
    },
    ForgetPW: {
        color: '#266E7D',
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 5
    },
    NoAccountText: {
        textAlign: 'center',
        marginLeft: 70,
        marginTop: 510,
        position: 'absolute'
    },
    NoAccount: {
        color: '#266E7D',
        textAlign: 'center',
        fontWeight: '700',
        marginLeft: 192,
        marginTop: 11,
        position: 'absolute'
    }
});