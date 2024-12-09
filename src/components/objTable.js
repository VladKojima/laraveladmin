import { useState } from 'react';
import style from './style.module.css';

export function ObjectTable({
    objects,
    columns,
    editableColumns,
    onSave,
}) {
    const [objectsState, setObjectsState] = useState(objects);

    function reset() {
        setObjectsState(objects);
    }

    function setProp(object, prop, value) {
        setObjectsState(objectsState.map(obj => {
            if (obj !== object) return obj;

            return { ...obj, [prop]: value };
        }))
    }

    const [editableObject, setEditableObject] = useState(null);
    const [editableProperty, setEditableProperty] = useState(null);
    const [editableValue, setEditableValue] = useState(null);

    return <div>
        <table className={style.table}>
            <thead className={style.thead}>
                <tr>{(Object.keys(objects[0]))
                    .filter(k => !columns || columns.includes(k))
                    .map(
                        k => <td key={k} className={style.td}>{k}</td>
                    )}
                </tr>
            </thead>
            <tbody className={style.tbody}>
                {objectsState.map(obj => <tr key={obj.id} className={style.tr}>
                    {Object.entries(obj)
                        .filter(([k, v]) => !columns || columns.includes(k))
                        .map(([k, v]) => <td
                            key={k}
                            className={style.td}
                            onClick={() => {
                                if (k !== 'id' && (editableColumns === true ||
                                    !!editableColumns && editableColumns?.includes(k))) {
                                    setEditableObject(obj.id);
                                    setEditableProperty(k);
                                    setEditableValue(v);
                                }
                            }}
                            contentEditable={editableObject === obj.id &&
                                editableProperty === k}
                            onInput={({ target: { value } }) => { setProp(obj, k, value) }}
                            onBlur={() => {
                                setEditableObject(null);
                                setEditableProperty(null);
                            }}
                            // suppressContentEditableWarning
                            dangerouslySetInnerHTML={{ __html: v }}
                        />)}
                </tr>)}
            </tbody>
        </table>
        {
            editableColumns && <div>
                <button onClick={reset}>Сбросить</button>
                <button onClick={() => onSave(objectsState)}>Сохранить</button>
            </div>
        }

    </div>
}