import React, {useEffect, useState} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Redirect} from "react-router";

function LandingPage() {

    const [pageTitle] = useState("Landing Page")
    const [currentDisplayedSeason, setCurrentDisplayedSeason] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch("/rest/seasons/")
            .then(res => res.json())
            .then(
                (result) => {

                    setCurrentDisplayedSeason(result)
                    setIsLoaded(true)

                },
                () => {
                    setIsLoaded(true)
                }
            )
    });

    return isLoaded ?
        currentDisplayedSeason > 0 ? (
            <div>
                <LeagueToolbar pageTitle={pageTitle}/>
                <Redirect to={"/season/"+currentDisplayedSeason} />

            </div>
        ) : (
            <div>
                <LeagueToolbar pageTitle={pageTitle}/>
                <Redirect to={"/admin"} />

            </div>
        )
        : null

}

export default LandingPage;
