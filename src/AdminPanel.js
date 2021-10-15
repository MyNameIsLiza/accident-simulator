//import './Game.css';
import firebase from 'firebase';
import {useEffect, useState, useCallback} from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import getDataById from './db';

function AdminPanel() {
    let [situations, setSituations] = useState([]);


    useEffect(() => {
        firebase.database().ref().on('value', (elem) => {
            setSituations(elem.val());
        });
    }, []);

    /*const addSituation = useCallback(() => {
        console.log('ADD')
        setNewSituation({});
    }, []);
    const editSituation = useCallback(({target}) => {
        console.log('EDIT')
        const situation = getDataById(target.dataset.id);
        setNewSituation(situation);
    }, []);*/

    return (
        <div className="AdminPanel">
            <Router>
                {situations.length > 0 ? <div className="menu">
                    <ButtonGroup variant="outlined" aria-label="outlined button group">{
                        Object.keys(situations).map((key) => {
                            return (
                                <Button key={key}
                                        data-id={situations[key].id}><Link
                                    to="/admin_panel/edit">{situations[key].name}</Link></Button>
                            );
                        })}
                    </ButtonGroup>
                </div> : ''}
                <Button variant="outlined"><Link to="/admin_panel/add">Додати нову ситуацію</Link></Button>
                <Switch>
                    <Route path="/admin_panel/add">
                        <AddSituation/>
                    </Route>
                    <Route path="/admin_panel/edit">
                        <AddSituation/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

function AddSituation() {
    let [newSituation, setNewSituation] = useState({id:1});
    return (
        <Router>
            <div className="AddSituation">
                <label htmlFor="situationId">Назва ситуації</label>
                <input type="text" id="situationId"/>
                <Button><Link to="/question">Додати питання</Link></Button>
            </div>
            <Switch>
                <Route path="/question">
                    <AddQuestion situationId={newSituation.id}/>
                </Route>
            </Switch>
        </Router>
    );
}

function AddQuestion(props) {
    let [newQuestion, setNewQuestion] = useState(null);
    return (
        <Router>
        <div className="AddQuestion">
            <label htmlFor="questionId">Назва питання</label>
            <input type="text" id="questionId"/>
            <Button><Link to="/question/answer">Додати відповідь</Link></Button>
        </div>
            <Switch>
                <Route path="/question/answer">
                    <AddAnswer/>
                </Route>
            </Switch>
        </Router>
    );
}

function AddAnswer() {
    let [newAnswer, setNewAnswer] = useState(null);
    return (
        <div className="AddAnswer">
            <label htmlFor="answerId">Назва відповіді</label>
            <input type="text" id="answerId"/>
            <label htmlFor="toQuestion">Посилання на наступне питання</label>
            <input type="text" id="toQuestion"/>
        </div>
    );
}

export default AdminPanel;
