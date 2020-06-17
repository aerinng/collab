import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList, Linking } from "react-native";
import { GorgeousHeader } from "@freakycoder/react-native-header-view";

const DATA = [
    {
      id: '1',
      title: 'Fairprice',
      data: "Free delivery with purchase above $79",
      image: require('../../../../assets/fairprice.jpg'),
      url: 'https://www.fairprice.com.sg/promotions'
    },
    {
      id: '2',
      title: 'Cold Storage',
      data: "Free delivery with purchase above $79",
      image: require('../../../../assets/coldstorage.jpg'),
      url: 'https://coldstorage.com.sg/deals/'
    },
    {
      id: '3',
      title: 'Sephora',
      data: "Free delivery with purchase above $50",
      image: require('../../../../assets/sephora.jpg'),
      url: 'https://www.sephora.sg/sale'
    },
  ];

  function Item({ id, title, data, image, url, selected, onSelect, navigation }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(id);
          navigation.navigate('AddOrder', {data:data, title:title, Pid:id});
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
  const [selected, setSelected] = React.useState(null);
  const onSelect = (id) => {
      setSelected(id);
  }
    return (
        <SafeAreaView style = {styles.container}>
            <GorgeousHeader
                title = "Store Promotions"
                subtitle = ""
                menuImageSource = {require('../../../../assets/delete.png')}
                menuImageOnPress = {() => navigation.navigate('Search')}
                menuImageStyle = {{resizeMode: 'stretch', width: 20, height: 20}}
                profileImageSource = {require('../../../../assets/store.png')}
                profileImageStyle = {{marginTop: -5, resizeMode: 'stretch', width: 30, height: 30}}
                // profileImageOnPress = {() => navigation.navigate('Search')} // TO BE changeDDDDDD!!
                titleTextStyle = {{fontSize: 30, fontWeight: '600', marginTop: -55, alignSelf: 'center', borderRadius:15}}
                searchBarStyle = {{backgroundColor: '#ffffff', borderRadius: 15, padding: 10}}
                searchInputStyle ={{marginLeft: 30, marginTop: -20}}
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
            />
        </SafeAreaView>  
    )
};

export default class Promo extends React.Component {
  render() {
      //const {docID} = this.props.route.params;
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
