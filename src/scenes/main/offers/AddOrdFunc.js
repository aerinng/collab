import firebase from 'firebase';
import {useEffect} from 'react'; 
import moment from 'moment';

export function stimulateOrder(docID,user){
  //Check if settings is a Weekly, biweekly etc
  firebase.firestore()
          .collection("info")
          .doc(user)
          .get()
          .then(querySnapshot => {
                switch(querySnapshot.data().frequency){
                  case "Daily": 
                    daily(docID,user);
                  case "Weekly": 
                    daily(docID,user);
                  case "Biweekly": 
                    daily(docID,user);
                  case "Monthly": 
                    daily(docID,user);
                } 
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
}

export function daily(docID,user) {
    var data=''
    var title=''
    var total=''
    var category=''
    var date=''
    var desc=''
    var id=''
    var location = ''
    var category = ''
    const scheduledDate = moment().add(1,'days')
    const diffTime = scheduledDate.diff(moment()) 
    // replicating the offer
    const timeoutId = setTimeout(() => {
      //getting the data from this database 
      firebase.firestore()
              .collection("offers")
              .doc(docID)
              .get()
              .then(querysnap => {
                var documentData = querysnap.data();
                data = documentData.data;
                title = documentData.title;
                total = documentData.total;
                location = documentData.location;
                category = documentData.category;
                date = documentData.date; 
                desc = documentData.desc;
                id = documentData.id;
                category = documentData.category; 
                
                firebase.firestore().collection("offers").add({
                  user: user,
                  userJoined: [],          
                  data:data,
                  title:title,
                  location:location,
                  total:total, 
                  category:category, 
                  date:date, //remember it's date + 7 
                  desc:desc,
                  id:''
              })
              .then((snapshot) =>
                snapshot.update({
                  id:snapshot.id
               }))
              .catch(
                console.log("Error getting documents")
              )

      firebase.firestore()
              .collection("info")
              .where("category", "==", category)
              .get()
              .then(snapshot =>{        
                snapshot.forEach(element => {
                  // console.log("category is", element.data().category)
                  console.log("push notifcation pushed")
                    const response = fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Accept-encoding': 'gzip, deflate',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      to: element.data().pushToken,//this one needa change
                      sound: 'default',
                      title: 'Order Added!',
                      body: 'Buyer has re-sent another offer to buy request!',
                      _displayInForeground: true,
                    })
                  });
                })
              })
              }).catch(function(error) {
                    console.log("Error getting documents: ", error);
              })}, diffTime);   //can change diffTime to 10000 to test 
}


