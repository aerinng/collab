import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DATA = [
    {
        id: '1',
        name: 'Clothes',
        image: require('../../../assets/clothes.jpg'),
    },
    {
        id: '2',
        name: 'Groceries',
        image: require('../../../assets/groceries.jpg'),
    },
    {
        id: '3',
        name: 'Make Up',
        image: require('../../../assets/makeup.jpg'),
    },
    {
        id: '4',
        name: 'Pet Supplies',
        image: require('../../../assets/pet.jpg'),
    },
    {
        id: '5',
        name: 'Shoes',
        image: require('../../../assets/shoes.jpg'),
    },
    {
        id: '6',
        name: 'Stationeries',
        image: require('../../../assets/stationeries.jpg'),
        },
];

function Item({ id, name, image, email, selected, onSelect, updateCategory, setChosen, setCurr }) {
    return (
        <TouchableOpacity
            onPress={() => {
                // set selection of group to be true/false
                onSelect(id, name);
                console.log("done")
                // indicate true because user has selected at least 1 group
                setChosen(true);
            }}
        >
            <Text style={[styles.detailsTitle, {opacity: selected ? 0 : 1}]}>{name}</Text>
            <Image source = {image} style = {[styles.icons, {opacity: selected ? 1 : 0.4}]} />
        </TouchableOpacity>
    );
}

const Preference = ({navigation, email, name, username}) => {
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id, itemName) => {
        setSelected(id);
        setCategory(itemName)
    }

    // to track the categories that the user has chosen in an array
    const [category, setCategory] = React.useState('');

    // to determine if user has selected at least 1 group
    const [chosen, setChosen] = React.useState(false);

    //const [bool, setBool] = React.useState(false);
    const [itemName, setName] = React.useState('');

   const setCurr = (currName) => {
        setName(currName);
   }

    React.useEffect(() => {
    }, [category])


    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.header}> Discover Groups </Text>
            <Text style = {styles.title}> Choose 1 Group that interests you! </Text>
            <FlatList
                data={DATA}
                numColumns = {2}
                columnWrapperStyle = {{justifyContent: 'space-around', flex: 1}}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    name={item.name}
                    image = {item.image}
                    email = {email}
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
                    ? navigation.navigate('Login', {category: category, email: email, name: name, username: username}) 
                    : alert("Please select 1 Group!")}
            > 
                <Text style = {styles.buttonText}> Done </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default class PrefScreen extends React.Component {
    render() {
        // from Sign Up page
        const {email} = this.props.route.params
        const {name} = this.props.route.params
        const {username} = this.props.route.params
        const {password} = this.props.route.params
        return <Preference navigation = {this.props.navigation} email = {email} 
                name ={name} password = {password} username = {username}
               />;
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
});
