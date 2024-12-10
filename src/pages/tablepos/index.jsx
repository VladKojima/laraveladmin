import { useState, useRef } from "react"
import { get, listRoutes, put } from "../../api/api";
import style from './style.module.css';
import { changedSymbol } from '../../utils/symbols';

export function TablePosTool() {
    const [tables, setTables] = useState([]);
    const [halls, setHalls] = useState([]);
    const [tablesState, setTablesState] = useState([]);

    const [selectedHall, setSelectedHall] = useState(null);

    useState(() => {
        get(listRoutes.table).then(tbs => { setTables(tbs); setTablesState(tbs) });
        get(listRoutes.hall)
            .then(hs => { setHalls(hs); setSelectedHall(hs[0]) });

        const handler = () => setRect(imgRef.current?.getBoundingClientRect())

        window.addEventListener('resize', handler);

        return () => window.removeEventListener('resize', handler);
    }, []);

    const imgRef = useRef(null);

    const [rect, setRect] = useState();

    const origHeight = imgRef.current?.naturalHeight ?? 1;
    const origWidth = imgRef.current?.naturalWidth ?? 1;

    const rectSize = Math.max(rect?.width ?? 0, rect?.height ?? 0);

    const scale = rectSize / Math.max(origHeight, origWidth);

    const draggable = useRef(null);

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function handleMDown(event, table) {
        event.preventDefault();

        const handler = () => handleMUp(table, handler)

        draggable.current = event.target;
        document.addEventListener('mouseup', handler);
        document.addEventListener('mousemove', handleMMove);
    }

    function handleMUp(table, handler) {
        document.removeEventListener('mousemove', handleMMove);
        document.removeEventListener('mouseup', handler);

        setTablesState(tablesState.map(t => {
            if (t.id !== table.id) return t;

            return {
                ...t,
                x: Math.round((draggable.current.getBoundingClientRect().left - rect.left) / scale),
                y: Math.round((draggable.current.getBoundingClientRect().top - rect.top) / scale),
                [changedSymbol]: true
            };
        }))
    }

    function handleMMove({ pageY, pageX }) {
        draggable.current.style.left = clamp(
            pageX - draggable.current.offsetWidth / 2,
            rect.left,
            rect.right - draggable.current.getBoundingClientRect().width
        ) + 'px';

        draggable.current.style.top = clamp(
            pageY - draggable.current.offsetHeight / 2,
            rect.top,
            rect.bottom - draggable.current.getBoundingClientRect().height
        ) + 'px';
    }

    function save() {
        for (const table of tablesState) {
            if (table[changedSymbol])
                put(`${listRoutes.table}/${table.id}`, table);
        }
    }

    function reset() {
        setTablesState(tables);
    }

    return <div>
        <select
            onChange={
                ({ target: { value } }) => {
                    setSelectedHall(
                        halls.find(hall => hall.id === +value)
                    );
                    setRect(imgRef.current?.getBoundingClientRect());
                }
            }
        >
            {halls.map(hall => <option key={hall.id} value={hall.id}>{hall.id}: {hall.name}</option>)}
        </select>
        {selectedHall && <div>
            <p>{selectedHall.name}</p>
            <button onClick={reset}>Сбросить</button>
            <button onClick={save}>Сохранить</button>
            <div
                className={style.scheme}
                onDragStart={(e) => { e.preventDefault() }}
            >
                <img
                    src={selectedHall.schemeImg}
                    ref={imgRef}
                    onDragStart={(e) => { e.preventDefault() }}
                    onLoad={() => setRect(imgRef.current?.getBoundingClientRect())}
                />
                {
                    rect && tablesState
                        .filter(table => table.hall_id === selectedHall.id)
                        .map(table => <div
                            key={table.id}
                            className={style.opt}
                            style={{
                                top: `${(rect?.top ?? 0) + table.y * scale}px`,
                                left: `${(rect?.left ?? 0) + table.x * scale}px`,
                            }}
                            onDragStart={(e) => { e.preventDefault() }}
                            onMouseDown={e => handleMDown(e, table)}
                        >
                            {table.table_number}
                        </div>)
                }
            </div>
            <div>
            </div>
        </div>}
    </div>
}