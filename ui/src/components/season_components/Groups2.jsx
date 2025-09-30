import {AppBar, Box, Tab, Tabs} from "@material-ui/core"
import GroupsMatches from "./groups_components/GroupsMatches"
import GroupsDisplay from "./groups_components/GroupsDisplay"
import {useTab} from "../../TabsPersistanceManager"
export default function Groups2({year}) {
    const {tabActive, handleChangeTab} = useTab(year, "groups2")

    return (
        <Box style={{margin: 10, marginTop: 10}}>
              {/* avoid color="primary" so the global .MuiAppBar-colorPrimary rule won't apply */}
              <AppBar position="static" color="default" elevation={0} style={{ background: "transparent", boxShadow: "none" }}>
                <Tabs
                  value={tabActive}
                  onChange={handleChangeTab}
                  TabIndicatorProps={{ style: { backgroundColor: "#1f6d93", height: 2 } }}
                >
                    <Tab label="Groups" style={{ color: "#1f6d93", textTransform: "none" }}/>
                    <Tab label="Matches" style={{ color: "#1f6d93", textTransform: "none" }}/>
                </Tabs>
            </AppBar>

            {tabActive === 0 && <GroupsDisplay year={year} round={2}/>}
            {tabActive === 1 && <GroupsMatches year={year} round={2}/>}
        </Box>
    )
}
