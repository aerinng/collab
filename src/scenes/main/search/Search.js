import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { GorgeousHeader } from "@freakycoder/react-native-header-view";
import * as Progress from 'react-native-progress';
import firebase from 'firebase';

const DATA = [
    {
      id: '1',
      title: 'Fairprice',
      name: 'Fairprice',
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
      name: 'Cold Storage',
      image: require('../../../../assets/coldstorage.jpg'),
      user: "alyssa123 - Paya Lebar",
      progress: '76% of $59.00',
      progressIdx: 0.76
    },
    {
      id: '3',
      title: 'Sephora',
      data: "Make Up",
      image: require('../../../../assets/sephora.jpg'),
      user: "aabattery123 - Paya Lebar",
      progress: "50% of $50.00",
      progressIdx: 0.5
    },
  ];


  // the pictures 
  function Item({ id, title, data, image, user, progress, progressIdx, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[ styles.item, { backgroundColor: selected ? '#77AABA' : '#ffffff' } ]}
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


const Search = ({navigation, searchKey}) => {

    const [selected, setSelected] = React.useState(new Map());
    const onSelect = React.useCallback(
      id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));
        setSelected(newSelected);
      },
      [selected],
    );
    const filteredData = DATA.filter((item)=> {
        return item.title.indexOf(searchKey) >=0
    })
    return (
        <SafeAreaView style = {styles.container}>
            <GorgeousHeader
                title = "Search"
                subtitle = ""
                menuImageSource = {require('../../../../assets/store.png')}
                menuImageOnPress = {() => navigation.navigate('Search')}
                menuImageStyle = {{resizeMode: 'stretch', width: 30, height: 30, marginLeft: 10, marginTop: 10}}
                titleTextStyle = {{fontSize: 30, fontWeight: '600', marginTop: -55, alignSelf: 'center', borderRadius:15}}
                searchBarStyle = {{backgroundColor: '#ffffff', borderRadius: 15, padding: 10}}
                searchInputStyle ={{marginLeft: 30, marginTop: -20}}
                onChangeText={(value) => searchKey= value}
            />
           <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    title={item.title}
                    data = {item.data}
                    image = {item.image}
                    progressIdx = {item.progressIdx}
                    progress = {item.progress}
                    user = {item.user}
                    selected={!!selected.get(item.id)}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
            <TouchableOpacity 
                style = {styles.Button}
                onPress={() =>navigation.navigate('OfferDetails')}
            >
                <Text style = {styles.buttonTexts}> Next </Text>
            </TouchableOpacity>
        </SafeAreaView>  
    )
};

export default class SearchScreen extends React.Component {
        state ={
                err:''
            }
        render(){
            // if (this.props.route.params != null){
                    // const {name} = this.props.route.params
                    var cUser = firebase.auth().currentUser.uid; 
                    firebase.firestore().collection('info').doc(cUser).set({ //rmb to add name
                        promo:'',
                        location:'',
                        category:'',
                        total:'', 
                        date:'',
                        desc:''    
                    }).then(error =>{
                        this.setState({
                            err:''
                        }
                    )})
                    .catch(error =>{
                        this.setState({
                            err:error.message
                        })
                    })
            // }
            return <Search navigation = {this.props.navigation} />; //i think need to put SK property
    
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
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        paddingBottom: 15
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
    Button: {
        backgroundColor: "#266E7D",
        padding: 10,
        marginHorizontal: 70,
        marginBottom: 33,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonTexts: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
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
        resizeMode: 'stretch',
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
