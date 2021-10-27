import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, {useCallback, useState} from 'react';

function Help() {
    let [infos, setInfos] = useState([
        {id: 1, title: 'Info1', body: 'Information about info 1'},
        {id: 2, title: 'Info2', body: 'Information about info 2'},
        {id: 3, title: 'Info3', body: 'Information about info 3'},
        {id: 4, title: 'Info4', body: 'Information about info 4'}
    ]);

    const infoClick = useCallback(({target}) => {
        const id = target.dataset.id;
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`info${i}`).classList.add("visually-hidden");
        }
        document.getElementById(`info${id}`).classList.remove("visually-hidden");
    }, []);

    return (
        <div className="Information">
            <h1>Information</h1>
            <ButtonGroup>{
                infos.map((item) => {
                    return (
                        <Button variant="contained" color="secondary" data-id={item.id} onClick={infoClick}>{item.title}</Button>)
                })
            }
            </ButtonGroup>
            <div className="info">
                {
                    infos.map((item) => {
                        return (
                            <div id={`info${item.id}`} className="visually-hidden">
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </div>)
                    })
                }
            </div>
        </div>
    );
}

export default Help;
