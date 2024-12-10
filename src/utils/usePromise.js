import { useCallback, useState } from "react";

const statuses = ["inited", "pending", "fulfilled", "rejected"];

export function usePromise(promise) {
    const [status, setStatus] = useState("inited");

    const [value, setValue] = useState();
    const [error, setError] = useState();

    const start = useCallback((...props) => {
        setStatus('pending');
        setValue(undefined);
        setError(undefined);
        promise(...props)
            .then(result => { setValue(result); setStatus("fulfilled") })
            .catch(error => { setError(error); setStatus("rejected") });
    }, [promise]);

    return [start, status, value, error];
}