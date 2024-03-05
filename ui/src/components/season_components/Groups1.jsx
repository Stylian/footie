import React, {useEffect, useState} from 'react';
import {AppBar, Box, Tab, Tabs} from "@material-ui/core";
import GroupsSeeding from "./groups_components/GroupsSeeding";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";
import {getTag, saveTag} from "../../TabsPersistanceManager";

export default function Groups1({year}, {stage}) {
    const phase = "groups1"

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
                        <Tab label="Seeding"/>
                        <Tab disabled={(stage === "ON_PREVIEW" || stage === "NOT_STARTED")} label="Groups"/>
                        <Tab disabled={(stage === "ON_PREVIEW" || stage === "NOT_STARTED")} label="Matches"/>
                    </Tabs>
                </AppBar>
                {tabActive === 0 && <GroupsSeeding year={year} round={1} haveToSetUpTeams={stage === "ON_PREVIEW"}/>}
                {tabActive === 1 && <GroupsDisplay year={year} round={1}/>}
                {tabActive === 2 && <GroupsMatches year={year} round={1}/>}
            </Box>
        )
    }
}
