import React from 'react';
import {AppBar, Box, Tab, Tabs} from "@material-ui/core";
import Rules from "./knockout_components/Rules";
import Playoffs from "./Playoffs";
import KnockoutOdds from "./knockout_components/KnockoutOdds";
import {useTab} from "../../TabsPersistanceManager";

export default function Knockouts({year}) {
    const {tabActive, handleChangeTab} = useTab(year, "knockouts")

    return (
        <Box style={{margin: 10, marginTop: 10}}>
            <AppBar position="static">
                <Tabs value={tabActive} onChange={handleChangeTab}>
                    <Tab label="Brackets"/>
                    <Tab label="Rules"/>
                    <Tab label="Odds"/>
                </Tabs>
            </AppBar>

            {tabActive === 0 && <Playoffs year={year}/>}
            {tabActive === 1 && <Rules/>}
            {tabActive === 2 && <KnockoutOdds year={year}/>}
        </Box>
    )
}
