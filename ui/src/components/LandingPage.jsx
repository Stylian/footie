import React from 'react'
import LeagueToolbar from "./LeagueToolbar"
import {Redirect} from "react-router"
import {useDataLoader} from "../DataLoaderManager"
export default function LandingPage() {

    const currentDisplayedSeason = useDataLoader("/rest/seasons/")

    if (currentDisplayedSeason === null) {
        return (<div>Loading...</div>)
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
