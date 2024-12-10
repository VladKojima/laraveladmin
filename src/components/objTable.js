import { useState } from 'react';
import style from './style.module.css';
import { idSymbol } from '../utils/idSymbol';

export function ObjectTable({
    objects,
    columns,
    editableColumns,
    schema,
    onSave,
}) {
    const [objectsState, setObjectsState] = useState(objects);

    const keys = Object.keys(objects[0]);

    function reset() {
        setObjectsState(objects);
        setEditableObject(null);
    }

    function setProp(object, prop, value) {
        setObjectsState(objectsState.map(obj => {
            if (obj !== object) return obj;

            return { ...obj, [prop]: value };
        }))
    }

    function add() {
        setObjectsState([
            ...objectsState,
            { ...Object.fromEntries(keys.map(k => [k, undefined])), [idSymbol]: crypto.randomUUID() }
        ])
    }

    function remove(object) {
        setObjectsState(objectsState.filter(obj => obj !== object));
    }

    const [editableObject, setEditableObject] = useState(null);

    return <div>
        <table className={style.table}>
            <thead className={style.thead}>
                <tr>{keys
                    .filter(k => !columns || columns.includes(k))
                    .map(
                        k => <td key={k} className={style.td}>{k}</td>
                    )}
                    <td className={style.td}>Действия</td>
                </tr>
            </thead>
            <tbody className={style.tbody}>
                {objectsState.map(obj => <tr key={obj.id ?? obj[idSymbol]} className={[style.tr, editableObject === (obj.id ?? obj[idSymbol]) && style.editable].join(" ")}>
                    {Object.entries(obj)
                        .filter(([k, v]) => !columns || columns.includes(k))
                        .map(([k, v]) => <td
                            key={k}
                            className={style.td}
                        >
                            <input
                                className={style.field}
                                value={!!v ? v : ""}
                                onChange={({ target: { value } }) => setProp(obj, k, value)}
                                disabled={k === 'id' || editableObject !== (obj.id ?? obj[idSymbol])}
                                type={schema?.[k] ?? 'text'}
                            />
                        </td>)}
                    <td className={style.td}>
                        <button onClick={() => setEditableObject(obj.id ?? obj[idSymbol])}>Редактировать</button>
                        <button onClick={() => remove(obj)}>Удалить</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
        {
            editableColumns && <div className={style.buttons}>
                <button onClick={add}>Добавить</button>
                <button onClick={reset}>Сбросить</button>
                <button onClick={() => { onSave(objectsState); }}>Сохранить</button>
            </div>
        }

    </div>
}