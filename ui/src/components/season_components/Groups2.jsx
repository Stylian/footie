import {AppBar, Box, Tab, Tabs} from "@material-ui/core"
import GroupsMatches from "./groups_components/GroupsMatches"
import GroupsDisplay from "./groups_components/GroupsDisplay"
import {useTab} from "../../TabsPersistanceManager"
export default function Groups2({year}) {
    const {tabActive, handleChangeTab} = useTab(year, "groups2")

    return (
        <Box style={{margin: 10, marginTop: 10}}>
            <AppBar position="static">
                <Tabs value={tabActive} onChange={handleChangeTab}>
                    <Tab label="Groups"/>
                    <Tab label="Matches"/>
                </Tabs>
            </AppBar>

            {tabActive === 0 && <GroupsDisplay year={year} round={2}/>}
            {tabActive === 1 && <GroupsMatches year={year} round={2}/>}
        </Box>
    )
}
