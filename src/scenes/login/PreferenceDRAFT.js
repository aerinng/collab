import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, ScrollView, SafeAreaView, Image, FlatList, TouchableOpacity } from "react-native";

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

function Item({ id, name, image, email, selected, onSelect, updateCategory, setChosen, setID}) {
    return (
        <TouchableOpacity
            onPress={() => {
                // set selection of group to be true/false
                //onSelect(id);
                setID(id)
                console.log("done")
                updateCategory(selected, name);
                updateCategory(selected, name);
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

export default class Preference extends React.Component {
    email = 'sdf@mail.com'
    component(props) {
        this.state = {
            selected: new Map(),
            category: [],
            chosen: false,
            id: ''
        };
    }
    // to track the selection of groups

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.selected !== nextProps.selected) {
            const temp = this.state.selected;
            const newSelected = new Map(temp);
            newSelected.set(this.state.id, !temp.get(this.state.id));
            this.setState({selected: newSelected});
        }
    }

    setID = (id) => {
        this.setState({id: id})
    }

    setChosen = () => {
        this.setState({chosen: true})
    }

    updateCategory = (bool, name) => {
        // include category inside array
        let array = [...this.state.category];
        if (!bool) {
            this.setState({category: array});
        } else { // remove category from array
            array.splice(array.length - 1, 1);
            this.setState({category: array});
        }
        console.log(bool)
        console.log("testing: " + name)
        console.log(this.state.category)
        // update to firebase
        firebase.firestore()
                .collection('info')
                .doc(email)
                .update({
                    category: category
                })
                .catch(function(error) {
                    console.log("Error updating document:", error);
                });
    }
render() {
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.header}> Discover Groups </Text>
            <Text style = {styles.title}> Choose at least 1 Group that interests you! </Text>
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
                    selected={!!this.state.selected.get(item.id)}
                    onSelect={onSelect}
                    updateCategory = {updateCategory}
                    setChosen = {setChosen}
                    setID = {setID}
                />
                )}
                keyExtractor={item => item.id}
                extraData={this.state.selected}
            />
            <TouchableOpacity 
                style = {styles.Button} 
                onPress={() => 
                    chosen 
                    ? this.props.navigation.navigate('Login') 
                    : alert("Please select at least 1 Group!")}
            > 
                <Text style = {styles.buttonText}> Done </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
                }
};

/*export default class PrefScreen extends React.Component {
 
    render() {
        //const {email} = this.props.route.params;
        const email = 'sdf@mail.com'
        return <Preference navigation = {this.props.navigation} email = {email} />;
    }
}*/

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1,
      marginHorizontal: 10,
      marginBottom: 33
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
