import React from 'react';
import { View, StatusBar, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, SafeAreaView } from "react-native";

export default Signup = () => (
    <SafeAreaView style = {styles.container}>
    <KeyboardAvoidingView behaviour = "padding">
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
                underlineColorAndroid = { 'transparent' }
            />
            <Image 
                style = {styles.icons4}
                source = {require('../../../assets/email.png')}
            />
            <TextInput 
                style = {styles.TextInput}
                placeholder = "Email"
                underlineColorAndroid = { 'transparent' }
            />
            <Image 
                style = {styles.icons}
                source = {require('../../../assets/user.png')}
            />
            <TextInput 
                style = {styles.TextInput}
                placeholder = "Username"
                underlineColorAndroid = { 'transparent' }
            />
            <Image 
                style = {styles.icons2}
                source = {require('../../../assets/password.png')}
            />
            <TextInput 
                style = {styles.TextInput}
                placeholder = "Password"
                secureTextEntry = {true}
                underlineColorAndroid = { 'transparent' }
            />
            <TouchableOpacity style = {styles.Button}>
                <Text style = {styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      backgroundColor: '#ffffff',
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
        marginTop: 402,
        padding: 10,
        zIndex: 1
    },
    icons2: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 475,
        padding: 10,
        zIndex: 1
    },
    icons3: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 252,
        padding: 10,
        zIndex: 1
    },
    icons4: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 326,
        padding: 10,
        zIndex: 1
    },
    Title: {
        textAlign: 'center',
        fontSize: 45,
        fontWeight: '600',
        paddingBottom: 55
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
        padding: 23,
        marginHorizontal: 70,
        marginVertical: 25,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffff',
        paddingBottom: 50,
        marginTop: -14
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