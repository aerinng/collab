import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image} from "react-native";
import firebase from 'firebase';
import { useIsFocused } from '@react-navigation/native';

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

    onSignOut = () => {
        firebase.auth().signOut().then(function() {
            alert("You have signed out successfully.");
        }).catch(function(error) {
            alert(error.message);
        })
        this.props.navigation.navigate('Login');
    }

    getData = () => {
        var user = firebase.auth().currentUser;
        var document = firebase.firestore().collection('info').doc(user.email);
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

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        const isFocused = this.props;
        if (this.props.userAvatar !== prevProps.userAvatar && isFocused) {
            this.getData();
        }
      }

    componentWillUnmount() {
        var unsubscribe = this.state.unsubscribe;
        unsubscribe;
    }

    focusChange = () => {
        const isFocused = this.props;
        if (isFocused) {
            this.getData();
        }
    }

    render() {
        const isFocused = this.props;
        return (
            <SafeAreaView style = {styles.container}>
                <Image source = {{uri: this.state.userAvatar}} style = {styles.userIcon}/>
                <Image source = {require('../../../../assets/userMask.png')} style = {{width: 150, height: 150, alignSelf: 'center',
                borderRadius: 100, marginTop: -140, opacity: this.state.imageChosen ? 0 : 1}}/>
                <Text style = {styles.header}>{ this.state.username }</Text>
                <TouchableOpacity 
                    style = {styles.Button}
                    onPress={() => this.props.navigation.navigate('EditProfile')}
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
                    style = {styles.itemNew}
                    onPress = {() => this.props.navigation.navigate('ChangePassword')}
                >
                    <Text style = {styles.detailsTitleNew}> Change Password</Text>
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
    const isFocused = useIsFocused();
  
    return <Profile {...props} isFocused={isFocused} />;
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
        marginTop: 20
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
        backgroundColor: "#fff"
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
