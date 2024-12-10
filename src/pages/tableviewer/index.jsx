import { useEffect, useState } from "react"
import { ObjectTable } from "../../components/objTable";
import { del, get, post, put, routes } from '../../api/api'
import { schemas } from "../../models/model";
import { idSymbol, changedSymbol, deletedSymbol } from "../../utils/symbols";

export function TableViewer() {

    const [tables, setTables] = useState(Object.fromEntries(Object.keys(schemas).map(k => [k, []])));

    const [table, setTable] = useState(null);

    function fetchData() {
        Promise.all(Object.keys(schemas).map(s => get(routes[s])))
            .then(tbs => setTables(Object
                .fromEntries(Object.keys(schemas)
                    .map((k, i) => [k, tbs[i]]))))
            .catch(error => { console.log(error) });
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleSave(objects) {
        for (const obj of objects) {
            if (obj[deletedSymbol]) {
                del(`${routes[table]}/${obj.id}`);
                continue;
            }
            if (obj[idSymbol]) {
                post(routes[table], obj);
            } else
                if (obj[changedSymbol]) {
                    put(`${routes[table]}/${obj.id}`, obj);
                }
        }
    }

    return <div>
        <select onChange={({ target: { value } }) => setTable(value)}>
            {Object.keys(schemas)
                .map(route => <option key={route} value={route}>{route}</option>)
            }
        </select>
        {
            table && <ObjectTable
                editableColumns={true}
                columns={Object.keys(schemas[table])}
                schema={schemas[table]}
                objects={tables[table]}
                onSave={handleSave}
            />
        }

    </div>
}