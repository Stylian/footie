import LeagueToolbar from "./LeagueToolbar"
import {Redirect} from "react-router"
import {useDataLoader} from "../DataLoaderManager"
import PageLoader from "./PageLoader";
export default function LandingPage() {

    const currentDisplayedSeason = useDataLoader("/rest/seasons/")

    if (currentDisplayedSeason === null) {
        return (<PageLoader />)
    } else {
        if(currentDisplayedSeason > 0) {
            return (
                <div>
                    <LeagueToolbar pageTitle={"Landing Page"}/>
                    <Redirect to={"/season/" + currentDisplayedSeason}/>
                </div>
            )
        }else {
            return (
                <div>
                    <LeagueToolbar pageTitle={"Landing Page"}/>
                    <Redirect to={"/admin"}/>
                </div>
            )
        }
    }
}
