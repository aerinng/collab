import firebase from 'firebase';
import {useEffect} from 'react'; 
import moment from 'moment';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from "@react-native-community/push-notification-ios"


//https://medium.com/better-programming/using-moment-js-in-react-native-d1b6ebe226d4

export function stimulateOrder(docID,user){
  console.log("got called")
  //check if settings is a Weekly, biweekly etc
  firebase.firestore().collection("info").where("email", "==", user)
  .get()
  .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        switch(doc.data().frequency){
          case "Daily": 
            daily(docID,user)
          // case "Weekly": 
          //   weekly(docID,user)
          // case "Biweekly": 
          //   biweekly(docID,user)
          // case "Monthly": 
          //   monthly(docID,user)
        }

          // console.log(doc.id, " => ", doc.data());
          // var data = doc.data();
          // this.setState({
          //     username: data.username
          // })
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}

export function daily(docID,user){
    // const timeoutId = setTimeout(() => {
  //   //Testing one 
  //   firebase.firestore().collection("A").get()
  //   .then(snapshot =>{        
  //     snapshot.forEach(element => {
  //       console.log("push notifcation pushed")
  //         const response = fetch('https://exp.host/--/api/v2/push/send', {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Accept-encoding': 'gzip, deflate',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           to: element.data().pushToken,//this one needa change
  //           sound: 'default',
  //           title: 'Order Added!',
  //           body: 'Buyer has re-sent another offer to buy request!',
  //           _displayInForeground: true,
  //         })
  //       });
  //   })
  // })
  //   }, 2000);


//Below is the correct one 
  //need to recreate the order with the same details 
  var data=''
  var title=''
  var total=''
  var category=''
  var date=''
  var desc=''
  var id=''
  var location = ''
    // const scheduledDate = moment().add(1,'days')
    // const diffTime = scheduledDate.diff(moment())
    const timeoutId = setTimeout(() => {
      //creating another
        console.log("perform task here");
      //getting the data from this db 
      firebase.firestore().collection("offers").doc(docID)
      .get().then(qs => {
          console.log(qs.data())
          var documentData = qs.data();
          data = documentData.data;
          title = documentData.title;
          total = documentData.total;
          location = documentData.location;
          category = documentData.category;
          date = documentData.date; 
          desc = documentData.desc;
          id = documentData.id;
          firebase.firestore().collection("offers").add({
            user: user,
            userJoined: [],          
            data:data,
            title:title,
            location:location,
            total:total, 
            category:category, 
            date:date,//rmb  date + 7 
            desc:desc,
            id:id})
      }).catch(function(error) {
            console.log("Error getting documents: ", error);
        })

        //rmb: CHANGE COLLECTION
        firebase.firestore().collection("A").get()
        .then(snapshot =>{        
          snapshot.forEach(element => {
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

      }, 1000);  
        //signal to add Post for this item.
        //- update another order
        //- notify others + the group   
 
}

export function weekly(){
    const scheduledDate = 
    moment().add(7,'days')
    const diffTime = scheduledDate.diff(moment())
    this.timeoutId = BackgroundTimer.setTimeout(() => {
      console.log("perform task here");
    }, diffTime);    
}

export function biweekly(){
    const scheduledDate = 
    moment().add(14,'days')
    const diffTime = scheduledDate.diff(moment())
    this.timeoutId = BackgroundTimer.setTimeout(() => {
      console.log("perform task here");
    }, diffTime);    
}

export function monthly(){
    const scheduledDate = 
    moment().add(30,'days')
    const diffTime = scheduledDate.diff(moment())
    this.timeoutId = BackgroundTimer.setTimeout(() => {
      console.log("perform task here: Month");
    }, diffTime);    
}


// class AddOrder extends React.Component {
// componentDidMount(){
//     const scheduledDate = 
//      moment().add(1,'d').set({hour:16,minute:0,second:0,millisecond:0})
//     const diffTime = scheduledDate.diff(moment())
//     this.timeoutId = BackgroundTimer.setTimeout(() => {
//       console.log('tac');
//     }, diffTime);
//   }
  
//   componentWillUnmount(){
//    BackgroundTimer.clearTimeout(this.timeoutId);
//   }
//   render(){
//       return(

//       ) 
//   }
// }