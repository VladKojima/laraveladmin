import { useEffect, useState } from 'react';
import style from './style.module.css';
import { idSymbol, changedSymbol, deletedSymbol } from '../../utils/symbols';
import { TypedInput } from '../typedInput';

export function ObjectTable({
    objects,
    columns,
    editableColumns,
    schema,
    onSave,
}) {
    const [objectsState, setObjectsState] = useState(objects);

    useEffect(() => {
        reset();
    }, [objects]);

    function reset() {
        setObjectsState(objects);
        setEditableObject(null);
    }

    function setProp(object, prop, value) {
        setObjectsState(prevState => prevState.map(obj => {
            if ((obj.id ?? obj[idSymbol]) !== (object.id ?? object[idSymbol])) return obj;

            return { ...obj, [prop]: value };
        }))
    }

    function add() {

        const uuid = crypto.randomUUID();

        setEditableObject(uuid);

        setObjectsState([
            ...objectsState,
            { ...Object.fromEntries(columns.map(k => [k, undefined])), [idSymbol]: uuid }
        ])
    }

    function remove(object) {
        setEditableObject(null);

        if (object[idSymbol])
            setObjectsState(objectsState.filter(obj => obj !== object));
        else
            setProp(object, deletedSymbol, true);
    }

    function recover(object) {
        setProp(object, deletedSymbol, false);
    }

    const [editableObject, setEditableObject] = useState(null);

    return <div>
        <table className={style.table}>
            <thead className={style.thead}>
                <tr>{columns
                    .map(
                        k => <td key={k} className={style.td}>{k}</td>
                    )}
                    <td className={style.td}>Действия</td>
                </tr>
            </thead>
            <tbody className={style.tbody}>
                {objectsState.map(obj => <tr key={obj.id ?? obj[idSymbol]} className={[
                    style.tr,
                    editableObject === (obj.id ?? obj[idSymbol]) && style.editable,
                    obj[deletedSymbol] && style.deleted
                ].join(" ")}>
                    {columns.map(column => <td
                        key={column}
                        className={style.td}
                    >
                        <TypedInput
                            className={style.field}
                            value={obj[column] ?? ""}
                            checked={obj[column] ?? false}
                            onChange={({ target: { value, checked } }) => {
                                let v = value;

                                if (schema[column] === 'number')
                                    v = +value;
                                if (schema[column] === 'checkbox')
                                    v = checked;

                                setProp(obj, column, v);
                                if (!(obj[changedSymbol] || obj[idSymbol]))
                                    setProp(obj, changedSymbol, true);
                            }}
                            disabled={column === 'id' || editableObject !== (obj.id ?? obj[idSymbol])}
                            type={schema?.[column] ?? 'text'}
                        />
                    </td>)}
                    <td className={style.td}>
                        <button onClick={() => setEditableObject(obj.id ?? obj[idSymbol])} disabled={obj[deletedSymbol]}>Редактировать</button>
                        <button onClick={() => remove(obj)} hidden={obj[deletedSymbol]}>Удалить</button>
                        <button onClick={() => recover(obj)} hidden={!obj[deletedSymbol]}>Восстановить</button>
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