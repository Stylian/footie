import {AppBar, Box, Tab, Tabs} from "@material-ui/core"
import GroupsSeeding from "./groups_components/GroupsSeeding"
import GroupsMatches from "./groups_components/GroupsMatches"
import GroupsDisplay from "./groups_components/GroupsDisplay"
import {useTab} from "../../TabsPersistanceManager"
export default function Groups1({year, stage}) {
    const {tabActive, handleChangeTab} = useTab(year, "groups1")

    return (
        <Box style={{margin: 10, marginTop: 10}}>
              {/* avoid color="primary" so the global .MuiAppBar-colorPrimary rule won't apply */}
              <AppBar position="static" color="default" elevation={0} style={{ background: "transparent", boxShadow: "none" }}>
                <Tabs
                  value={tabActive}
                  onChange={handleChangeTab}
                  TabIndicatorProps={{ style: { backgroundColor: "#1f6d93", height: 2 } }}
                >
                    <Tab label="Seeding" style={{ color: "#1f6d93", textTransform: "none" }}/>
                    <Tab disabled={(stage === "ON_PREVIEW" || stage === "NOT_STARTED")} label="Groups" style={{ color: "#1f6d93", textTransform: "none" }}/>
                    <Tab disabled={(stage === "ON_PREVIEW" || stage === "NOT_STARTED")} label="Matches" style={{ color: "#1f6d93", textTransform: "none" }}/>
                </Tabs>
            </AppBar>
            {tabActive === 0 && <GroupsSeeding year={year} round={1} haveToSetUpTeams={stage === "ON_PREVIEW"}/>}
            {tabActive === 1 && <GroupsDisplay year={year} round={1}/>}
            {tabActive === 2 && <GroupsMatches year={year} round={1}/>}
        </Box>
    )
}
