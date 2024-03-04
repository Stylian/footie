import React, {useEffect, useState} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Redirect} from "react-router";


export default function LandingPage() {

    const [pageTitle] = useState("Landing Page")
    const [currentDisplayedSeason, setCurrentDisplayedSeason] = useState(0)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch("/rest/seasons/")
            .then(res => res.json())
            .then(
                (result) => {
                    setCurrentDisplayedSeason(result)
                    setLoaded(true)
                }, (error) => {
                    console.error('Error:', error)
                    setLoaded(true)
                });
    }, []);

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {
        if(currentDisplayedSeason > 0) {
            return (
                <div>
                    <LeagueToolbar pageTitle={pageTitle}/>
                    <Redirect to={"/season/" + currentDisplayedSeason}/>
                </div>
            )
        }else {
            return (
                <div>
                    <LeagueToolbar pageTitle={pageTitle}/>
                    <Redirect to={"/admin"}/>
                </div>
            )
        }
    }
}

