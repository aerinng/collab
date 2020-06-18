import firebase from 'firebase';
import {useEffect} from 'react'; 
import moment from 'moment';

//https://medium.com/better-programming/using-moment-js-in-react-native-d1b6ebe226d4

export function daily(docID,user){
  //need to recreate the order with the same details 
  var data=''
  var title=''
  var total=''
  var category=''
  var date=''
  var desc=''
  var id=''
  var location = ''
  // console.log("AOF doc", docID)
  // console.log("AOF email", user)

      // const scheduledDate = moment().add(1,'days')
    // const diffTime = scheduledDate.diff(moment())


    // const timeoutId = setTimeout(() => {
    //   alert("has been five secons")
    // }, 5000);

  //getting the data from this db 
  firebase.firestore().collection(user).doc(docID)
  .get().then(qs => {
        var documentData = qs.data();
        data = documentData.data;
        title = documentData.title;
        total = documentData.total;
        location = documentData.location;
        category = documentData.category;
        date = documentData.date; //rmb  date + 7 
        desc = documentData.desc;
        id = documentData.id;
        firebase.firestore().collection(user).add({
          data:data,
          title:title,
          location:location,
          total:total, 
          category: category, 
          desc: desc,
          id:'',
        }).then((snapshot)=>{
          snapshot.update({
            id:snapshot.id        
        })})
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
});
// console.log("data in AOF is, ", data)


    // const timer = setTimeout(() => {
              // console.log("set a timeout to addPost");
              // }, 1000);//runs after one second
              // return () => clearTimeout(timer);


//     const scheduledDate = 
//     moment().add(1,'days')
//     const diffTime = scheduledDate.diff(moment())
//     this.timeoutId = BackgroundTimer.setTimeout(() => {
//       //creating another
//         console.log("perform task here");
//         firebase.firestore().collection(user.email).add({ //another document id 
//           data:data,
//           title:title,
//           location:this.state.location,
//           total:this.state.total, 
//           category: this.state.category, 
//           date:this.state.displayDate.toString(),
//           desc:this.state.desc,
//           id:Pid,
//       })
//     }, diffTime);  
//         //signal to add Post for this item.
//         //- update another order
//         //- notify others + the group 


        
//         //all order details will be the same
//         //estimated order date + 7 days from the same order 
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