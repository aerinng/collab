import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image} from "react-native";
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Analytics from 'expo-firebase-analytics';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAvatar: 'null',
            imageChosen: false,
            unsubscribe: '',
            username: '',
        };
    }

    // allow user to sign out of Collab
    onSignOut = () => {
        firebase.auth().signOut().then(function() {
            alert("You have signed out successfully.");
        }).catch(function(error) {
            alert(error.message);
        })
        this.props.navigation.navigate('Login');
    }

    // fetch profile data from Cloud Firestore database
    getData = () => {
        if (this.props.route.params.result != null){
            const {result} = this.props.route.params;
            var user = result.user.email; 
         } else {
            var user = firebase.auth().currentUser.email;
         }

        var document = firebase.firestore().collection('info').doc(user);
        this.state.unsubscribe = document.get().then((doc) => {
            var data = doc.data();
            this.setState({userAvatar: data.avatar});
            this.setState({username: data.username});
            if (this.state.userAvatar !== 'null') {
                this.setState({imageChosen: true})
            } else {
                this.setState({imageChosen: false})
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    // add into analytics
    logsEvent = async () => { 
        await Analytics.logEvent('EditProfileAttempt', {
            name: 'editprofileattempt',
            screen: 'profile',
            purpose: 'Clicked on Edit profile',
          });
    }

    // fetch profile data from Cloud Firestore database upon renders
    componentDidMount() {
        this.getData();
    }

    // re-render if user's avatar changed
    componentDidUpdate(prevProps, prevState) {
        if (this.state.userAvatar !== prevState.userAvatar ||
            this.props !== prevProps) {
            this.getData();
        }
      }

    // unsubscribe from fetching data from database
    componentWillUnmount() {
        var unsubscribe = this.state.unsubscribe;
        unsubscribe;
    }

    render() {
        //NEW CODES: to see if user is:
        //Google login OR Collab login
        if (this.props.route.params.result != null){
            const {result} = this.props.route.params;
            var user = result.user.email; 
        } else {
            var user = firebase.auth().currentUser.email;
        }
        const result = this.props.route.params.result;
        return (
            <SafeAreaView style = {styles.container}>
                <Image source = {{uri: this.state.userAvatar}} style = {styles.userIcon}/>
                <Image source = {require('../../../../assets/userMask.png')} style = {{width: 150, height: 150, alignSelf: 'center',
                borderRadius: 100, marginTop: -150, opacity: this.state.imageChosen ? 0 : 1}}/>
                <Text style = {styles.header}>{ this.state.username }</Text>
                <TouchableOpacity 
                    style = {styles.Button}
                    onPress={() => {
                        this.logsEvent();
                        this.props.navigation.navigate('EditProfile', {user: user, result: result});
                    }}
                >
                    <Text style = {styles.buttonTexts}> Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.item}
                    onPress={() => this.props.navigation.navigate('MyOffers')}
                >
                    <Text style = {styles.detailsTitle}> My Offers</Text>
                    <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.item}
                    onPress={() => this.props.navigation.navigate('Settings')}
                >
                    <Text style = {styles.detailsTitle}> Settings</Text>
                    <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {[styles.itemNew, {opacity: this.props.route.params.result != null ? 0 : 1}]}
                    onPress = {() => {
                        if (this.props.route.params.result == null) {
                            this.props.navigation.navigate('ChangePassword')
                        }
                    }}
                >
                    <Text style = {[styles.detailsTitleNew, {opacity: this.props.route.params.result != null ? 0 : 1}]}> Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.itemNew2}
                    onPress = {this.onSignOut}
                >
                    <Text style = {styles.detailsTitleNew2}>Log Out</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
};

export default function(props) {
    return <Profile {... props} />;
  }

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1,
    },
    header: {
        fontSize: 35,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userIcon: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 100,
        marginTop: 20,
        backgroundColor: "#266E7D"
    },
    Button: {
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 135,
        marginBottom: 10,
        borderRadius: 10,
    },
    buttonTexts: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    item: {
        marginVertical: 10,
        marginHorizontal: 40,
        borderRadius: 15,
        backgroundColor: "#fff",
    },
    detailsTitle: {
        fontSize: 25,
        fontWeight: '600',
        justifyContent: 'center',
        zIndex: 1,
        padding: 25
    },
    arrow: {
        width: 20,
        height: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 32,
        zIndex: 1,
    },
    itemNew: {
        marginTop: 15,
        marginLeft: 40,
        borderRadius: 15,
        backgroundColor: "#fff",
        alignSelf: 'flex-start'
    },
    detailsTitleNew: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        zIndex: 1,
        padding: 10,
        paddingVertical: 15,
        color: "#266E7D"
    },
    itemNew2: {
        marginTop: -51,
        marginRight: 40,
        borderRadius: 15,
        backgroundColor: "#fff",
        alignSelf: 'flex-end'
    },
    detailsTitleNew2: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        zIndex: 1,
        padding: 15,
        paddingHorizontal: 20,
        color: "#266E7D"
    },
});
