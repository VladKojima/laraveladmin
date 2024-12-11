import { useEffect, useState } from "react"
import { ObjectTable } from '../../components/objTable';
import { del, get, post, put, listRoutes as routes } from '../../api/api'
import { schemas } from "../../models/model";
import { idSymbol, changedSymbol, deletedSymbol } from "../../utils/symbols";
import style from './style.module.css';
import { usePromise } from '../../utils/usePromise';
import Loading from '../../components/loading';

export function TableViewer() {

    // const [tables, setTables] = useState(Object.fromEntries(Object.keys(schemas).map(k => [k, []])));

    const [table, setTable] = useState(null);

    const [load, status, data] = usePromise(fetchData);
    const [save, savingStatus, , savingError] = usePromise(handleSave);

    function fetchData() {
        return Promise.all(Object.keys(routes).map(s => get(routes[s])))
            .then(tbs => Object
                .fromEntries(Object.keys(routes)
                    .map((k, i) => [k, tbs[i]])));
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (!table && !!data)
            setTable('bonusPoints')
    }, [data]);

    useEffect(() => {
        if (savingStatus === 'fulfilled')
            load();
    }, [savingStatus])

    function handleSave(objects) {
        const promises = [];

        for (const obj of objects) {
            if (obj[deletedSymbol]) {
                promises.push(del(`${routes[table]}/${obj.id}`));
                continue;
            }
            if (obj[idSymbol]) {
                promises.push(post(routes[table], obj));
            } else
                if (obj[changedSymbol]) {
                    promises.push(put(`${routes[table]}/${obj.id}`, obj));
                }
        }

        return Promise.all(promises);
    }

    return <div className={style.page}>
        <Loading status={status} onRetry={load} />
        <Loading
            status={savingStatus}
            loadingMsg={"Идет сохранение..."}
            errorMsg={"Ошибка сохранения: " + (savingError ? Object.values(savingError.response.data.errors).join(' ') : '')}
        />
        {status === 'fulfilled' && <>
            <span>Таблица: </span>
            <select onChange={({ target: { value } }) => setTable(value)} value={table}>
                {Object.keys(routes)
                    .map(route => <option key={route} value={route}>{route}</option>)
                }
            </select>

            {
                table && <div className={style.wrapper}>
                    <ObjectTable
                        editableColumns={true}
                        columns={Object.keys(schemas[table])}
                        schema={schemas[table]}
                        objects={data[table]}
                        onSave={save}
                    />
                </div>

            }
        </>}
    </div>
}