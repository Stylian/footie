import React from 'react'
import {AppBar, Box, Tab, Tabs} from "@material-ui/core"
import QualsSeeding from "./quals_components/QualsSeeding"
import QualsMatches from "./quals_components/QualsMatches"
import {useTab} from "../../TabsPersistanceManager"

export default function Quals({year, round, stage}) {
    const {tabActive, handleChangeTab} = useTab(year, "quals" + round)

    return (
        <Box style={{margin: 10, "margin-top": 10}}>
            <AppBar position="static">
                <Tabs value={tabActive} onChange={handleChangeTab}>
                    <Tab label="Seeding"/>
                    <Tab disabled={(stage === "ON_PREVIEW" || stage === "NOT_STARTED")} label="Matches"/>
                </Tabs>
            </AppBar>
            {tabActive === 0 && <QualsSeeding year={year} round={round} haveToSetUpTeams={stage === "ON_PREVIEW"}/>}
            {tabActive === 1 && <QualsMatches year={year} round={round}/>}
        </Box>
    )
}
