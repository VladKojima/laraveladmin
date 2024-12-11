import { useEffect, useState } from "react"
import { ObjectTable } from '../../components/objTable';
import { del, get, post, put, listRoutes as routes } from '../../api/api'
import { schemas } from "../../models/model";
import { idSymbol, changedSymbol, deletedSymbol } from "../../utils/symbols";
import style from './style.module.css';
import { usePromise } from '../../utils/usePromise';
import Loading from '../../components/loading';

export function TableViewer() {

    const [table, setTable] = useState(null);

    const [load, status, data] = usePromise(() => get('/admin/data'));
    const [save, savingStatus, , savingError] = usePromise(handleSave);

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (!table && !!data)
            setTable('BonusPoints')
    }, [data]);

    useEffect(() => {
        if (savingStatus === 'fulfilled')
            load();
    }, [savingStatus])

    function handleSave(objects) {
        const deleted = [];
        const stored = []
        const updated = [];

        for (const obj of objects) {
            if (obj[deletedSymbol]) {
                deleted.push(obj);
                continue;
            }
            if (obj[idSymbol]) {
                stored.push(obj);
            } else
                if (obj[changedSymbol]) {
                    updated.push(obj);
                }
        }

        return Promise.all(
            [
                ...deleted
                    .map(obj => del(`${routes[table]}/${obj.id}`)),
                !!stored.length && post(routes[table], stored),
                !!updated.length && put(routes[table], updated),
            ]);
    }

    return <div className={style.page}>
        <Loading status={status} onRetry={load} />
        <div
            className={style.savingInfo}
        >
            <Loading
                status={savingStatus}
                loadingMsg={"Идет сохранение..."}
                errorMsg={"Ошибка сохранения: " + (savingError != null ? Object.values(savingError.response.data.errors).join(' ') : '')}
            />
        </div>
        {status === 'fulfilled' && <>
            <span>Таблица: </span>
            <select onChange={({ target: { value } }) => setTable(value)} value={table ?? ''}>
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