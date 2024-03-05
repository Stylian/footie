import {useEffect, useState} from "react";

export async function saveTag(tagValue, year, phase) {
    try {
        await fetch("/rest/persist/tabs/" + phase + "/" + year, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: tagValue
        })
        return tagValue;
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getTag(year, phase) {
    try {
        const response = await fetch("/rest/persist/tabs/" + phase + "/" + year);
        return await response.json()
    } catch (error) {
        console.error('Error:', error);
    }
}
export function useTab(year, phase) {
    const [tabActive, setTabActive] = useState(0);

    useEffect(() => {
        getTag(year, phase)
            .then(setTabActive)

    }, []);

    const handleChangeTab = (_, tagValue) => saveTag(tagValue, year, phase)
        .then(setTabActive)

    return {tabActive, handleChangeTab}
}