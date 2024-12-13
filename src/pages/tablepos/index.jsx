import { useState, useRef, useEffect } from "react"
import { get, listRoutes, put } from "../../api/api";
import style from './style.module.css';
import { changedSymbol } from '../../utils/symbols';
import Loading from "../../components/loading";
import { usePromise } from "../../utils/usePromise";

export function TablePosTool() {
    const [tablesState, setTablesState] = useState([]);

    const [selectedHall, setSelectedHall] = useState(null);

    const [load, loadingStatus, data] = usePromise(() => Promise.all([
        get(listRoutes.Table),
        get(listRoutes.Hall)
    ]));

    const [save, savingStatus] = usePromise(() => put(listRoutes.Table, tablesState
        .filter(table => table[changedSymbol])));

    const [tables, halls] = data ?? [[], []];

    useEffect(() => { if (!!tables.length) reset() }, [tables]);

    useEffect(() => {
        if (!!halls.length && !selectedHall)
            setSelectedHall(halls[0])
    }, [halls])

    useEffect(() => {
        load();

        const handler = resetRect;

        window.addEventListener('resize', handler);

        return () => window.removeEventListener('resize', handler);
    }, []);

    useEffect(() => {
        if (savingStatus === 'fulfilled')
            load();
    }, [savingStatus])

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
                x: Math.round(parseInt(draggable.current.style.left) / scale),
                y: Math.round(parseInt(draggable.current.style.top) / scale),
                [changedSymbol]: true
            };
        }))
    }

    function handleMMove({ pageY, pageX }) {
        draggable.current.style.left = clamp(
            pageX - rect.left - draggable.current.offsetWidth / 2,
            0,
            rect.width - draggable.current.getBoundingClientRect().width
        ) + 'px';

        draggable.current.style.top = clamp(
            pageY - rect.top - draggable.current.offsetHeight / 2,
            0,
            rect.height - draggable.current.getBoundingClientRect().height
        ) + 'px';
    }

    function reset() {
        setTablesState(tables);
    }

    function resetRect() {
        setRect(imgRef.current?.getBoundingClientRect());
    }

    return <div>
        <Loading status={loadingStatus} onRetry={load} />
        <Loading status={savingStatus} loadingMsg={"Идет сохранение..."} errorMsg={"Не удалось выполнить сохранение. Повторите попытку."} />
        {loadingStatus === 'fulfilled' && <>
            <select
                onChange={
                    ({ target: { value } }) => {
                        setSelectedHall(
                            halls.find(hall => hall.id === +value)
                        );
                        resetRect();
                    }
                }
            >
                {halls.map(hall => <option key={hall.id} value={hall.id}>{hall.id}: {hall.name}</option>)}
            </select>
            {selectedHall && <div className={style.editor}>
                <p>{selectedHall.name}</p>
                <button onClick={reset} disabled={savingStatus === 'pending'}>Сбросить</button>
                <button onClick={save} disabled={savingStatus === 'pending'}>Сохранить</button>
                <div
                    className={style.scheme}
                    onDragStart={(e) => { e.preventDefault() }}
                >
                    <img
                        src={selectedHall.schemeImg}
                        ref={imgRef}
                        onDragStart={(e) => { e.preventDefault() }}
                        onLoad={resetRect}
                    />
                    {
                        rect && tablesState
                            .filter(table => table.hall_id === selectedHall.id)
                            .map(table => <div
                                key={table.id}
                                className={style.opt}
                                style={{
                                    top: `${table.y * scale}px`,
                                    left: `${table.x * scale}px`,
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
        </>}
    </div>
}