import './App.css';
import Game from './Game'
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AdminPanel from "./AdminPanel";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
            <Router>
                <ButtonGroup>
                    <Button><Link to='/game'>Почати</Link></Button>
                    <Button><Link to='/admin_panel'>Адміністрування</Link></Button>
                </ButtonGroup>
                <Switch>
                    <Route path='/game'>
                        <h2>Ситуації</h2>
                        <Game/></Route>
                    <Route path='/admin_panel'><h2>Адміністрування</h2><AdminPanel/></Route>
                </Switch>
            </Router>

        </div>
    );
}

export default App;
