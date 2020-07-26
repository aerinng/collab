import React, {useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

  // list of offers data
  const DATA = [];

  // individual offer item
  function Item({ id, title, data, image, user, username, progress, progressIdx, selected, onSelect, navigation, max, total }) {
    return (
      <TouchableOpacity
        onPress={() => {
            onSelect(id);
            navigation.navigate('OfferDetailsCancel', {orderID: id, max: max, total:total})
        }}
        style={[ styles.item ]}
      >
        <Text style={styles.users}>{username}</Text>
        <Text style={styles.detailsTitle}>{title}</Text>
        <Text style={styles.details}>{data}</Text>
        <Image source = {image} style = {styles.icons} />
        <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
        <Text style = {styles.progressText}>{progress}</Text>
       <ProgressBarAnimated
          borderRadius = {15} 
          style = {{marginTop: 38, alignSelf: 'center'}}
          width={330} height ={30}
          value={(total*100.00)/max} //need to make this value dynamic...
          backgroundColorOnComplete="#6CC644"
          maxValue= {parseInt(max)}
          onComplete={() => {
            Alert.alert('Minimum Purchase Reached!');}}
          />            
      </TouchableOpacity>
    );
  }

const MyOffers = ({navigation, result}) => {
        const isFocused = useIsFocused();

        // allow the selection of offers
        const [selected, setSelected] = React.useState(null);
        const onSelect = id => {
            setSelected(id);
        };

        if (result != null){
            var user = result.user.email; 
        } else {
            var user = firebase.auth().currentUser.email;
        }       
 
        //entering in DATA from this logged in user
        useEffect(() => {
            getData()
        },[]);

        // fetching user's offers data from Cloud Firestore database
        const getData = () => {
            firebase.firestore()
                    .collection("offers")
                    .where("user", "==", user)
                    .get()
                    .then(snap => {
                        snap.forEach(docs =>{      
                            DATA.push(docs.data())
                        })
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });

        }
        
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
                        user = {item.user}
                        username = {item.username}
                        selected={item.id == selected}
                        onSelect={onSelect}
                        navigation = {navigation}
                        max = {item.max}
                        total = {item.total}
                    />
                    )}
                    keyExtractor={item => item.id}
                    extraData={selected}
                />
            </SafeAreaView>
        )
};
export default class MyOffersScreen extends React.Component {
    
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
        return <MyOffers navigation = {this.props.navigation} result ={this.props.route.params.result}/>;
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