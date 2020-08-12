import firebase from 'firebase';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBXDx_-g_Pkp47ltx4UvBowYDv6fmfO7dY",
    authDomain: "myapp4-3fb52.firebaseapp.com",
    databaseURL: "https://myapp4-3fb52.firebaseio.com",
    projectId: "myapp4-3fb52",
    storageBucket: "myapp4-3fb52.appspot.com",
    messagingSenderId: "664257894567",
    appId: "1:664257894567:web:c8b6d24db085ff9d57e382"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;