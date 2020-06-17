import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Signup extends React.Component{
    //Set the state to give each TextInput an 'identity' to call them. Helpful for Firebase.
    state = {
        name:'',
        email:'',
        username: '',
        password:'',
        address: '',
        error:'',
        err: ''
    }
    
    //Create users with the given email and password (FOR AUTHENTICATION)
    onBottomPress = () =>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onSignupSuccess)
        .catch(err => {
            this.setState({
                error:err.message
            })
        })
    }

    //If successful, no error message shown
    onSignupSuccess =  () => {
        this.setState({
            error:''
        })
        this.addToDB();
        this.props.navigation.navigate('Preference');
    }        

    addToDB = () => {
        var cUser = firebase.auth().currentUser.uid; 
        firebase.firestore().collection('info').doc(this.state.email).set({ //rmb to add name
            promo:'',
            location:'',
            category:'',
            total:'', 
            date:'',
            desc:'',
            avatar: 'null',
            address: this.state.address,
            name: this.state.name,
            username: this.state.username
        }).then(error =>{
            this.setState({
                err:''
            }
        )})
        .catch(error =>{
            this.setState({
                err:error.message
            })
        });
    }

    render(){
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
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        underlineColorAndroid = { 'transparent' }
                        autoCapitalize = 'none'
                    />
                    <Image 
                        style = {styles.icons4}
                        source = {require('../../../assets/email.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        underlineColorAndroid = { 'transparent' }
                        autoCapitalize = 'none'
                    />
                    <Image 
                        style = {styles.icons}
                        source = {require('../../../assets/user.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Username"
                        value={this.state.username}
                        onChangeText={username => this.setState({username})}
                        underlineColorAndroid = { 'transparent' }
                        autoCapitalize = 'none'
                    />
                    <Image 
                        style = {styles.icons2}
                        source = {require('../../../assets/password.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        secureTextEntry = {true}
                        underlineColorAndroid = { 'transparent' }
                        autoCapitalize = 'none'
                    />
                    <TouchableOpacity style = {styles.Button} onPress={this.onBottomPress}> 
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
        marginTop: 10
    },
    icons: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 435,
        padding: 10,
        zIndex: 1
    },
    icons2: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 505,
        padding: 10,
        zIndex: 1
    },
    icons3: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 280,
        padding: 10,
        zIndex: 1
    },
    icons4: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 355,
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

export default Signup;