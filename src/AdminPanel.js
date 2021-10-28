import React from 'react';
import firebase from 'firebase';
import {useEffect, useCallback} from "react";
import Button from '@mui/material/Button';
import create from 'zustand'
import './css/bootstrap.min.css'
import './css/style.css'
import './css/all.min.css'
import './css/bootstrap.min.css.map'
import {sendSituations} from './db'

const useStore = create(set => ({
    situations: [],
    value: null,
    situation: {},
    question: {},
    answer: {},
    handleValue: (v) => {
        set(state => ({...state, value: v}))
    },
    handleSituations: (ss) => {
        set(state => ({...state, situations: ss}))
    },
    handleSituation: (s) => {
        set(state => {
            const ss = [...state.situations];
            state.situations[s.id.split('_')[1]] = s;
            return {...state, situations: ss, situation: s}
        })
    },
    handleQuestion: (q) => {
        set(state => {
            const s = {...state.situation};
            s.questions[q.id.split('_')[2]] = q;
            state.handleSituation(s);
            return {...state, situation: s, question: q}
        })
    },
    handleAnswer: (a) => {
        set(state => {
            const q = {...state.question};
            q.answers[a.id.split('_')[3]] = a;
            state.handleQuestion(q);
            console.log('q', q);
            console.log('a', a);
            return {...state, question: q, answer: a}
        })
    }
}))

function AdminPanel() {
    let situations = useStore(state => state.situations);
    let situation = useStore(state => state.situation);
    let value = useStore(state => state.value);
    let question = useStore(state => state.question);
    let answer = useStore(state => state.answer);

    const handleSituations = useStore(state => state.handleSituations);
    const handleSituation = useStore(state => state.handleSituation);
    const handleQuestion = useStore(state => state.handleQuestion);
    const handleAnswer = useStore(state => state.handleAnswer);
    const handleValue = useStore(state => state.handleValue);

    useEffect(async () => {
        handleValue('admin_panel');
        const promise = await firebase.database().ref().on('value', (elem) => {
            handleSituations(elem.val());
            console.log(elem.val());
        });
        const situationId = '#';
        const a = {'id': `_${situationId}_0_0`};
        const q = {'id': `_${situationId}_0`, 'answers': [answer]};
        const s = {'id': `_${situationId}`, 'questions': [question]};

        handleSituation(s);
        handleQuestion(q);
        handleAnswer(a);
        handleValue('situation');
        return promise;
    }, []);

    return (<div className="AdminPanel">
            {value === 'situation' ?
                <Situation/> : value === 'question' ?
                    <Question/> :
                    <Button variant="outlined" onClick={() => {
                        handleValue('situation')
                    }}>Додати нову ситуацію</Button>}

        </div>
    )
}

