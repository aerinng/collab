import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Linking } from "react-native";
import firebase from 'firebase'; 
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

//const DATA = [];

function Item({ id, title, data, image, url, selected, onSelect, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(id);
        navigation.navigate('AddOrder', {Pid:id, title:title, data:data, image:image});
      }}
      style={[
        styles.item
      ]}
    >
      <TouchableOpacity
        style = {{backgroundColor: "#C5C5C5", borderRadius: 15, marginLeft: 255, marginRight: 10, marginTop: -30, padding: 10}}
        onPress={()=>{ Linking.openURL(url)}}
      >
        <Text style = {{color: "#000", fontSize: 15, fontWeight: '600', textAlign: 'center'}}>Website</Text>
      </TouchableOpacity>
      <Text style={styles.detailsTitle}>{title}</Text>
      <Text style={styles.details}>{data}</Text>
      <Image source = {image} style = {styles.icons} />
      <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
    </TouchableOpacity>
  );
}

const StorePromo = ({navigation}) => {
  const [DATA, setDATA] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const onSelect = (id) => {
      setSelected(id);
      //console.log(id);
  }

  // FROM HERE: SEARCH BAR
  const [query, setQuery] = React.useState('');
  const [typingTimeout, setTypingTimeout] = React.useState(0);

  const searched = (text) => {
    setQuery(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
   }

    setTypingTimeout(setTimeout(function() {
        searchFilterFunction(text);
      }, 500))
  }

  const searchFilterFunction = text => {
    const newData = (DATA.filter(function(item) {
      return item.title.indexOf(text) > -1;
    }));
    setDATA(newData);
  };
// UNTIL HERE: SEARCH BAR

  useEffect(() => {
    DATA.length = 0;
    fetchData();
  }, [DATA])

  const fetchData = () => {
    //just for fairprice...
    firebase.firestore().collection('promotion').where("title", "==", 'Fairprice').get()
      .then(snap => { 
          snap.forEach(docs =>{
            firebase.firestore().collection('promotion').doc(docs.id).update({
              image: require('../../../../assets/fairprice.jpg')
            })
            DATA.push(docs.data()) //from firebase
          })
          // console.log("Data", DATA)
      })

    firebase.firestore().collection('promotion').where("title", "==", 'Sephora').get()
    .then(snap => { 
        snap.forEach(docs =>{
          firebase.firestore().collection('promotion').doc(docs.id).update({
            image: require('../../../../assets/sephora.jpg')
          })
          DATA.push(docs.data()) //from firebase
        })
        //console.log("Data", DATA)
    })

    firebase.firestore().collection('promotion').where("title", "==", 'Cold Storage').get()
    .then(snap => { 
        snap.forEach(docs =>{
          firebase.firestore().collection('promotion').doc(docs.id).update({
            image: require('../../../../assets/coldstorage.jpg')
          })
          DATA.push(docs.data()) //from firebase
        })
        // console.log("Data", DATA)
        //console.log(" Data in SP", DATA)
    })
  }
    return (
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity onPress = {() => navigation.navigate('Search')} >
              <Image 
                source = {require('../../../../assets/delete.png')}
                style = {{resizeMode: 'stretch', width: 20, height: 20, marginTop: 25, marginLeft: 20}}
              />
            </TouchableOpacity>
            <Image
              source = {require('../../../../assets/store.png')}
              style = {{marginTop: -25, resizeMode: 'stretch', width: 30, height: 30, alignSelf: 'flex-end', marginRight: 25}}
            />
            <Text 
              style = {{fontSize: 30, fontWeight: '600', marginTop: -32, alignSelf: 'center', borderRadius:15}}
            >
              Store Promotions
            </Text>
            <Searchbar 
              onChangeText={text => {searched(text)}}
              placeholder = "Search Stores"
              style = {{backgroundColor: '#fff', borderRadius: 15, marginHorizontal: 20, marginVertical: 15}}
              value = {query}
            />
            
           <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    title={item.title}
                    data = {item.data}
                    image = {item.image}
                    url = {item.url}
                    selected={item.id == selected}
                    onSelect={onSelect}
                    navigation={navigation}
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

export default class Promo extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
      return <StorePromo navigation = {this.props.navigation} />;
  }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1,
    },
    item: {
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingBottom: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15
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
        marginTop: -10,
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 5,
        paddingRight: 30
    },
    details: {
        marginLeft: 130,
        fontSize: 15,
        paddingRight: 30
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
        marginTop: 60,
        zIndex: 1,
        alignSelf: 'flex-end',
    }
});
