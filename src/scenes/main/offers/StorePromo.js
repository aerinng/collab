// import React from 'react';
// import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native";
// import * as Progress from 'react-native-progress';

// const DATA = [
//     {
//       id: '1',
//       title: 'Fairprice',
//       data: "Groceries",
//       image: require('../../../../assets/fairprice.jpg'),
//       user: "aerin123 - Paya Lebar",
//       progress: '76% of $79.00',
//       progressIdx: 0.76
//     },
//     {
//       id: '2',
//       title: 'Cold Storage',
//       data: "Groceries",
//       image: require('../../../../assets/coldstorage.jpg'),
//       user: "alyssa123 - Paya Lebar",
//       progress: '76% of $59.00',
//       progressIdx: 0.76
//     },
//   ];

//   function Item({ id, title, data, image, user, progress, progressIdx, selected, onSelect }) {
//     return (
//       <TouchableOpacity
//         onPress={() => onSelect(id)}
//         style={[ styles.item ]}
//       >
//         <Text style={styles.users}>{user}</Text>
//         <Text style={styles.detailsTitle}>{title}</Text>
//         <Text style={styles.details}>{data}</Text>
//         <Image source = {image} style = {styles.icons} />
//         <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
//         <Text style = {styles.progressText}>{progress}</Text>
//         <Progress.Bar 
//             progress={progressIdx} width={330} height ={30} borderRadius = {15} 
//             color = '#93D17D' borderColor = '#ffffff' unfilledColor = '#C4C4C4' 
//             style = {{marginTop: 38, alignSelf: 'center'}} />
//       </TouchableOpacity>
//     );
//   }

// const MyOffers = ({navigation}) => {
//         const [selected, setSelected] = React.useState(null);
//         const onSelect = (id) => {
//             setSelected(id);
//         }
//         const [selected2, setSelected2] = React.useState(null);
//         const onSelect2 = (id) => {
//             setSelected2(id);
//         } 
//         console.log("DATA is, ", DATA)
//         return (
//             <SafeAreaView style = {styles.container}>
//                 <FlatList
//                     data={DATA}
//                     renderItem={({ item }) => (
//                     <Item
//                         id={item.id}
//                         title={item.title}
//                         data = {item.data}
//                         image = {item.image}
//                         progressIdx = {item.progressIdx}
//                         progress = {item.progress}
//                         user = {item.user}
//                         selected={item.id == selected}
//                         onSelect={onSelect}
//                     />
//                     )}
//                     keyExtractor={item => item.id}
//                     extraData={selected}
//                 />
//             </SafeAreaView>
//         )
    
// };

// export default class MyOffersScreen extends React.Component {
//     render() {
//         //const {docID} = this.props.route.params;
//         return <MyOffers navigation = {this.props.navigation} />;
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//       alignSelf: 'stretch',
//       padding: 35,
//       flex: 1
//     },
//       item: {
//           paddingVertical: 40,
//           paddingHorizontal: 20,
//           marginVertical: 8,
//           marginHorizontal: 16,
//           marginTop: 15,
//           borderRadius: 15,
//           paddingBottom: 15,
//           backgroundColor: "#fff"
//       },
//       searchbar: {
//           alignSelf: 'stretch',
//           paddingTop: 50,
//           paddingBottom: 20,
//           paddingHorizontal: 40,
//           flex: 1, 
//           backgroundColor: "#000000"
//       },
//       Button: {
//           backgroundColor: "#266E7D",
//           padding: 10,
//           marginHorizontal: 70,
//           marginBottom: 33,
//           marginTop: 10,
//           borderRadius: 10,
//       },
//       buttonText: {
//           textAlign: 'center',
//           fontSize: 20,
//           fontWeight: '600',
//           color: "#26676D"
//       },
//       icons: {
//           position: 'absolute',
//           width: 100,
//           height: 100,
//           marginTop: 15,
//           paddingLeft: 5,
//           borderColor: '#000000',
//           borderWidth: 1,
//           borderRadius: 15,
//           marginLeft: 15
//       },
//       detailsTitle: {
//           marginLeft: 130,
//           marginTop: -7,
//           fontSize: 20,
//           fontWeight: '500',
//           paddingBottom: 5,
//           paddingRight: 30
//       },
//       details: {
//           marginLeft: 130,
//           fontSize: 15,
//           paddingRight: 30,
//           color: '#696B6D'
//       },
//       users: {
//           marginLeft: 130,
//           fontSize: 15,
//           marginTop: -20,
//           color: '#696B6D',
//           paddingBottom: 12
//       },
//       selection: {
//           backgroundColor: '#ffffff',
//           borderRadius: 10,
//           paddingVertical: 40,
//           paddingHorizontal: 10
//       },
//       arrow: {
//           width: 20,
//           height: 20,
//           position: 'absolute',
//           alignSelf: 'flex-end',
//           marginTop: 70,
//           zIndex: 1,
//           paddingRight: 10
//       },
//       progressText: {
//           color: '#ffffff',
//           position: 'absolute',
//           marginTop: 135,
//           zIndex: 1,
//           alignSelf: 'center'
//       }
// });






import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { GorgeousHeader } from "@freakycoder/react-native-header-view";
import firebase from 'firebase'; 

const DATA = [
    // {
    //   id: '1',
    //   title: 'Fairprice',
    //   data: "Free delivery with purchase above $79",
    //   image: require('../../../../assets/fairprice.jpg')
    // },
    // {
    //   id: '2',
    //   title: 'Cold Storage',
    //   data: "Free delivery with purchase above $79",
    //   image: require('../../../../assets/coldstorage.jpg')
    // },
    // {
    //   id: '3',
    //   title: 'Sephora',
    //   data: "Free delivery with purchase above $50",
    //   image: require('../../../../assets/sephora.jpg')
    // },
  ];

  function Item({ id, title, data, image, selected, onSelect, navigation }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(id);
          navigation.navigate('AddOrder',{Pid:id, title:title, data:data, image:image});
        }}
        style={[
          styles.item
        ]}
      >
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
      console.log(id);
  }
  DATA.length = 0;
  
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
        console.log("Data", DATA)
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
        console.log(" Data in SP", DATA)
    })

    
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
                titleTextStyle = {{fontSize: 30, fontWeight: '600', marginTop: -55, alignSelf: 'center', borderRadius:15}}
                searchBarStyle = {{backgroundColor: '#ffffff', borderRadius: 15, padding: 10}}
                searchInputStyle ={{marginLeft: 30, marginTop: -20}}
            />
           <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id} //originally was item.id
                    image = {item.image}
                    title = {item.title}
                    data = {item.data}
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
        paddingVertical: 40,
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