function Situation() {
    let situations = useStore(state => state.situations);
    let situation = useStore(state => state.situation);
    let value = useStore(state => state.value);
    let question = useStore(state => state.question);
    let answer = useStore(state => state.answer);
    const handleSituations = useStore(state => state.handleSituations);
    const handleSituation = useStore(state => state.handleSituation);
    const handleQuestion = useStore(state => state.handleQuestion);
    const handleAnswer = useStore(state => state.handleAnswer);
    const handleValue = useStore(state => state.handleValue);

    useEffect(() => {


    }, [])

    const handleClick = useCallback(({target}) => {
        const situation_title = document.getElementById('situation_title');
        const question_title = document.getElementById('question_title');
        const s = {...situation};
        const q = {...question};
        if (question.title !== question_title.value) {
            q.title = question_title.value;
        }
        if (situation.name !== situation_title.value) {
            s.name = situation_title.value;
        }
        handleQuestion(q);
        handleSituation(s);
        question_title.value = '';
        handleQuestion({
            'id': `_#_${+question.id.split('_')[2] + 1}`,
            'answers': []
        });

    }, [question, situation, situations]);

    const handleSend = useCallback(() => {
        const newId = +situations[situations.length - 1].id.split('_')[1] + 1;
        situations[newId] = JSON.parse(JSON.stringify(situations['#']).replaceAll('#', newId ?? 0));
        delete situations['#'];
        sendSituations(situations);
        handleValue('admin_panel');
    }, []);

    const editQuestion = useCallback(({target}) => {
        handleValue('question');
        handleQuestion(situation.questions[target.closest('li').dataset['id'].split('_')[2]]);
    }, [])
    useEffect(() => {

    }, [])

    return (<div id="vueElement" className="row mx-0 px-0 justify-content-center">
            <div className="col-lg-4 px-0 my-2 my-lg-0">
                <div className="card box-shadow me-0 me-lg-1">
                    <div className="card-body py-4">
                        <h1 className="h3">Create situation</h1>
                        <div className="row mx-0">
                            <div className="form-group px-0 my-4">
                                <label>Situation name</label>
                                <input id="situation_title" required
                                       className="form-control" type="text" defaultValue={situation?.name ?? ''}/>
                                <small className="text-danger">Error</small>
                            </div>
                            <div className="form-group px-0 mb-4">
                                <label>Question</label>
                                <input id="question_title" required
                                       className="form-control" type="text"/>
                                <small className="text-danger">Error</small>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                            <a /*onClick={backToManage}*/
                                className="btn btn-sm btn-outline-secondary box-shadow">Cancel</a>
                            <button onClick={handleClick} className="btn btn-sm btn-secondary box-shadow">Add question
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 px-0 my-2 my-lg-0">
                <div className="card box-shadow h-100 ms-0 ms-lg-1">
                    <div className="card-body py-4">
                        <div className="d-flex justify-content-between">
                            <h1 className="h3">Questions</h1>
                        </div>
                        <div className="row card-height overflow-auto mt-4 mx-0">
                            <ul className="list-group px-list-group">
                                {situation.questions ? situation.questions.map((el) => el.title ? (
                                    <li data-id={el.id}
                                        className="list-group-item w-100 d-flex justify-content-between align-items-center overflow-auto">
                                        <span>{el.title}</span>
                                        <small className="text-primary">
                                            <button className="btn btn-link" onClick={editQuestion}/**/><i>Edit</i>
                                            </button>
                                            <button className="btn btn-link" /*onClick={removeQuestion}*/><i>Remove</i>
                                            </button>
                                        </small>
                                    </li>) : '') : ''}
                            </ul>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-end">
                            <button onClick={handleSend} className="btn btn-sm btn-success box-shadow">Finish
                                situation creation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Question() {
    let situations = useStore(state => state.situations);
    let situation = useStore(state => state.situation);
    let value = useStore(state => state.value);
    let question = useStore(state => state.question);
    let answer = useStore(state => state.answer);

    const handleSituations = useStore(state => state.handleSituations);
    const handleSituation = useStore(state => state.handleSituation);
    const handleQuestion = useStore(state => state.handleQuestion);
    const handleAnswer = useStore(state => state.handleAnswer);
    const handleValue = useStore(state => state.handleValue);

    const handleClick = useCallback(({target}) => {
        const answer_title = document.getElementById('answer_title');
        const answer_toQuestion = document.getElementById('answer_toQuestion');
        const s = {...situation};
        const q = {...question};
        const a = {...answer};
        a.title = answer_title.value;
        a.toQuestion = answer_toQuestion.value;
        handleAnswer(a);
        handleQuestion(q);
        handleSituation(s);
        answer_title.value = '';
        answer_toQuestion.value = '';
        console.log('id', question.answers.length);
        handleAnswer({
            'id': `_#_${+question.id.split('_')[2]}_${question.answers.length}`
        });
    }, [answer, question, situation, situations]);

    const handleSend = useCallback(() => {
        handleQuestion({
            'id': `_#_${situation.questions.length}`,
            'answers': []
        });
        handleValue('situation');
    }, []);

    return (<div id="vueElement" className="row mx-0 px-0 justify-content-center">
            <div className="col-lg-4 px-0 my-2 my-lg-0">
                <div className="card box-shadow me-0 me-lg-1">
                    <div className="card-body py-4">
                        <h1 className="h3">Create question</h1>
                        <div className="row mx-0">
                            <div className="form-group px-0 my-4">
                                <label>Question name</label>
                                <input readOnly required className="form-control"
                                       type="text"
                                       defaultValue={question.title}/>
                                <small className="text-danger">Error</small>
                            </div>
                            <div className="form-group px-0 mb-4">
                                <label htmlFor="answer_title">Answer</label>
                                <input id="answer_title" required className="form-control" type="text"/>
                                <label htmlFor="answer_toQuestion">To Question</label>
                                <select id="answer_toQuestion" required className="form-control">
                                    {situation.questions.map((el) => el.title ? (
                                        <option value={el.id}>{el.title}</option>
                                    ) : '')}
                                </select>
                                <small className="text-danger">Error</small>

                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                            <a className="btn btn-sm btn-outline-secondary box-shadow">Cancel</a>
                            <button onClick={handleClick} className="btn btn-sm btn-secondary box-shadow">Add answer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 px-0 my-2 my-lg-0">
                <div className="card box-shadow h-100 ms-0 ms-lg-1">
                    <div className="card-body py-4">
                        <div className="d-flex justify-content-between">
                            <h1 className="h3">Answers</h1>
                        </div>
                        <div className="row card-height overflow-auto mt-4 mx-0">
                            <ul className="list-group px-list-group">
                                {question.answers ? question.answers.map((el) => el.title ? (
                                    <li className="list-group-item w-100 d-flex justify-content-between align-items-center overflow-auto">
                                        <span>{el.title}</span>
                                        <span>To</span>
                                        <span>{el.toQuestion}</span>
                                        <small className="text-primary">
                                            <button className="btn btn-link" /*onClick={removeQuestion}*/><i>Remove</i>
                                            </button>
                                        </small>
                                    </li>) : '') : ''}
                            </ul>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-end">
                            <button onClick={handleSend} className="btn btn-sm btn-success box-shadow">Finish
                                question creation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;
