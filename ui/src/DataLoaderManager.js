import {useEffect, useState} from "react";

export function useDataLoader(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
    }, []);

    return data
}