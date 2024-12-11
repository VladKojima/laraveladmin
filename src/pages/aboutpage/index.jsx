import { useEffect, useState } from 'react';
import style from './style.module.css';
import { get, post, put, routes } from '../../api/api';
import { usePromise } from '../../utils/usePromise';
import Loading from '../../components/loading';

export function AboutPage() {

    const [load, loadingStatus, data] = usePromise(() => get(routes.aboutPage));
    const [save, savingStatus] = usePromise(() => put(`${routes.aboutPage}`, infoState));

    const [info, setInfo] = useState();
    const [infoState, setInfoState] = useState();

    useEffect(() => {
        load();
    }, []);

    useEffect(() => setInfo(data), [data]);

    useEffect(reset, [info]);

    function reset() {
        setInfoState(info);
    }

    return <div>
        <Loading status={loadingStatus} onRetry={load} />
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
            <button
                onClick={reset}
                disabled={!(loadingStatus === 'fulfilled')}
            >Сбросить
            </button>
            <button
                onClick={save}
                disabled={!(loadingStatus === 'fulfilled') || savingStatus === 'pending'}
            >Сохранить
            </button>
        </div>
    </div>
}