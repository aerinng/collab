import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native";
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';
import firebase from 'firebase';

const DATA = [
    /*{
      id: '1',
      title: 'Fairprice',
      data: "Groceries",
      image: require('../../../../assets/fairprice.jpg'),
      user: "aerin123 - Paya Lebar",
      progress: '76% of $79.00',
      progressIdx: 0.76
    },
    {
      id: '2',
      title: 'Cold Storage',
      data: "Groceries",
      image: require('../../../../assets/coldstorage.jpg'),
      user: "alyssa123 - Paya Lebar",
      progress: '76% of $59.00',
      progressIdx: 0.76
    },*/
  ];

  function Item({ id, title, data, image, user, progress, progressIdx, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[ styles.item ]}
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

const MyOffers = ({navigation}) => {
        /*const [selected, setSelected] = React.useState(null);
        const onSelect = (id) => {
            setSelected(id);
        }
        const [selected2, setSelected2] = React.useState(null);
        const onSelect2 = (id) => {
            setSelected2(id);
        }*/
        const isFocused = useIsFocused();
        const [selected, setSelected] = React.useState(new Map());
        const onSelect = React.useCallback(
          id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));
            setSelected(newSelected);
            DATA.length = 0; //EMPTY THE LIST
          },
          [selected],
        );
        var user = firebase.auth().currentUser; 
        DATA.length = 0;
        //entering in DATA from this logged in user
        firebase.firestore().collection(user.email).get()
        .then(snap => {
            snap.forEach(docs =>{      
                DATA.push(docs.data())//just push the id
            })
        })
        return (
            <SafeAreaView style = {styles.container}>
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
                    />
                    )}
                    keyExtractor={item => item.id}
                    extraData={selected}
                />
            </SafeAreaView>
        )
    
};

export default class MyOffersScreen extends React.Component {
    render() {
        //const {docID} = this.props.route.params;
        return <MyOffers navigation = {this.props.navigation} />;
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1
    },
      item: {
          paddingVertical: 40,
          paddingHorizontal: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          marginTop: 15,
          borderRadius: 15,
          paddingBottom: 15,
          backgroundColor: "#fff"
      },
      searchbar: {
          alignSelf: 'stretch',
          paddingTop: 50,
          paddingBottom: 20,
          paddingHorizontal: 40,
          flex: 1, 
          backgroundColor: "#000000"
      },
      Button: {
          backgroundColor: "#266E7D",
          padding: 10,
          marginHorizontal: 70,
          marginBottom: 33,
          marginTop: 10,
          borderRadius: 10,
      },
      buttonText: {
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '600',
          color: "#26676D"
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
