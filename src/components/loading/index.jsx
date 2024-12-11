import style from './style.module.css';

export default function Loading({ status, loadingMsg, errorMsg, onRetry }) {
    if (status === "fulfilled" || status === "inited")
        return null;

    return <div className={style.wrapper}>
        <p>{status === 'pending' ? loadingMsg ?? "Загрузка данных..." : errorMsg ?? "Ошибка загрузки"}</p>
        {status === "rejected" && onRetry && <button onClick={() => onRetry()}>Повторить загрузку</button>}
    </div>
}