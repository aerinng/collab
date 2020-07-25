import React from 'react';
import { StyleSheet, Text, ScrollView,  Image, FlatList, TouchableOpacity, Button } from "react-native";
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  // list of user's My Groups
  const DATA = [];

  // list of all groups
  const DATAdiscover = [
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

  // function for individual group item
  function Item({ id, name, image, selected, onSelect, navigation }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(id);
          navigation.navigate('GroupsDetails', {name: name});
        }}
      >
        <Text style={styles.detailsTitle}>{name}</Text>
        <Image source = {image} style = {styles.icons} />
      </TouchableOpacity>
    );
  }

  const Groups = ({navigation, result}) => {
    // allow the selection of groups
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id) => {
        setSelected(id);
    }
    
    // allow the choosing of categories
    const [categories, setCategories] = React.useState([]);

    // fetch the list of categories under user's My Groups
    React.useEffect(() => {
      if (result != null){
        var user = result.user.email; 
      } else {
        var user = firebase.auth().currentUser.email;
      }    
      firebase.firestore()
            .collection("info")
            .doc(user)
            .get()
            .then(snap => {
              DATA.length = 0;
              var cat = snap.data().category; 
              for (var idx = 0; idx < cat.length; idx++) {
                var catName = cat[idx];
                var img = '';  
                if (catName == 'Clothes') {
                  img = require('../../../../assets/clothes.jpg')
                } else if (catName == 'Groceries') {
                  img = require('../../../../assets/groceries.jpg')
                } else if (catName == "Make Up") {
                  img = require('../../../../assets/makeup.jpg')
                } else if (catName == "Pet Supplies") {
                  img = require('../../../../assets/pet.jpg')
                } else if (catName == "Shoes") {
                  img = require('../../../../assets/shoes.jpg')
                } else {
                  img = require('../../../../assets/stationeries.jpg')
                }
                DATA.push({
                  name: catName,
                  image: img
                })
              }
            })
            .catch(err => {
              console.log(err);
          })
    }, [DATA]);

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.header}> Groups </Text>
            <TouchableOpacity
              style = {{alignSelf: "flex-end", marginRight: 10, 
              backgroundColor: "#266E7D", paddingHorizontal: 15, 
              paddingVertical: 5, borderRadius: 10, marginBottom: -40,
              zIndex: 1}}
              onPress = {() => navigation.navigate("AddGroups", {DATA: DATA, result: result})}
            >
              <Text style = {{fontSize: 18, fontWeight: '600', color: "#fff"}}> Join </Text>
            </TouchableOpacity>
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
                    navigation = {navigation}
                    selected={item.id == selected}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
                getItemLayout={(data, index) => (
                  {length: 40, offset: 40 * index, index}
                )}
            />
            <Text style = {styles.title}> All Groups </Text>
            <FlatList
                data={DATAdiscover}
                numColumns = {2}
                columnWrapperStyle = {{justifyContent: 'space-around', flex: 1}}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    name={item.name}
                    image = {item.image}
                    navigation = {navigation}
                    selected={item.id == selected}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
                // optimisation, length number is a random number,
                // doesn't seem to affect anything
                getItemLayout={(data, index) => (
                  {length: 15, offset: 15 * index, index}
                )}
            />
        </SafeAreaView>
    )
};

export default class GroupsScreen extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  componentDidUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        return true;
      }
      return false;
  }

    render() {
        return <Groups navigation = {this.props.navigation} result ={this.props.route.params.result} />;
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
        fontSize: 24,
        fontWeight: '600',
        padding: 5,
        alignContent: 'stretch',
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
