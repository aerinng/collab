import React, {useEffect} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase';
import {  Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useIsFocused } from '@react-navigation/native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  // list of offers under a particular group
  const DATA = [];

  // individual offer item
  function Item({ max, total, id, title, data, image, user, username, progress, progressIdx, selected, onSelect, navigation }) {
    return (
      <TouchableOpacity
        onPress={() => {
            onSelect(id);
            if (user === firebase.auth().currentUser.email) {
                navigation.navigate('OfferDetails', {orderID: id})
            } else {
                navigation.navigate('OfferDetailsJoin', {orderID: id, total: total, max: max})
            }
        }}
        style={[styles.item]}
      >
        <Text style={styles.users}>{username}</Text>
        <Text style={styles.detailsTitle}>{title}</Text>
        <Text style={styles.details}>{data}</Text>
        <Image source = {image} style = {styles.icons} />
        <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
        <Text style = {styles.progressText}>{progress}</Text>
        <Text></Text>
        <ProgressBarAnimated
            borderRadius = {15} 
            width={wp('91%')} height ={30}
            value={(total*100.00)/max}
            backgroundColorOnComplete="#6CC644"
            maxValue= {parseInt(max)}
            onComplete={() => {
            Alert.alert('Minimum Purchase Reached!');}}
        />
      </TouchableOpacity>
    );
  }

const GroupsDetails = ({name, navigation}) => {
    // allow the selection of offers
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id) => {
        setSelected(id);
    }

    //const isFocused = useIsFocused();
    var currName = name;

    //entering in DATA from this logged in user
    useEffect(() => {
        getData();
    }, [DATA])

    // fetch list of offers under a particular category
    const getData = () => {
        //console.log(currName)
        firebase.firestore()
                .collection("offers")
                .where("category", "==", currName)
                .get()
                .then(snap => {
                    DATA.length = 0;
                    snap.forEach(docs =>{      
                        DATA.push(docs.data());
                    })
                })
    }

    return (
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity onPress = {() => navigation.goBack()} >
              <Image 
                source = {require('../../../../assets/arrow.png')}
                style = {{resizeMode: 'stretch', width: 20, height: 20, marginTop: 25, marginLeft: 20}}
              />
            </TouchableOpacity>
            <Text 
              style = {{fontSize: 30, fontWeight: '600', marginTop: -28, marginBottom: 15, alignSelf: 'center', borderRadius:15}}
            >
              {name}
            </Text>
           <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    title={item.title}
                    data = {item.data}
                    image = {item.image}
                    user = {item.user}
                    username = {item.username}
                    selected={item.id == selected}
                    onSelect={onSelect}
                    navigation={navigation}
                    total = {item.total}
                    max = {item.max}     
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </SafeAreaView>  
    )
};

export default class GroupsDetailsScreen extends React.Component {

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

    render(){       
        const {name} = this.props.route.params;
        return <GroupsDetails name = {name} navigation = {this.props.navigation}/>
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
        marginHorizontal: 16,
        borderRadius: 15,
        paddingBottom: 15,
        marginBottom: 20,
        backgroundColor: "#fff"
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