import {AppBar, Box, Tab, Tabs} from "@material-ui/core"
import Rules from "./knockout_components/Rules"
import Playoffs from "./knockout_components/Playoffs"
import KnockoutOdds from "./knockout_components/KnockoutOdds"
import {useTab} from "../../TabsPersistanceManager"
export default function Knockouts({year}) {
    const {tabActive, handleChangeTab} = useTab(year, "knockouts")

    return (
        <Box style={{margin: 10, marginTop: 10}}>
              {/* avoid color="primary" so the global .MuiAppBar-colorPrimary rule won't apply */}
              <AppBar position="static" color="default" elevation={0} style={{ background: "transparent", boxShadow: "none" }}>
                <Tabs
                  value={tabActive}
                  onChange={handleChangeTab}
                  TabIndicatorProps={{ style: { backgroundColor: "#1f6d93", height: 2 } }}
                >
                    <Tab label="Brackets" style={{ color: "#1f6d93", textTransform: "none" }}/>
{/*                     <Tab label="Rules" style={{ color: "#1f6d93", textTransform: "none" }}/> */}
                    <Tab label="Odds" style={{ color: "#1f6d93", textTransform: "none" }}/>
                </Tabs>
            </AppBar>

            {tabActive === 0 && <Playoffs year={year}/>}
{/*             {tabActive === 1 && <Rules/>} */}
            {tabActive === 1 && <KnockoutOdds year={year}/>}
        </Box>
    )
}
