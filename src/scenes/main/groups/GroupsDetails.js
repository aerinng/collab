import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { GorgeousHeader } from "@freakycoder/react-native-header-view";
import * as Progress from 'react-native-progress';
import firebase from 'firebase';
import {  Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useIsFocused } from '@react-navigation/native';

const DATA = [];

  function Item({ id, title, data, image, user, progress, progressIdx, selected, onSelect, navigation }) {
    return (
      <TouchableOpacity
        onPress={() => {
            onSelect(id);
            navigation.navigate('OfferDetails', {orderID: id})
        }}
        style={[styles.item]}
      >
        <Text style={styles.users}>{user}</Text>
        <Text style={styles.detailsTitle}>{title}</Text>
        <Text style={styles.details}>{data}</Text>
        <Image source = {image} style = {styles.icons} />
        <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
        <Text style = {styles.progressText}>{progress}</Text>
        <Progress.Bar 
            progress={progressIdx} width={330} height ={30} borderRadius = {15} 
            color = '#93D17D' borderColor = '#ffffff' unfilledColor = '#C4C4C4' 
            style = {{marginTop: 38, alignSelf: 'center'}} />
      </TouchableOpacity>
    );
  }

const GroupsDetails = ({name, navigation}) => {
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id) => {
        setSelected(id);
    }
    /*const filteredData = DATA.filter((item)=> {
        return item.title.indexOf(searchKey) >=0
    })*/

    const isFocused = useIsFocused();

    var user = firebase.auth().currentUser;
    var currName = name;
    //entering in DATA from this logged in user
    firebase.firestore()
            .collection("offers")
            .where("category", "==", currName)
            .get()
            .then(snap => {
                DATA.length = 0;
                snap.forEach(docs =>{      
                    DATA.push(docs.data())
                })
                console.log("Data [search] ", DATA)
            })
    return (
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity onPress = {() => navigation.goBack()} >
              <Image 
                source = {require('../../../../assets/arrow.png')}
                style = {{resizeMode: 'stretch', width: 20, height: 20, marginTop: 25, marginLeft: 20}}
              />
            </TouchableOpacity>
            <Text 
              style = {{fontSize: 30, fontWeight: '600', marginTop: -28, marginBottom: 15, alignSelf: 'center', borderRadius:15}}
            >
              {name}
            </Text>
           <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    title={item.title}
                    data = {item.data}
                    image = {item.image}
                    //progressIdx = {item.progressIdx}
                    //progress = {item.progress}
                    //user = {item.user}
                    selected={item.id == selected}
                    onSelect={onSelect}
                    navigation={navigation}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </SafeAreaView>  
    )
};

export default class GroupsDetailsScreen extends React.Component {
    render(){       
        var user = firebase.auth().currentUser; 
        const {name} = this.props.route.params;
        return <GroupsDetails name = {name} navigation = {this.props.navigation}/>
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1,
    },
    item: {
        paddingVertical: 40,
        marginHorizontal: 16,
        borderRadius: 15,
        paddingBottom: 15,
        marginBottom: 20,
        backgroundColor: "#fff"
    },
    backbutton: {
        marginLeft: 11,
        padding: 0,
        marginTop: 32,
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
    searchbar: {
        alignSelf: 'stretch',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 40,
        flex: 1, 
        backgroundColor: "#000000"
    },
    icons: {
        position: 'absolute',
        width: 100,
        height: 100,
        marginTop: 15,
        paddingLeft: 5,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 15,
        marginLeft: 15
    },
    detailsTitle: {
        marginLeft: 130,
        marginTop: -7,
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 5,
        paddingRight: 30
    },
    details: {
        marginLeft: 130,
        fontSize: 15,
        paddingRight: 30,
        color: '#696B6D'
    },
    users: {
        marginLeft: 130,
        fontSize: 15,
        marginTop: -20,
        color: '#696B6D',
        paddingBottom: 12
    },
    selection: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 40,
        paddingHorizontal: 10
    },
    arrow: {
        width: 20,
        height: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 70,
        zIndex: 1,
        paddingRight: 10
    },
    progressText: {
        color: '#ffffff',
        position: 'absolute',
        marginTop: 135,
        zIndex: 1,
        alignSelf: 'center'
    }
});