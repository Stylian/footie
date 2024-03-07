import React from 'react'
import {AppBar, Box, Tab, Tabs} from "@material-ui/core"
import GroupsSeeding from "./groups_components/GroupsSeeding"
import GroupsMatches from "./groups_components/GroupsMatches"
import GroupsDisplay from "./groups_components/GroupsDisplay"
import {useTab} from "../../TabsPersistanceManager"

export default function Groups1({year, stage}) {
    const {tabActive, handleChangeTab} = useTab(year, "groups1")

    return (
        <Box style={{margin: 10, marginTop: 10}}>
            <AppBar position="static">
                <Tabs value={tabActive} onChange={handleChangeTab}>
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
