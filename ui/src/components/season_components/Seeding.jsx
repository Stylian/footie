import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core"
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
                <Card style={{margin: 20}}>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: '#2c3e50',
                        paddingBottom: 1,
                        borderBottom: '2px solid #3498db',
                        marginBottom: 2
                      }}
                    >
                      Coefficients
                    </Typography>
                    <Grid container>
                        <Grid item sm={10}>
                            <Grid container spacing={1}>
                                <Grid item sm={6}>
                                    <table className="table" align={"center"}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{width: '15%'}}>Pos</TableCell>
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
                                </Grid>

                                <Grid item sm={6}>
                                    <table className="table" align={"center"}>
                                        <TableHead>
                                            <TableRow>
                                               <TableCell style={{width: '15%'}}>Pos</TableCell>
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
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sm={2}>
                            <table className="table" align={"center"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Seeding</TableCell>
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
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        )
    }
}