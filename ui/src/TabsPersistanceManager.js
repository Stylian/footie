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

function stateWithTab(tabs, phase, value) {
    return {...(tabs || {}), [phase]: value}
}

export function useTab(year, phase) {
    const [tabActive, setTabActive] = useState(0);

    useEffect(() => {
        getTag(year, phase)
            .then((tag) => {
                const value = (tag === null || tag === undefined) ? 0 : tag
                setTabActive(value)
                const state = window.history.state || {}
                if (state.tabs && state.tabs[phase] !== undefined) {
                    return
                }
                window.history.replaceState(
                    {...state, tabs: stateWithTab(state.tabs, phase, value)},
                    "",
                    window.location.href
                )
            })

        const onPopState = (event) => {
            const state = event.state
            if (state && state.tabs && state.tabs[phase] !== undefined) {
                setTabActive(state.tabs[phase])
            }
        }
        window.addEventListener("popstate", onPopState)
        return () => window.removeEventListener("popstate", onPopState)
    }, []);

    const handleChangeTab = (_, tagValue) => {
        const state = window.history.state || {}
        window.history.pushState(
            {...state, tabs: stateWithTab(state.tabs, phase, tagValue)},
            "",
            window.location.href
        )
        return saveTag(tagValue, year, phase)
            .then(setTabActive)
    }

    return {tabActive, handleChangeTab}
}
