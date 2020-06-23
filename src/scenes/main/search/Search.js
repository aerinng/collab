import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { GorgeousHeader } from "@freakycoder/react-native-header-view";
import * as Progress from 'react-native-progress';
import firebase from 'firebase';
import {  Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useIsFocused } from '@react-navigation/native';

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
    },
    {
      id: '3',
      title: 'Sephora',
      data: "Make Up",
      image: require('../../../../assets/sephora.jpg'),
      user: "aabattery123 - Paya Lebar",
      progress: "50% of $50.00",
      progressIdx: 0.5
    },*/
  ];

  function Item({ id, title, data, image, user, progress, progressIdx, selected, onSelect, navigation }) {
    return (
      <TouchableOpacity
        onPress={() => {
            onSelect(id);
            navigation.navigate('OfferDetails', {docID: id})
        }}
        style={[ styles.item]}
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
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id) => {
        setSelected(id);
    }
    const filteredData = DATA.filter((item)=> {
        return item.title.indexOf(searchKey) >=0
    })

    const isFocused = useIsFocused();
    var user = firebase.auth().currentUser;  
    //Updating the pictures for each title respectively
    firebase.firestore().collection('offers').where("title", "==", 'Sephora')
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          firebase.firestore().collection("offers").doc(doc.id).update({
            image: require('../../../../assets/sephora.jpg')
          })
        });  
    })
    firebase.firestore().collection("offers").where("title", "==", 'Cold Storage')
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          firebase.firestore().collection("offers").doc(doc.id).update({
            image: require('../../../../assets/coldstorage.jpg')
          })
        });  
    })    
    firebase.firestore().collection("offers").where("title", "==", 'Fairprice')
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          firebase.firestore().collection("offers").doc(doc.id).update({
            image: require('../../../../assets/fairprice.jpg')
          })
        });  
    })
    
    //Pushing data from logged in user. 
    console.log("printing out search")
    firebase.firestore().collection("offers").get()
    .then(snap => {
      DATA.length = 0;
        snap.forEach(docs =>{      
            DATA.push(docs.data())
        })
        console.log("Data [search] ", DATA)
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

export default class SearchScreen extends React.Component {
    state = {
        err:'',
        users:null,
        foo:false
    }

    registerForPushNotificationsAsync = async () => {
        var user = await firebase.auth().currentUser;
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
        try {
          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
          try{
            // POST the token to your backend server from where you can retrieve it to send push notifications.
            firebase.firestore().collection('info').doc(user.email).update({
                pushToken:token
            })
          }catch(error){
            console.log("error")
          }
          //Creating a new collection 
          try{
            const {pref} = this.props.route.params.pref; ///from login page 
            firebase.firestore().collection(pref).doc(user.email).set({
              pushToken:token
            })
          }catch(error){
            console.log('error')
          }
        } catch (error) {
          console.log('error');
        }
    };            

    async componentDidMount() {
        await this.registerForPushNotificationsAsync();
    }     

    render(){       

        DATA.length = 0; 
        firebase.firestore().collection('promotion').where("title", "==", 'Fairprice').get()
        .then(snap => { 
            snap.forEach(docs =>{
              firebase.firestore().collection('promotion').doc(docs.id).update({
                image: require('../../../../assets/fairprice.jpg')
              })
            })
        })
    
        firebase.firestore().collection('promotion').where("title", "==", 'Sephora').get()
        .then(snap => { 
            snap.forEach(docs =>{
              firebase.firestore().collection('promotion').doc(docs.id).update({
                image: require('../../../../assets/sephora.jpg')
              })
            })
        })
    
    
        firebase.firestore().collection('promotion').where("title", "==", 'Cold Storage').get()
        .then(snap => { 
            snap.forEach(docs =>{
              firebase.firestore().collection('promotion').doc(docs.id).update({
                image: require('../../../../assets/coldstorage.jpg')
              })
            })
        })
        var user = firebase.auth().currentUser; 
        // console.log("Search: render", user.email)
        if (this.props.route.params != null) { //from login page
            const {email} = this.props.route.params
            const {password} = this.props.route.params
            const {username} = this.props.route.params
            const {name} = this.props.route.params; 
            firebase.firestore().collection('info').doc(user.email).set({ 
                name: name,
                email: email, 
                password: password,
                username:username,
                frequency:'', //for Auto-Post frequency, to be updated eventually
                pushToken:''
            })
        } 
        return <Search navigation = {this.props.navigation} user ={user}/>
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


// import React from 'react';
// import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
// import { GorgeousHeader } from "@freakycoder/react-native-header-view";
// import * as Progress from 'react-native-progress';
// import firebase from 'firebase';
// import {  Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';
// import { useIsFocused } from '@react-navigation/native';


// const DATA = [];
//   // the pictures 
//   function Item({ id, title, data, image, user, progress, progressIdx, selected, onSelect, navigation}) {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//             onSelect(id)
//             // console.log("im selecting, ", id)
//             navigation.navigate('OfferDetails',{orderID:id})
//         }}
//         style={[ styles.item, { backgroundColor: selected ? '#77AABA' : '#ffffff' } ]}
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

// const Search = ({navigation}) => { 
//     const isFocused = useIsFocused();
//     const [selected, setSelected] = React.useState(new Map());
//     const onSelect = React.useCallback(
//       id => {
//         const newSelected = new Map(selected);
//         newSelected.set(id, !selected.get(id));
//         setSelected(newSelected);
//         DATA.length = 0; //EMPTY THE LIST
//       },
//       [selected],
//     );
//     var user = firebase.auth().currentUser;


//     firebase.firestore().collection(user.email).where("title", "==", 'Sephora')
//     .get()
//     .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           firebase.firestore().collection(user.email).doc(doc.id).update({
//             image: require('../../../../assets/sephora.jpg')
//           })
//         });  
//     })
//     firebase.firestore().collection(user.email).where("title", "==", 'Cold Storage')
//     .get()
//     .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           firebase.firestore().collection(user.email).doc(doc.id).update({
//             image: require('../../../../assets/coldstorage.jpg')
//           })
//         });  
//     })    

//     firebase.firestore().collection(user.email).where("title", "==", 'Fairprice')
//     .get()
//     .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           firebase.firestore().collection(user.email).doc(doc.id).update({
//             image: require('../../../../assets/fairprice.jpg')
//           })
//         });  
//     })
//     // switch (docs.data().title) {
//     //   case "Cold Storage":
//     //     firebase.firestore().collection(user.email).doc(docs.data().id).update({
//     //       image: 99
//     //     })
//     //   case "Sephora":
//     //     firebase.firestore().collection(user.email).doc(docs.data().id).update({
//     //       image: require('../../../../assets/sephora.jpg')
//     //     })
//     //   case "Fairprice": 
//     //     firebase.firestore().collection(user.email).doc(docs.data().id).update({
//     //         image: require('../../../../assets/fairprice.jpg')
//     //       })          
//     // }    
//     //get all the ordes from this user. 
//     firebase.firestore().collection(user.email).get()
//     .then(snap => {
//       DATA.length = 0;
//       snap.forEach(docs =>{
//         console.log("the docs data ", docs.data())
//         DATA.push(docs.data())
//         //     console.log("Data [search] ", docs.data())
//         })
//       }


        
//     )
//     return (
//         <SafeAreaView style = {styles.container}>
//             <GorgeousHeader
//                 title = "Search"
//                 subtitle = ""
//                 menuImageSource = {require('../../../../assets/store.png')}
//                 menuImageOnPress = {() => navigation.navigate('Search')}
//                 menuImageStyle = {{resizeMode: 'stretch', width: 30, height: 30, marginLeft: 10, marginTop: 10}}
//                 titleTextStyle = {{fontSize: 30, fontWeight: '600', marginTop: -55, alignSelf: 'center', borderRadius:15}}
//                 searchBarStyle = {{backgroundColor: '#ffffff', borderRadius: 15, padding: 10}}
//                 searchInputStyle ={{marginLeft: 30, marginTop: -20}}
//             />
//            <FlatList
//                 data={DATA} 
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Item
//                             id={item.id} 
//                             title={item.title}
//                             data={item.data}
//                             image= {item.image}
//                             selected={!!selected.get(item.id)}
//                             onSelect={onSelect}
//                             navigation={navigation}
//                         />  
//                 </View>
//                 )
//             }
//                 extraData={selected}
//             />
//         </SafeAreaView>  
//     )
// };

// export default class SearchScreen extends React.Component {
//         state ={
//                 err:'',
//                 users:null,
//                 foo:false
//             }
//             registerForPushNotificationsAsync = async () => {                
//                 var user = await firebase.auth().currentUser;
//                 const { status: existingStatus } = await Permissions.getAsync(
//                   Permissions.NOTIFICATIONS
//                 );
//                 let finalStatus = existingStatus;
//                 // only ask if permissions have not already been determined, because
//                 // iOS won't necessarily prompt the user a second time.
//                 if (existingStatus !== 'granted') {
//                   // Android remote notification permissions are granted during the app
//                   // install, so this will only ask on iOS
//                   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//                   finalStatus = status;
//                 }
            
//                 // Stop here if the user did not grant permissions
//                 if (finalStatus !== 'granted') {
//                   return;
//                 }
            
//                 try {
//                   // Get the token that uniquely identifies this device
//                   let token = await Notifications.getExpoPushTokenAsync();
                  
//                   try{
//                   // POST the token to your backend server from where you can retrieve it to send push notifications.
//                   firebase.firestore().collection('info').doc(user.email).update({
//                     pushToken:token
//                   })
//                   }catch(error){
//                     console.log("error")
//                   }

//                   //Creating a new collection 
//                   try{
//                     const {pref} = this.props.route.params.pref; ///from login page 
//                     firebase.firestore().collection(pref).doc(user.email).set({
//                       pushToken:token
//                     })
//                   }catch(error){
//                     console.log('error')
//                   }

                  
//                 } catch (error) {
//                   console.log('error');
//                 }
//               };            
    
//       async componentDidMount() {
//         console.log("going to register")
//         await this.registerForPushNotificationsAsync();
//       }     

//         render(){  
//           firebase.firestore().collection('promotion').where("title", "==", 'Fairprice').get()
//           .then(snap => { 
//               snap.forEach(docs =>{
//                 firebase.firestore().collection('promotion').doc(docs.id).update({
//                   image: require('../../../../assets/fairprice.jpg')
//                 })
//               })
//               // console.log("Data", DATA)
//           })
      
//           firebase.firestore().collection('promotion').where("title", "==", 'Sephora').get()
//           .then(snap => { 
//               snap.forEach(docs =>{
//                 firebase.firestore().collection('promotion').doc(docs.id).update({
//                   image: require('../../../../assets/sephora.jpg')
//                 })
//               })
//               console.log("Data", DATA)
//           })
      
      
//           firebase.firestore().collection('promotion').where("title", "==", 'Cold Storage').get()
//           .then(snap => { 
//               snap.forEach(docs =>{
//                 firebase.firestore().collection('promotion').doc(docs.id).update({
//                   image: require('../../../../assets/coldstorage.jpg')
//                 })
//               })
//               // console.log("Data", DATA)
//           })                             
//             var user = firebase.auth().currentUser; 
//             // console.log("Search: render", user.email)
//             if (this.props.route.params != null){ //from login page
//                 const {email} = this.props.route.params
//                 const {password} = this.props.route.params
//                 const {username} = this.props.route.params
//                 const {name} = this.props.route.params; 
//                     firebase.firestore().collection('info').doc(user.email).set({ 
//                         name: name,
//                         email: email, 
//                         password: password,
//                         username:username,
//                         frequency:'', //for Auto-Post frequency, to be updated eventually
//                         pushToken:''
//                     })
//             } 
//             return <Search navigation = {this.props.navigation} user ={user}/>
            
    
//         }
// }

// const styles = StyleSheet.create({
//     container: {
//       alignSelf: 'stretch',
//       padding: 35,
//       flex: 1,
//     },
//     item: {
//         paddingVertical: 40,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         borderRadius: 15,
//         paddingBottom: 15
//     },
//     backbutton: {
//         marginLeft: 11,
//         padding: 0,
//         marginTop: 32,
//         zIndex: 1,
//         width: 20,
//         height: 20,
//         resizeMode: 'stretch',
//     },
//     searchbar: {
//         alignSelf: 'stretch',
//         paddingTop: 50,
//         paddingBottom: 20,
//         paddingHorizontal: 40,
//         flex: 1, 
//         backgroundColor: "#000000"
//     },
//     Button: {
//         backgroundColor: "#266E7D",
//         padding: 10,
//         marginHorizontal: 70,
//         marginBottom: 33,
//         marginTop: 10,
//         borderRadius: 10,
//     },
//     buttonTexts: {
//         textAlign: 'center',
//         fontSize: 20,
//         fontWeight: '600',
//         color: '#ffffff',
//     },
//     icons: {
//         position: 'absolute',
//         width: 100,
//         height: 100,
//         marginTop: 15,
//         paddingLeft: 5,
//         borderColor: '#000000',
//         borderWidth: 1,
//         borderRadius: 15,
//         marginLeft: 15
//     },
//     detailsTitle: {
//         marginLeft: 130,
//         marginTop: -7,
//         fontSize: 20,
//         fontWeight: '500',
//         paddingBottom: 5,
//         paddingRight: 30
//     },
//     details: {
//         marginLeft: 130,
//         fontSize: 15,
//         paddingRight: 30,
//         color: '#696B6D'
//     },
//     users: {
//         marginLeft: 130,
//         fontSize: 15,
//         marginTop: -20,
//         color: '#696B6D',
//         paddingBottom: 12
//     },
//     selection: {
//         backgroundColor: '#ffffff',
//         borderRadius: 10,
//         paddingVertical: 40,
//         paddingHorizontal: 10
//     },
//     arrow: {
//         resizeMode: 'stretch',
//         width: 20,
//         height: 20,
//         position: 'absolute',
//         alignSelf: 'flex-end',
//         marginTop: 70,
//         zIndex: 1,
//         paddingRight: 10
//     },
//     progressText: {
//         color: '#ffffff',
//         position: 'absolute',
//         marginTop: 135,
//         zIndex: 1,
//         alignSelf: 'center'
//     }
// });
