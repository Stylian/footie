import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import GroupsSeeding from "./groups_components/GroupsSeeding";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";
import {useParams} from "react-router";

export default function Groups1({year}, {stage}) {
    const [tabActive, setTabActive] = useState(0);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch("/rest/persist/tabs/groups1/" + year)
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
    }, []);

    const handleChange = (event, newValue) => {
        fetch("/rest/persist/tabs/groups1/" + year, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: newValue
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setTabActive(newValue);
                },
                (error) => {
                    setLoaded(true);
                    console.error('Error:', error);
                }
            )
    }

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
