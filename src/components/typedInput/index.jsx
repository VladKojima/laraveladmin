export function TypedInput({ type, ...props }) {
    if (type === 'id')
        return <p>{props.value}</p>

    if (['number', 'text', 'date', 'checkbox'].includes(type))
        return <input
            {...props}
            type={type ?? 'text'}
        />

    if (type instanceof Array) {
        return <select {...props}>
            {type.map(t => <option key={t} value={t}>
                {t}
            </option>)}
        </select>
    }
}