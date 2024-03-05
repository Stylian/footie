export function saveTag(tagValue, year, phase, setTabActive, setLoaded) {

    fetch("/rest/persist/tabs/" + phase + "/" + year, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: tagValue
    })
        .then(res => res.json())
        .then(
            () => {
                setTabActive(tagValue);
            },
            (error) => {
                setLoaded(true);
                console.error('Error:', error);
            }
        )
}
export function getTag(year, phase, setTabActive, setLoaded) {
    fetch("/rest/persist/tabs/" + phase + "/" + year)
        .then(res => res.json())
        .then(
            (result) => {
                setTabActive(result);
                setLoaded(true);
            },
            (error) => {
                setLoaded(true);
                console.error('Error:', error);
            }
        )
}