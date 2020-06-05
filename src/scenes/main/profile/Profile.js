import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image} from "react-native";

const Profile = ({navigation}) => {
    return (
        <SafeAreaView style = {styles.container}>
            <Image source = {require('../../../../assets/userMask.png')} style = {styles.userIcon}/>
            <Text style = {styles.header}> username </Text>
            <TouchableOpacity 
                style = {styles.Button}
                onPress={() => navigation.navigate('EditProfile')}
            >
                <Text style = {styles.buttonTexts}> Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style = {styles.item}
                onPress={() => navigation.navigate('MyOffers')}
            >
                <Text style = {styles.detailsTitle}> My Offers</Text>
                <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
            </TouchableOpacity>
            <TouchableOpacity 
                style = {styles.item}
                onPress={() => navigation.navigate('Settings')}
            >
                <Text style = {styles.detailsTitle}> Settings</Text>
                <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default class ProfileScreen extends React.Component {
    render() {
        //const {name} = this.props.route.params;
        return <Profile navigation = {this.props.navigation} />
    }
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
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userIcon: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 50,
        marginTop: 70
    },
    Button: {
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 135,
        marginBottom: 20,
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
        marginBottom: 0,
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
});
