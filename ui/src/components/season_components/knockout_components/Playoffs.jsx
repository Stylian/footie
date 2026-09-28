import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDataLoader} from "../../../DataLoaderManager"
import PageLoader from "../../../PageLoader";
import Slider from "react-slick"

export default function Playoffs({year}) {

    const structure = useDataLoader("/rest/seasons/" + year + "/playoffs/structure")
    const games = useDataLoader("/rest/seasons/" + year + "/playoffs/matches")
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (structure === null || games === null) {
        return (<PageLoader />)
    } else {
        // slider settings
        const settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          adaptiveHeight: true,
          appendDots: dots => (
            <div style={{ paddingTop: "30px" }}> {/* reserve space */}
              <ul style={{ margin: 0 }}> {dots} </ul>
            </div>
          )
        }

        return (
            <Box>
                <Grid container spacing={1}>
                    <Grid item sm={8}>
                        <Card className="page_box">
                            <CardHeader className="big_header" title={"tree view"} align={"center"} titleTypographyProps={{variant: 'h7'}} />
                            <CardContent style={{padding: 0}}>
                                <table className="table tree_table" align={"center"}>

                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="small_header">Â¼ Finals</TableCell>
                                            <TableCell className="small_header tree_vert_dist"></TableCell>
                                            <TableCell className="small_header">Â½ Finals</TableCell>
                                            <TableCell className="small_header tree_vert_dist"></TableCell>
                                            <TableCell className="small_header">Finals</TableCell>
                                            <TableCell className="small_header tree_vert_dist"></TableCell>
                                            <TableCell className="small_header">Champion</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell class={"tree_dist2"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gA3.id}
                                                       onClick={goToTeam}>
                                                {structure.gA3.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.S1.id}
                                                       onClick={goToTeam}>
                                                {structure.S1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gB2.id}
                                                       onClick={goToTeam}>
                                                {structure.gB2.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#e2e4ff'}}
                                                       data-teamid={structure.F1.id}
                                                       onClick={goToTeam}>
                                                {structure.F1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist1"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.gA1.id}
                                                       onClick={goToTeam}>
                                                {structure.gA1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist2"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#b3b8ff'}}
                                                       data-teamid={structure.W1.id}
                                                       onClick={goToTeam}>
                                                {structure.W1.name}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"tree_dist2"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.gB1.id}
                                                       onClick={goToTeam}>
                                                {structure.gB1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist1"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#e2e4ff'}}
                                                       data-teamid={structure.F2.id}
                                                       onClick={goToTeam}>
                                                {structure.F2.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gB3.id}
                                                       onClick={goToTeam}>
                                                {structure.gB3.name}</TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.S2.id}
                                                       onClick={goToTeam}>
                                                {structure.S2.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker team_name"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gA2.id}
                                                       onClick={goToTeam}>
                                                {structure.gA2.name}</TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Slider {...settings}>
                          {/* Â¼ Finals */}
                          <div>
                            <Card className="page_box" style={{ boxShadow: 'none' }} elevation={0}>
                              <CardHeader
                                title={"Â¼ Finals"}
                                align={"center"}
                                className="big_header" titleTypographyProps={{ variant: "h7" }}
                              />
                              <CardContent style={{padding: 0}}>
                                <table className="table" align={"center"}>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="small_header" align="right" style={{ width: "45%", whiteSpace: "nowrap" }}>
                                        Home
                                      </TableCell>
                                      <TableCell className="small_header" style={{ width: "10%" }}>score</TableCell>
                                      <TableCell className="small_header" align="left" style={{ width: "45%", whiteSpace: "nowrap" }}>
                                        Away
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {games.quarters.map((game, index) => {
                                      let winnerExists = game.winner != null
                                      let homeWon = winnerExists && game.winner.id == game.homeTeam.id
                                      let awayWon = winnerExists && game.winner.id == game.awayTeam.id
                                      return (
                                        <TableRow key={index}>
                                          <TableCell
                                            align="right"
                                            className={"teamClicker team_name" + (homeWon ? " winner" : "")}
                                            data-teamid={game.homeTeam.id}
                                            onClick={goToTeam}
                                          >
                                            {game.homeTeam.name}
                                          </TableCell>
                                          {game.result == null ? (
                                            <TableCell></TableCell>
                                          ) : (
                                            <TableCell>
                                              {game.result.goalsMadeByHomeTeam +
                                                " - " +
                                                game.result.goalsMadeByAwayTeam}
                                            </TableCell>
                                          )}
                                          <TableCell
                                            align="left"
                                            className={"teamClicker team_name" + (awayWon ? " winner" : "")}
                                            data-teamid={game.awayTeam.id}
                                            onClick={goToTeam}
                                          >
                                            {game.awayTeam.name}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    })}
                                  </TableBody>
                                </table>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Â½ Finals */}
                          {games.semis.length > 0 && (
                            <div>
                              <Card className="page_box" style={{ boxShadow: 'none' }} elevation={0}>
                                <CardHeader
                                  title={"Â½ Finals"}
                                  align={"center"}
                                  className="big_header" titleTypographyProps={{ variant: "h7" }}
                                />
                                <CardContent style={{padding: 0}}>
                                  <table className="table" align={"center"}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell className="small_header" align="right" style={{ width: "45%", whiteSpace: "nowrap" }}>
                                          Home
                                        </TableCell>
                                        <TableCell className="small_header" style={{ width: "10%" }}>score</TableCell>
                                        <TableCell className="small_header" align="left"
                                          style={{ width: "45%", whiteSpace: "nowrap" }}
                                        >
                                          Away
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {games.semis.map((game, index) => {
                                        let winnerExists = game.winner != null
                                        let homeWon = winnerExists && game.winner.id == game.homeTeam.id
                                        let awayWon = winnerExists && game.winner.id == game.awayTeam.id
                                        return (
                                          <TableRow key={index}>
                                            <TableCell
                                              align="right"
                                              className={"teamClicker team_name" + (homeWon ? " winner" : "")}
                                              data-teamid={game.homeTeam.id}
                                              onClick={goToTeam}
                                            >
                                              {game.homeTeam.name}
                                            </TableCell>
                                            {game.result == null ? (
                                              <TableCell></TableCell>
                                            ) : (
                                              <TableCell>
                                                {game.result.goalsMadeByHomeTeam +
                                                  " - " +
                                                  game.result.goalsMadeByAwayTeam}
                                              </TableCell>
                                            )}
                                            <TableCell
                                              align="left"
                                              className={"teamClicker team_name" + (awayWon ? " winner" : "")}
                                              data-teamid={game.awayTeam.id}
                                              onClick={goToTeam}
                                            >
                                              {game.awayTeam.name}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      })}
                                    </TableBody>
                                  </table>
                                </CardContent>
                              </Card>
                            </div>
                          )}

                          {/* Finals */}
                          {games.finals.length > 0 && (
                            <div>
                              <Card className="page_box" style={{ boxShadow: 'none' }} elevation={0}>
                                <CardHeader
                                  title={"Finals"}
                                  align={"center"}
                                  className="big_header" titleTypographyProps={{ variant: "h7" }}
                                />
                                <CardContent style={{padding: 0}}>
                                  <table className="table" align={"center"}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell className="small_header" align="right" style={{ width: "45%", whiteSpace: "nowrap" }}>
                                          Home
                                        </TableCell>
                                        <TableCell className="small_header" style={{ width: "10%" }}>score</TableCell>
                                        <TableCell className="small_header" align="left"
                                          style={{ width: "45%", whiteSpace: "nowrap" }}
                                        >
                                          Away
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {games.finals.map((game, index) => {
                                        let winnerExists = game.winner != null
                                        let homeWon = winnerExists && game.winner.id == game.homeTeam.id
                                        let awayWon = winnerExists && game.winner.id == game.awayTeam.id
                                        return (
                                          <TableRow key={index}>
                                            <TableCell
                                              align="right"
                                              className={"teamClicker team_name" + (homeWon ? " winner" : "")}
                                              data-teamid={game.homeTeam.id}
                                              onClick={goToTeam}
                                            >
                                              {game.homeTeam.name}
                                            </TableCell>
                                            {game.result == null ? (
                                              <TableCell></TableCell>
                                            ) : (
                                              <TableCell>
                                                {game.result.goalsMadeByHomeTeam +
                                                  " - " +
                                                  game.result.goalsMadeByAwayTeam}
                                              </TableCell>
                                            )}
                                            <TableCell
                                              align="left"
                                              className={"teamClicker team_name" + (awayWon ? " winner" : "")}
                                              data-teamid={game.awayTeam.id}
                                              onClick={goToTeam}
                                            >
                                              {game.awayTeam.name}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      })}
                                    </TableBody>
                                  </table>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Slider>
                      </Grid>
                    </Grid>
                  </Box>
                )
              }
            }
