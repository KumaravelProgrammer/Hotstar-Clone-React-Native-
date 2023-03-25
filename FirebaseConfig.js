import * as  firebase from '@react-native-firebase/app';



const firebaseConfig = {
    apiKey: "AIzaSyC_DERDj4dnbVhCS44XpMlM-Lg5xKV2ca0",
    authDomain: "react-native-94547.firebaseapp.com",
    databaseURL: "https://react-native-94547-default-rtdb.firebaseio.com",
    projectId: "react-native-94547",
    storageBucket: "",

};


const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;