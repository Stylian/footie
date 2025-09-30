import {AppBar, Box, Tab, Tabs} from "@material-ui/core"
import QualsSeeding from "./quals_components/QualsSeeding"
import QualsMatches from "./quals_components/QualsMatches"
import {useTab} from "../../TabsPersistanceManager"
export default function Quals({year, round, stage}) {
    const {tabActive, handleChangeTab} = useTab(year, "quals" + round)

    return (
        <Box style={{ margin: 10, marginTop: 10 }}>
              {/* avoid color="primary" so the global .MuiAppBar-colorPrimary rule won't apply */}
              <AppBar position="static" color="default" elevation={0} style={{ background: "transparent", boxShadow: "none" }}>
                <Tabs
                  value={tabActive}
                  onChange={handleChangeTab}
                  TabIndicatorProps={{ style: { backgroundColor: "#1f6d93", height: 2 } }}
                >
                  <Tab label="Seeding" style={{ color: "#1f6d93", textTransform: "none" }} />
                  <Tab
                    disabled={stage === "ON_PREVIEW" || stage === "NOT_STARTED"}
                    label="Matches"
                    style={{ color: "#1f6d93", textTransform: "none" }}
                  />
                </Tabs>
              </AppBar>

              {tabActive === 0 && <QualsSeeding year={year} round={round} haveToSetUpTeams={stage === "ON_PREVIEW"} />}
              {tabActive === 1 && <QualsMatches year={year} round={round} />}
            </Box>
    )
}
