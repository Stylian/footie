import {Box, Card, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import goldmedal from "../../icons/goldmedal.png"
import silvermedal from "../../icons/silvermedal.png"
import Numeral from "numeral"
import {useDataLoader} from "../../DataLoaderManager";
import PageLoader from "../../PageLoader";
export default function Seeding({year}) {
    const teams = useDataLoader("/rest/seasons/" + year + "/seeding")
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (teams === null) {
        return (<PageLoader />)
    } else {
        let half_length = Math.ceil(teams.length / 2)
        let leftSide = teams.slice(0, half_length)
        let rightSide = teams.slice(half_length)
        return (
            <Box>
                <Card style={{margin: 20, boxShadow: 'none'}} elevation={0}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'max-content', marginTop: 10 }}>
                            <div className="section-title" style={{alignSelf: 'stretch'}}>Coefficients</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <div style={{ margin: 10 }}>
                                <table className="table" align={"left"}>
                                    <TableHead className="match-table-head">
                                        <TableRow>
                                            <TableCell align="right" style={{width: '15%'}}>Pos</TableCell>
                                             <TableCell style={{width: '60%'}}>Team</TableCell>
                                             <TableCell style={{width: '25%'}}>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leftSide.map((team, index) => {
                                            return (
                                                <TableRow className={"teamClicker"}
                                                          data-teamid={team.id}
                                                          onClick={goToTeam}
                                                          style={year === 1 ? {} : {
                                                              backgroundColor:
                                                                  (team.seed === "CHAMPION") ? '#d9edf7' :
                                                                      (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                          (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                              (team.seed === "TO_QUALS_1") ? '#fdf9e8' :
                                                                                  '#f2dede'
                                                          }}
                                                >
                                                    <TableCell style={{width: '15%'}} align="right">{index + 1}</TableCell>
                                                            <TableCell style={{width: '60%'}}>
                                                              {team.trophies.map((trophy, trophyIndex) => {
                                                                if (trophy.seasonNum === (year - 1)) {
                                                                  return trophy.type === "W" ? (
                                                                    <img
                                                                      key={trophyIndex}
                                                                      src={goldmedal}
                                                                      alt="1st place"
                                                                      title="1st place"
                                                                    />
                                                                  ) : (
                                                                    <img
                                                                      key={trophyIndex}
                                                                      src={silvermedal}
                                                                      alt="2nd place"
                                                                      title="2nd place"
                                                                    />
                                                                  );
                                                                }
                                                                return null;
                                                              })}
                                                              {team.name}
                                                            </TableCell>
                                                            <TableCell style={{width: '25%'}} align="right">
                                                              {Numeral(team.coefficients / 1000).format('0.000')}
                                                            </TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </div>

                            <div style={{ margin: 10 }}>
                                <table className="table" align={"left"}>
                                    <TableHead className="match-table-head">
                                        <TableRow>
                                           <TableCell align="right" style={{width: '15%'}}>Pos</TableCell>
                                           <TableCell style={{width: '60%'}}>Team</TableCell>
                                           <TableCell style={{width: '25%'}}>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rightSide.map((team, index) => {
                                            return (
                                                <TableRow className={"teamClicker"}
                                                          data-teamid={team.id}
                                                          onClick={goToTeam}
                                                          style={year === 1 ? {} : {
                                                              backgroundColor:
                                                                  (team.seed === "CHAMPION") ? '#d9edf7' :
                                                                      (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                          (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                              (team.seed === "TO_QUALS_1") ? '#fdf9e8' :
                                                                                  '#f2dede'
                                                          }}
                                                >
                                                      <TableCell style={{width: '15%'}} align="right">{index + 1+ leftSide.length}</TableCell>
                                                       <TableCell style={{width: '60%'}}>
                                                         {team.trophies.map((trophy, trophyIndex) => {
                                                           if (trophy.seasonNum === (year - 1)) {
                                                             return trophy.type === "W" ? (
                                                               <img
                                                                 key={trophyIndex}
                                                                 src={goldmedal}
                                                                 alt="1st place"
                                                                 title="1st place"
                                                               />
                                                             ) : (
                                                               <img
                                                                 key={trophyIndex}
                                                                 src={silvermedal}
                                                                 alt="2nd place"
                                                                 title="2nd place"
                                                               />
                                                             );
                                                           }
                                                           return null;
                                                         })}
                                                         {team.name}
                                                       </TableCell>
                                                       <TableCell style={{width: '25%'}} align="right">
                                                         {Numeral(team.coefficients / 1000).format('0.000')}
                                                       </TableCell>
                                                </TableRow>)
                                        })}
</TableBody>
                                 </table>
                             </div>
                         </div>
                        </div>

<div style={{ margin: 10, width: 'fit-content' }}>
                            <div className="section-title" style={{alignSelf: 'stretch'}}>Seeding</div>
                            <table className="table" align={"left"} style={{marginTop: 10}}>
                                <TableHead className="match-table-head">
                                    <TableRow>
                                        <TableCell>Phases</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow style={{backgroundColor: '#d9edf7'}}>
                                        <TableCell>group stage</TableCell>
                                    </TableRow>
                                    <TableRow style={{backgroundColor: '#dff0d8'}}>
                                        <TableCell>play-off round</TableCell>
                                    </TableRow>
                                    <TableRow style={{backgroundColor: '#fdf9e8'}}>
                                        <TableCell>qualifying round</TableCell>
                                    </TableRow>
                                    <TableRow style={{backgroundColor: '#f2dede'}}>
                                        <TableCell>preliminary round</TableCell>
                                    </TableRow>
                                </TableBody>
                            </table>
                        </div>
                    </div>
                </Card>
            </Box>
        )
    }
}