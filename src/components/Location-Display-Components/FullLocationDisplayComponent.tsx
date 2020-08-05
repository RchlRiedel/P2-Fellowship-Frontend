//display a location's profile in detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react'
import { useParams, Redirect } from 'react-router'
import { Grid, Paper, makeStyles, createStyles, Theme, CardActionArea, Card, CardContent, Typography, Hidden, CardMedia, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Location } from '../../models/Location';
import { getLocationProfile } from '../../remote/location-service/getLocationProfile';

//rough suggestion of how to grab images form LocationImage[]:
// while(x<length(image array)){
//     if(image[x]){
//         display image
        
//     }
    
// }


interface ILocationDisplayProps {
    location: Location
}

const useStyles = makeStyles({
    root: {
        margin: "auto",
        minWidth: 275,
        maxWidth: 500
    },
    media: {
        height: "auto",
        width: "100%",
        margin: "auto",
    },
    name: {
        fontSize: 20,
        fontFamily: "Bookman Old Style"
    },
    info: {
        color: "textSecondary",
        fontFamily: "Bookman Old Style"
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});


export const FullLocationProfileComponent: FunctionComponent<ILocationDisplayProps> = (props) => {
    const [locationProfile, changelocationProfile] = useState<Location | null>(null)
    let { location_Id } = useParams()

    const classes = useStyles();

    useEffect(() => {
        //we define an async operation we want to run
        let getLocation = async () => {
            //we await user info and then call a state updat function with it
            let locationInfo = await getLocationProfile(location_Id)
            changelocationProfile(locationInfo)
        }
        //if we haven't gotten a user profile yet
        if (!locationProfile || locationProfile.locationId !== +location_Id) {
            //go get the user
            getLocation()
        }
        //else do nothing
    })
    //use a grid display instead? 
    return (

        (locationProfile) ?
            <div>

                <Grid item xs={12} md={6}>
                    <CardActionArea component="a" href="#">

                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    {/*insert image array somewhere here */}

                                    <Typography component="h2" variant="h5">
                                        NAME: {locationProfile?.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        REALM: {locationProfile.realm}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        GOVERNANCE: {locationProfile.governance}
                                    </Typography>
                                    <Link to='/contact'>
                                        PRIMARY POPULATION: {locationProfile.primaryPopulation}
                                    </Link>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        DESCRIPTION: {locationProfile.description}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        RATING: {locationProfile.rating}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        NUMBER OF VISITORS: {locationProfile.numVisited}
                                    </Typography>
                                </CardContent>
                            </div>

                        </Card>
                    </CardActionArea>
                </Grid>


            </div>

            :
            <div>
                <h3> Location Not Found</h3>
            </div>
    )

}