import {useEffect, useState} from "react";
export function useDataLoader(url, runAfter) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .then(runAfter)
    }, []);

    return data
}