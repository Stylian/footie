import React, {useState, useEffect} from 'react';
import {
    AppBar,
    Box,
    Tab,
    Tabs
} from "@material-ui/core";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";
import {getTag, saveTag} from "../../TabsPersistanceManager";

export default function Groups2({year}) {
    const phase = "groups2"

    const [tabActive, setTabActive] = useState(0);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        getTag(year, phase, setTabActive)
            .then(setTabActive)
            .then(() => setLoaded(true))

    }, []);

    const handleChange = (_, tagValue) => saveTag(tagValue, year, phase)
                                                .then(setTabActive)

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Box style={{margin: 10, marginTop: 10}}>
                <AppBar position="static">
                    <Tabs value={tabActive} onChange={handleChange}>
                        <Tab label="Groups"/>
                        <Tab label="Matches"/>
                    </Tabs>
                </AppBar>

                {tabActive === 0 && <GroupsDisplay year={year} round={2}/>}
                {tabActive === 1 && <GroupsMatches year={year} round={2}/>}
            </Box>
        )
    }
}
