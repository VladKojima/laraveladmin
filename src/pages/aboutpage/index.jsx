import { useEffect, useState } from 'react';
import style from './style.module.css';
import { get, put, routes } from '../../api/api';

export function AboutPage() {

    const [info, setInfo] = useState();
    const [infoState, setInfoState] = useState();

    useEffect(() => {
        get(routes.aboutPage).then(setInfo);
    }, []);

    function reset() {
        setInfoState(info)
    }

    function save() {
        put(`${routes.aboutPage}`, infoState).then(() => setInfo(infoState));
    }

    useEffect(reset, [info]);

    return <div>
        {infoState && <div className={style.info}>
            <input
                className={style.title}
                value={infoState.title}
                onChange={({ target: { value } }) =>
                    setInfoState({ ...infoState, title: value })}
            />
            <img src={infoState.image_url} />
            <input
                value={infoState.description}
                onChange={({ target: { value } }) =>
                    setInfoState({ ...infoState, description: value })}
            />

            <p>Ссылка на картинку</p>
            <input
                value={infoState.image_url}
                onChange={({ target: { value } }) =>
                    setInfoState({ ...infoState, image_url: value })}
            />
        </div>}
        <div className={style.buttons}>
            <button onClick={reset}>Сбросить</button>
            <button onClick={save}>Сохранить</button>
        </div>
    </div>
}