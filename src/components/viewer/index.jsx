import { useState } from 'react';
import style from './style.module.css';
import { AboutPage } from '../../pages/aboutpage';
import { TableViewer } from '../../pages/tableviewer';
import { TablePosTool } from '../../pages/tablepos';

const pages = {
    'about': 'Инф-ция о кафе',
    'tableview': 'Таблицы',
    'tablepos': 'Расстановка столов'
}

const pagesComponents = {
    'about': AboutPage,
    'tableview': TableViewer,
    'tablepos': TablePosTool
}

export function Viewer() {
    const [page, setPage] = useState();

    const Component = pagesComponents[page];

    return <div>
        <div className={style.menu}>
            {Object.keys(pages).map(p => <button
                onClick={() => setPage(p)}
                key={p}
            >
                {pages[p]}
            </button>)}
        </div>
        <div className={style.window}>
            {page && <Component />}
        </div>
    </div>
}