// function for weekly settings
export function weekly() {
  var data=''
  var title=''
  var total=''
  var category=''
  var date=''
  var desc=''
  var id=''
  var location = ''
  var category = ''
  const scheduledDate = moment().add(7,'days')
  const diffTime = scheduledDate.diff(moment()) 
  const timeoutId = setTimeout(() => { 
    firebase.firestore()
            .collection("offers")
            .doc(docID)
            .get()
            .then(querysnap => {
              var documentData = querysnap.data();
              data = documentData.data;
              title = documentData.title;
              total = documentData.total;
              location = documentData.location;
              category = documentData.category;
              date = documentData.date; 
              desc = documentData.desc;
              id = documentData.id;
              category = documentData.category; 
              
              firebase.firestore().collection("offers").add({
                user: user,
                userJoined: [],          
                data:data,
                title:title,
                location:location,
                total:total, 
                category:category, 
                date:date, //remember it's date + 7 
                desc:desc,
                id:''
            })
            .then((snapshot) =>
              snapshot.update({
                id:snapshot.id
             }))
            .catch(
              console.log("Error getting documents")
            )

    firebase.firestore()
            .collection("info")
            .where("category", "==", category)
            .get()
            .then(snapshot =>{        
              snapshot.forEach(element => {
                // console.log("category is", element.data().category)
                console.log("push notifcation pushed")
                  const response = fetch('https://exp.host/--/api/v2/push/send', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    to: element.data().pushToken,//this one needa change
                    sound: 'default',
                    title: 'Order Added!',
                    body: 'Buyer has re-sent another offer to buy request!',
                    _displayInForeground: true,
                  })
                });
              })
            })
            }).catch(function(error) {
                  console.log("Error getting documents: ", error);
            })}, diffTime);   //can change diffTime to 10000 to test  
}
// function for biweekly settings
export function biweekly() {
  var data=''
  var title=''
  var total=''
  var category=''
  var date=''
  var desc=''
  var id=''
  var location = ''
  var category = ''
  const scheduledDate = moment().add(14,'days')
  const diffTime = scheduledDate.diff(moment()) 
  // replicating the offer
  const timeoutId = setTimeout(() => {
    //getting the data from this database 
    firebase.firestore()
            .collection("offers")
            .doc(docID)
            .get()
            .then(querysnap => {
              var documentData = querysnap.data();
              data = documentData.data;
              title = documentData.title;
              total = documentData.total;
              location = documentData.location;
              category = documentData.category;
              date = documentData.date; 
              desc = documentData.desc;
              id = documentData.id;
              category = documentData.category; 
              
              firebase.firestore().collection("offers").add({
                user: user,
                userJoined: [],          
                data:data,
                title:title,
                location:location,
                total:total, 
                category:category, 
                date:date, //remember it's date + 7 
                desc:desc,
                id:''
            })
            .then((snapshot) =>
              snapshot.update({
                id:snapshot.id
             }))
            .catch(
              console.log("Error getting documents")
            )

    firebase.firestore()
            .collection("info")
            .where("category", "==", category)
            .get()
            .then(snapshot =>{        
              snapshot.forEach(element => {
                // console.log("category is", element.data().category)
                console.log("push notifcation pushed")
                  const response = fetch('https://exp.host/--/api/v2/push/send', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    to: element.data().pushToken,//this one needa change
                    sound: 'default',
                    title: 'Order Added!',
                    body: 'Buyer has re-sent another offer to buy request!',
                    _displayInForeground: true,
                  })
                });
              })
            })
            }).catch(function(error) {
                  console.log("Error getting documents: ", error);
            })}, diffTime);   //can change diffTime to 10000 to test  
}

// function for monthly settings
export function monthly() {
  var data=''
    var title=''
    var total=''
    var category=''
    var date=''
    var desc=''
    var id=''
    var location = ''
    var category = ''
    const scheduledDate = moment().add(30,'days')
    const diffTime = scheduledDate.diff(moment()) 
    // replicating the offer
    const timeoutId = setTimeout(() => {
      //getting the data from this database 
      firebase.firestore()
              .collection("offers")
              .doc(docID)
              .get()
              .then(querysnap => {
                var documentData = querysnap.data();
                data = documentData.data;
                title = documentData.title;
                total = documentData.total;
                location = documentData.location;
                category = documentData.category;
                date = documentData.date; 
                desc = documentData.desc;
                id = documentData.id;
                category = documentData.category; 
                
                firebase.firestore().collection("offers").add({
                  user: user,
                  userJoined: [],          
                  data:data,
                  title:title,
                  location:location,
                  total:total, 
                  category:category, 
                  date:date, //remember it's date + 7 
                  desc:desc,
                  id:''
              })
              .then((snapshot) =>
                snapshot.update({
                  id:snapshot.id
               }))
              .catch(
                console.log("Error getting documents")
              )
      firebase.firestore()
              .collection("info")
              .where("category", "==", category)
              .get()
              .then(snapshot =>{        
                snapshot.forEach(element => {
                  // console.log("category is", element.data().category)
                  console.log("push notifcation pushed")
                    const response = fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Accept-encoding': 'gzip, deflate',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      to: element.data().pushToken,//this one needa change
                      sound: 'default',
                      title: 'Order Added!',
                      body: 'Buyer has re-sent another offer to buy request!',
                      _displayInForeground: true,
                    })
                  });
                })
              })
              }).catch(function(error) {
                    console.log("Error getting documents: ", error);
              })}, diffTime);   //can change diffTime to 10000 to test 
}

// const scheduledDate = moment().add(30,'days');
// const diffTime = scheduledDate.diff(moment())
// this.timeoutId = BackgroundTimer.setTimeout(() => {
//   console.log("perform task here: Month");
// }, diffTime);  