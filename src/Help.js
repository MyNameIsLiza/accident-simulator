import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, {useCallback, useState} from 'react';
import './css/Help.css';

function Help() {
    let [infos, setInfos] = useState([
        {
            id: 1,
            title: 'Про програму',
            body: 'Це програма студентки Цапик Єлизавети СИМУЛЯТОР ВИЖИВАННЯ, суть якого полягає в тому, щоб знати, як діяти в екстренні ситуації. Краще набути ці знання вдома під ковдрою, ніж в палаючому домі. Встигни пройти, щоб мати 100% шанса вижити',
            images: [
                {
                    title: 'Структура БД',
                    src: 'СтруктураБД.png'
                },
                {
                    title: 'Структура Питань Відповідей БД',
                    src: 'СтруктураПитаньВідповідей.png'
                }, {
                    title: 'Структура Питань Відповідей З Ефектами Успіхом',
                    src: 'СтруктураПитаньВідповідейЗЕфектамиУспіхом.png'
                },{
                    title: 'Посилання На Питання',
                    src: 'ПосиланняНаПитання.png'
                }]
        },
        {
            id: 2,
            title: 'Що так експортна система і чи можна її їсти?',
            body: 'На жаль, експертна система абсолютно не їстівна. Експертна система - це ваш особистий помічник. ' +
                'Він допоможе вирішити проблему або знайти відповідь на ваше запитання. Експертна система - це ваша матінка, яка знає відповіді на всі питання(насправді ні). Якщо в нашій базі знань(сукупність питань і відповідей на них) недостатньо інформації, ви можете поповнити її, щоб удосконалити процес'
        },
        {
            id: 3,
            title: 'Як почати?',
            body: 'Щоб почати симулювати нещасні випадки натисніть кнопку Почати та виберіть ситуацію. Вам буде поставлене запитання та відповіді на нього. Відповідайте вдумливо, від цього залежатиме ваше життя',
        },
        {
            id: 4,
            title: 'Як редагувати?',
            body: 'Якщо ви вважаєте, що інформації в базі знань не достатньо, то ви правильно вважаєте. Саме заради вас було реалізовано додавання нових ситуацій. Щоб зробити це, натисніть кнопку Адміністрування',
        }
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
                        <Button variant="contained" color="secondary" data-id={item.id}
                                onClick={infoClick}>{item.title}</Button>)
                })
            }
            </ButtonGroup>
            <div className="info">
                {
                    infos.map((item) => {
                        return (
                            <div id={`info${item.id}`} className="infoElement w-60 info-unit visually-hidden">
                                <h3>{item.title}</h3>

                                <p>{item.body}</p>

                                {item.images ? <>{
                                    item.images.map((el) =>
                                        <div className="infoElement w-60 m-b-2rem">
                                            <h5>{el.title}</h5>
                                            <img className="w-100" src={`/images/${el.src}`} alt=""/>
                                        </div>)
                                }
                                </> : ''}
                            </div>)
                    })
                }
            </div>
        </div>
    );
}

export default Help;
