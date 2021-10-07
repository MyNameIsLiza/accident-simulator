import './App.css';
import Game from './Game'
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCEyYh-BEkWFbkqWZUrrN-cJbrqsoSh75c",
  authDomain: "accident-simulator-liza.firebaseapp.com",
  databaseURL: "https://accident-simulator-liza-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "accident-simulator-liza",
  storageBucket: "accident-simulator-liza.appspot.com",
  messagingSenderId: "200851750236",
  appId: "1:200851750236:web:8d40639aa8cf0dcecd9599"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.database().ref('/country').on('value', (elem) => {
  console.log(elem.val());
});

function App() {
  return (
    <div className="App">
      <Game/>
    </div>
  );
}

export default App;
