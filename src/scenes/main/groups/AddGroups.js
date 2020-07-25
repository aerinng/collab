import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// list of all groups
const DATA2 = [
    {
        id: '1',
        name: 'Clothes',
        image: require('../../../../assets/clothes.jpg'),
    },
    {
        id: '2',
        name: 'Groceries',
        image: require('../../../../assets/groceries.jpg'),
    },
    {
        id: '3',
        name: 'Make Up',
        image: require('../../../../assets/makeup.jpg'),
    },
    {
        id: '4',
        name: 'Pet Supplies',
        image: require('../../../../assets/pet.jpg'),
    },
    {
        id: '5',
        name: 'Shoes',
        image: require('../../../../assets/shoes.jpg'),
    },
    {
        id: '6',
        name: 'Stationeries',
        image: require('../../../../assets/stationeries.jpg'),
        },
];

// function of individual group item
function Item({ id, name, image, selected, onSelect, updateCategory, setChosen, setCurr }) {
    return (
        <TouchableOpacity
            onPress={() => {
                // set selection of group to be true/false
                onSelect(id, name);
                console.log("done")
                //setCurr(name)
                //updateCategory(selected, name);
                //},1000)
                // indicate true because user has selected at least 1 group
                setChosen(true);
            }}
        >
            <Text style={[styles.detailsTitle, {opacity: selected ? 0 : 1}]}>{name}</Text>
            <Image source = {image} style = {[styles.icons, {opacity: selected ? 1 : 0.4}]} />
        </TouchableOpacity>
    );
}

const AddGroups = ({navigation, DATA, result}) => {
    // allow the selection of group items
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id, itemName) => {
        setSelected(id);
        setCategory(itemName)
    }

    // to track the categories that the user has chosen in an array
    const [category, setCategory] = React.useState('');

    // to determine if user has selected 1 group
    const [chosen, setChosen] = React.useState(false);

    // set the current chosen category name
    const [itemName, setName] = React.useState('');
    const setCurr = (currName) => {
            setName(currName);
    }

    React.useEffect(() => {}, [category])

   // check if user has already joined a certain category before adding into My Groups
   const checkCategory = (category, navigation, result) => {
       for (var idx = 0; idx < DATA.DATA.length; idx++) {
            if (DATA.DATA[idx].name == category) {
                alert("You have already joined this Group!")
            } else {
                updateCategory(category, navigation, result);
            }
        }
    }

    // update the list of categories under user's My Groups
    const updateCategory = (category, navigation, result) => {
        if (result != null){ 
            var email = result.user.email;
        } else {
            var email = firebase.auth().currentUser.email;
        }
        firebase.firestore()
                .collection('info')
                .doc(email)
                .update({
                    category: firebase.firestore.FieldValue.arrayUnion(category)
                })
                .catch(function(error) {
                    console.log("Error updating document:", error);
                });
        navigation.navigate("GroupsScreen");
    }

    return (
        <SafeAreaView style = {styles.container}>
             <TouchableOpacity  
                style = {styles.backbutton}
                onPress={() => navigation.navigate('GroupsScreen')}
            >
                <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
            </TouchableOpacity>
            <Text style = {styles.header}> Join Groups </Text>
            <Text style = {styles.title}> Choose 1 Group that interests you! </Text>
            <FlatList
                data={DATA2}
                numColumns = {2}
                columnWrapperStyle = {{justifyContent: 'space-around', flex: 1}}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    name={item.name}
                    image = {item.image}
                    //email = {email}
                    selected={item.id == selected}
                    onSelect={onSelect}
                    //updateCategory = {updateCategory}
                    setChosen = {setChosen}
                    setCurr = {setCurr}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
            <TouchableOpacity 
                style = {styles.Button} 
                onPress={() => 
                    chosen 
                    ? checkCategory(category, navigation, result)
                    : alert("Please select 1 Group!")}
            > 
                <Text style = {styles.buttonText}> Done </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default class AddGroupsScreen extends React.Component {
    render() {
        const DATA = this.props.route.params;
        const result = this.props.route.params.result;
        return <AddGroups navigation = {this.props.navigation} DATA = {DATA} result = {result}/>;
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1,
      marginHorizontal: 10,
      marginBottom: 33,
      width: wp('96%')
    },
    header: {
        fontSize: 30,
        marginVertical: 18,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        padding: 5,
        alignContent: 'stretch',
        textAlign: 'center',
        marginBottom: 10
    },
    detailsTitle: {
        marginTop: 65,
        fontSize: 20,
        fontWeight: '500',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
        paddingHorizontal: 15
    },
    icons: {
        width: 170,
        height: 120,
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    Button: {
        backgroundColor: "#266E7D",
        padding: 10,
        marginHorizontal: 70,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffff',
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        marginTop: 15,
        marginBottom: -30,
        marginLeft: 8
    },
});
