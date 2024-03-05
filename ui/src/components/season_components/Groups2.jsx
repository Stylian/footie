import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Tab,
    Tabs
} from "@material-ui/core";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";

export default function Groups2({year}, {stage}) {
    const [tabActive, setTabActive] = useState(0);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch("/rest/persist/tabs/groups2/" + year)
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
        fetch("/rest/persist/tabs/groups2/" + year, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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

    return (
        isLoaded ? (
            <Box style={{ margin: 10, marginTop: 10 }}>
                <AppBar position="static">
                    <Tabs value={tabActive} onChange={handleChange}>
                        <Tab label="Groups"/>
                        <Tab label="Matches"/>
                    </Tabs>
                </AppBar>

                {tabActive === 0 && <GroupsDisplay year={year} round={2}/>}
                {tabActive === 1 && <GroupsMatches year={year} round={2}/>}
            </Box>
        ) : (
            <span></span>
        )
    );
}
