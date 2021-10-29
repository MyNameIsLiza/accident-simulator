import React from 'react';
import firebase from 'firebase';
import {useEffect, useState, useCallback} from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import {getDataById} from './db';

function Game() {
    let [situations, setSituations] = useState([]);
    let [situation, setSituation] = useState(null);
    let [effects, setEffects] = useState([]);
    let [success, setSuccess] = useState({'amount': 0, 'count': 0});

    function handleEffects(newEffects) {
        setEffects(newEffects);
    }

    function handleSuccess(newSuccess) {
        setSuccess(newSuccess);
    }

    useEffect(() => {
        firebase.database().ref().on('value', (elem) => {
            setSituations(elem.val());
        });
    }, []);

    const startSituation = useCallback(({target}) => {
        const id = target.closest('Button').dataset.id;
        setSituation({...getDataById(id)});
    }, []);

    return (
        <div className="Game">
            {!situation ? <ButtonGroup variant="outlined" aria-label="outlined button group">{
                    Object.keys(situations).map((key) => {
                        return (
                            <Button onClick={startSituation} key={key}
                                    data-id={situations[key].id}>{situations[key].name}</Button>
                        );
                    })}</ButtonGroup>
                : <Situation {...situation} allEffects={situation.effects} effects={effects} success={success}
                             handleEffects={handleEffects} handleSuccess={handleSuccess}/>
            }
        </div>
    );
}

function Situation(props) {
    let [question, setQuestion] = useState(props.questions ? {...props.questions[0]} : null);

    const handleEffects = useCallback((newEffects) => {
        props.handleEffects(newEffects);
    }, [props])
    const handleSuccess = useCallback((newSuccess) => {
        props.handleSuccess(newSuccess);
    }, [props])
    const answerClick = useCallback(async ({target}) => {
        const answerId = target.closest('Button').dataset.id;
        const answer = getDataById(answerId);
        let newQ = answer.toQuestion;

        if (typeof answer.success !== 'undefined') {
            await handleSuccess({
                'amount': +props.success.amount + +answer.success,
                'count': +props.success.count + 1
            });
        }
        if (typeof answer.effects !== 'undefined') {
            await handleEffects([...props.effects, ...answer.effects]);
        }
        setQuestion({...getDataById(newQ)});

    }, [props.success, props.effects, handleEffects, handleSuccess]);
    return (
        <div className="Situation card box-shadow w-50 mx-auto p-2" data-id={props.id}>
            <h2>{props.name}</h2>
            <h3>{question?.title}</h3>
            {
                question?.answers ?

                    Object.keys(question.answers).map((key) => {
                        return (<>{question.answers[key].title ?
                                <Button className="w-50 mx-auto mb-2" variant="outlined" key={key}
                                        data-id={question.answers[key].id}
                                        onClick={answerClick}>{question.answers[key].title}</Button>
                                : ''}
                            </>
                        )
                    })
                    : <div className="result">
                        {props.success.count > 0 ?
                            <h4>Успіх: {Number.parseInt(props.success.amount / props.success.count)}%</h4> :
                            <p>Успіхів немає</p>}
                        {props.effects.length > 0 ? <div className="effects">
                            <h4>Наслідки:</h4>
                            {
                                props.effects.map((effectId) => {
                                    return (
                                        <p>{props.allEffects[effectId]}</p>
                                    )
                                })
                            }
                        </div> : <p>Ефектів немає</p>}
                    </div>
            }
        </div>
    );
}

export default Game;
