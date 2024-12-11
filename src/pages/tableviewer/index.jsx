import { useEffect, useState } from "react"
import { ObjectTable } from '../../components/objTable';
import { del, get, listRoutes, post, put, listRoutes as routes } from '../../api/api'
import { schemas } from "../../models/model";
import { idSymbol, changedSymbol, deletedSymbol } from "../../utils/symbols";
import style from './style.module.css';
import { usePromise } from '../../utils/usePromise';
import Loading from '../../components/loading';

export function TableViewer() {

    // const [tables, setTables] = useState(Object.fromEntries(Object.keys(schemas).map(k => [k, []])));

    const [table, setTable] = useState(null);

    const [load, status, data] = usePromise(fetchData);

    function fetchData() {
        return Promise.all(Object.keys(listRoutes).map(s => get(routes[s])))
            .then(tbs => Object
                .fromEntries(Object.keys(listRoutes)
                    .map((k, i) => [k, tbs[i]])));
    }

    useEffect(() => {
        load();
    }, []);

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

        Promise.all(promises).then(load());
    }

    return <div>
        <Loading status={status} />
        {status === 'fulfilled' && <>
            <span>Таблица: </span>
            <select onChange={({ target: { value } }) => setTable(value)}>
                {Object.keys(listRoutes)
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
                        onSave={handleSave}
                    />
                </div>

            }
        </>}
    </div>
}