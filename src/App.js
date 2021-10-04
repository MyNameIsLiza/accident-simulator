import logo from './logo.svg';
import './App.css';
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
});/**/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
