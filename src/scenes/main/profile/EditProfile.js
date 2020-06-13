import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { List, Divider } from 'react-native-paper';

class EditProfile extends React.Component{
    render(){
        //const {name} = this.props.route.params;
        return (
            <View>
                <ScrollView>
                <Image source = {require('../../../../assets/banner.jpg')} style = {styles.banner}/>
                <View style={styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <Image source = {require('../../../../assets/userMask.png')} style = {styles.userIcon}/>
                    <Text style = {styles.header}> username </Text>
                    <Text style = {styles.fieldName}>Username</Text>
                    <TouchableOpacity>
                        <Text style = {styles.fieldButton}> Change Username </Text>
                    </TouchableOpacity>
                    <Divider />
                    <Text style = {styles.fieldText}>myUsername</Text>
                    <Text style = {styles.fieldName}>Email</Text>
                    <TouchableOpacity>
                        <Text style = {styles.fieldButton}> Update Email </Text>
                    </TouchableOpacity>
                    <Text style = {styles.fieldText}>lorem@gmail.com</Text>
                    <Divider />
                    <Text style = {styles.fieldName}>My Address</Text>
                    <TouchableOpacity>
                        <Text style = {styles.fieldButton}> Update Address </Text>
                    </TouchableOpacity>
                    <Text style = {styles.fieldText}>10 Admiralty Street Northlink Building 757695</Text>
                    <Divider />
                    <TouchableOpacity 
                        style = {styles.item}
                    >
                        <Text style = {styles.detailsTitle}> Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.item}
                    >
                        <Text style = {styles.detailsTitle}>Log Out</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
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
    header: {
        fontSize: 24,
        marginBottom: 18,
        marginTop: 0,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        //position: 'absolute',
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
        marginTop: -20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginLeft: 200,
        position: 'absolute'
    },
    userIcon: {
        width: 150,
        height: 150,
        alignSelf: 'flex-start',
        borderRadius: 50,
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
    fieldButton: {
        color: '#266E7D',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: -5,
        marginBottom: 10
    },
    fieldText: {
        marginTop: -55,
        marginBottom: 30,
        marginLeft: 200,
        fontSize: 18
    },
    item: {
        marginTop: 25,
        marginHorizontal: 70,
        borderRadius: 15,
        backgroundColor: "#C5C5C5",
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        zIndex: 1,
        padding: 15,
        color: "#266E7D"
    },
});
