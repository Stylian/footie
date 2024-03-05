import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import Rules from "./knockout_components/Rules";
import Playoffs from "./Playoffs";
import KnockoutOdds from "./knockout_components/KnockoutOdds";

export default function Knockouts({year}) {
    const [tabActive, setTabActive] = useState(0);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch("/rest/persist/tabs/knockouts/" + year)
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
    }, [year]);

    const handleChange = (event, newValue) => {
        fetch("/rest/persist/tabs/knockouts/" + year, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newValue
        })
            .then(res => res.json())
            .then(
                () => {
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
                        <Tab label="Brackets"/>
                        <Tab label="Rules"/>
                        <Tab label="Odds"/>
                    </Tabs>
                </AppBar>

                {tabActive === 0 && <Playoffs year={year} />}
                {tabActive === 1 && <Rules/>}
                {tabActive === 2 && <KnockoutOdds year={year} />}
            </Box>
        )
    }
}
