import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, Image, FlatList, TouchableOpacity } from "react-native";

const DATA = [
    {
      id: '1',
      name: 'Groceries',
      image: require('../../../../assets/groceries.jpg'),
    },
    {
      id: '2',
      name: 'Stationeries',
      image: require('../../../../assets/stationeries.jpg'),
    },
  ];

  const DATAdiscover = [
    {
      id: '1',
      name: 'Clothes',
      image: require('../../../../assets/clothes.jpg'),
    },
    {
        id: '2',
        name: 'Make Up',
        image: require('../../../../assets/makeup.jpg'),
      },
      {
        id: '3',
        name: 'Pet Supplies',
        image: require('../../../../assets/pet.jpg'),
      },
      {
        id: '3',
        name: 'Shoes',
        image: require('../../../../assets/shoes.jpg'),
      },
  ];

  function Item({ id, name, image, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
      >
        <Text style={styles.detailsTitle}>{name}</Text>
        <Image source = {image} style = {styles.icons} />
      </TouchableOpacity>
    );
  }
  const Groups = ({navigation}) => {
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id) => {
        setSelected(id);
    }
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.header}> Groups </Text>
            <Text style = {styles.title}> My Groups </Text>
            <FlatList
                data={DATA}
                numColumns = {2}
                columnWrapperStyle = {{justifyContent: 'space-around', flex: 1}}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    name={item.name}
                    image = {item.image}
                    selected={item.id == selected}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
            <Text style = {styles.title}> Discover Groups </Text>
            <FlatList
                data={DATAdiscover}
                numColumns = {2}
                columnWrapperStyle = {{justifyContent: 'space-around', flex: 1}}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    name={item.name}
                    image = {item.image}
                    selected={item.id == selected}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </SafeAreaView>
    )
};

export default class GroupsScreen extends React.Component {
    render() {
        // const {docID} = this.props.route.params;
        return <Groups navigation = {this.props.navigation} />;
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
        fontSize: 24,
        fontWeight: '600',
        padding: 5,
        alignContent: 'stretch'
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
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 10,
        opacity: 0.4,
    },
});