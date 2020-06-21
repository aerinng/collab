import React from 'react';
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

  function Item({ id, name, image, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
      >
        <Text style={[styles.detailsTitle, {opacity: selected ? 0 : 1}]}>{name}</Text>
        <Image source = {image} style = {[styles.icons, {opacity: selected ? 1 : 0.4}]} />
      </TouchableOpacity>
    );
  }
const Preference = ({navigation}) => {
    const [selected, setSelected] = React.useState(new Map());
    const onSelect = React.useCallback(
      id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));
        setSelected(newSelected);
      },
      [selected],
    );
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
                    selected={!!selected.get(item.id)}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
            <TouchableOpacity 
                style = {styles.Button} 
                onPress={() => navigation.navigate('Login')}
            > 
                <Text style = {styles.buttonText}> Done </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default class PrefScreen extends React.Component {
    render() {
        //const {docID} = this.props.route.params;
        return <Preference navigation = {this.props.navigation} />;
    }
}

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
        marginBottom: 20
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
        marginBottom: 180,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffff',
    },
});
