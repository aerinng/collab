import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView} from "react-native";
import firebase from 'firebase';

export default class ForgetPassword extends React.Component {
    state = {
        textInputPassword: ''
    }

    setPassword = (password) => {
        this.setState({textInputPassword: password});
    }

    changePassword = () => {
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(this.state.textInputPassword).then(function() {
        // Email sent.
            console.log("sent");
        }).catch(function(error) {
        // An error happened.
            console.log(error);
        });
    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView style = {styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source = {require('../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <Text style = {styles.header}>Forget Password</Text>
                    <Text
                        style = {{fontSize: 17, fontWeight: '500', paddingVertical: 15}}
                    >
                        Email
                    </Text>
                    <TextInput 
                        style = {styles.textInput}
                        onChangeText={textInput => this.setPassword(textInput)}
                        autoCapitalize = 'none'
                    />
                    <TouchableOpacity 
                        style = {styles.item}
                        onPress = {() => {
                            this.changePassword();
                            alert('A password reset email will be sent to you!')
                            this.props.navigation.goBack();
                        }}
                    >
                        <Text style = {styles.detailsTitle}>Reset Password</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    scrollView: {
        padding: 30,
        marginVertical: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 18,
        marginTop: -23,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
    textInput: {
        borderColor: "#FFF",
        borderWidth: 1,
        padding: 13,
        borderRadius: 15,
        backgroundColor: "#FFF"
    },
    item: {
        marginTop: 50,
        marginHorizontal: 60,
        borderRadius: 15,
        backgroundColor: "#266E7D"
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: "#fff",
        textAlign: 'center',
        zIndex: 1,
        padding: 15
    },
})