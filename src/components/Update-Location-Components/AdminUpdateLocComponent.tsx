import React, { FunctionComponent, SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField, makeStyles, Container, CssBaseline, Typography, Grid, withStyles } from "@material-ui/core";
import { Link, useParams } from 'react-router-dom';
import { green, lime } from "@material-ui/core/colors";
import {toast} from 'react-toastify'
import { updateLocationErrorReset, adminUpdateLocationActionMapper } from "../../action-mappers/admin-update-location-action-mapper";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers/index";
import { locationProfileActionMapper } from "../../action-mappers/location-profile-action-mapper";
import { Location } from "../../models/Location";

export const AdminUpdateLocationProfileComponent:FunctionComponent<any> = (props) =>{
    const classes = useStyles();

    let { locationId } = useParams()

    //should be the locationProfile state already... sketchy
  
    const [name, changeName] = useState("")
    const [realm, changeRealm] = useState("")
    const [governance, changeGovernance] = useState("")
    const [primaryPopulation, changePrimaryPopulation] = useState("")
    const [description, changeDescription] = useState("")
    
    //need to set these to the location's existing rating, numVisited, and image ARRAY
    // const [rating, changeRating] = useState(0)
    // const [numVisited, changeNumVisited] = useState(0)
    // const [image, changeImage] = useState<any>(undefined)
    // const [latitude, changelatitude] = useState(0)
    // const [longitude, changelongitude] = useState(0)


    const updateName = (e:any) => {
        e.preventDefault()
        changeName(e.currentTarget.value)
    }
    const updateRealm = (e:any) => {
        e.preventDefault()
        changeRealm(e.currentTarget.value)
    }
    const updateGovernance = (e:any) => {
        e.preventDefault()
        changeGovernance(e.currentTarget.value)
    }
    const updatePrimaryPopulation = (e:any) => {
        e.preventDefault()
        changePrimaryPopulation(e.currentTarget.value)
    }
    const updateDescription = (e:any) => {
        e.preventDefault()
        changeDescription(e.currentTarget.value)
    } 

    //this stuff should not be doing anything; no fields for input (but how to set....)
    // const updateNumVisited = (e:any) => {
    //     e.preventDefault()
    //     changeNumVisited(e.currentTarget.value)
    // }

    // const updateImage = (e:any) => {
    //     e.preventDefault()
    //     //type file has array called files, since you could upload multiple. Thus we speficy we want only want the first 
    //     let file:File = e.currentTarget.files[0]
    //     //utlize FileReader - the old way of doing it without promises
    //     let reader = new FileReader()
    //     //start an async function on reader object
    //     reader.readAsDataURL(file)
    //     //set a callback for when it's done reading
    //     reader.onload = () =>{
    //         console.log(reader.result); //to see binary representation of the image
    //         changeImage(reader.result) 
    //     }
    // }
    
    const dispatch = useDispatch()

    //for permissions, get current user
    const user = useSelector((state: IState) => {
      return state.loginState.currUser
    })
    
    const updateThisLocation = async (e:SyntheticEvent) => {
      e.preventDefault()  
      const getLocation = async ()=>{
        //get the locationProfile state 
        let thunk = locationProfileActionMapper(locationId)
        dispatch(thunk)
      }
      if (!locationToUpdate){
        getLocation()
      }
      if(locationToUpdate){
          //if the locationProfile for an id exists, we update it
          let updatingLocation:Location = {
            locationId: locationToUpdate.locationId, 
            name, 
            realm, 
            governance, 
            primaryPopulation, 
            description, 
            rating: locationToUpdate.rating, 
            numVisited: locationToUpdate.numVisited, 
            image: locationToUpdate.image, 
            latitude: locationToUpdate.latitude, 
            longitude: locationToUpdate.longitude
          }     
            let thunk2 = adminUpdateLocationActionMapper(updatingLocation)
            dispatch(thunk2) //is this ok? should be... 
        }
          //call the action mapper function if there is no current location profile
          
    }
    //before update
    const locationToUpdate= useSelector((state:IState) => {
      return state.locationProfileState.profLocation
    })
    console.log(locationToUpdate); //better check....

    //the location state after update
    const updatedLocation= useSelector((state:IState) => {
      return state.locationEditState.edittedLocation
    })
    console.log(updatedLocation); //better check....

    const errorMessage = useSelector((state:IState) => {
      return state.locationEditState.errorMessage
    }) 

    //if there's an error
    useEffect(() => {
      if(errorMessage){
        toast.error(errorMessage)
        dispatch(updateLocationErrorReset())
      }
    })

    useEffect(()=>{
      if(updatedLocation){ //with the updated location
        props.history.push(`/locations/profile/${updatedLocation.locationId}`)

      }
    })

    return (
      (user?.role ==="Admin")?
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Update Location Information
          </Typography>
          <form autoComplete="off" onSubmit={updateThisLocation} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="New Name"
                  name="Name"
                  value={name}
                  onChange={updateName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="realm"
                  label="New Realm"
                  id="realm"
                  value={realm}
                  onChange={updateRealm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="governance"
                  label="New Governance"
                  id="governance"
                  value={governance}
                  onChange={updateGovernance}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="primaryPopulation"
                  label="New Primary Population"
                  name="primary-population"
                  value={primaryPopulation}
                  onChange={updatePrimaryPopulation}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="description"
                  label="Change Description"
                  name="description"
                  value={description}
                  onChange={updateDescription}
                />
              </Grid>
              {/* <br />
              <Typography>
              Profile Picture
              <br/>
              <input type="file" name="file" accept="image/*" onChange={updateImage} />
              <img src={image} width="100%"/>
              <hr />
              </Typography> */}
              <Grid item xs={12} >
                <CustomButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                > Update
                </CustomButton>
              </Grid>
              <Grid item xs={12}>
                <Link to= "/" style={{ textDecoration:"none"}}>
                <CustomButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                > Cancel 
                </CustomButton>
                </Link>
              </Grid>
            </Grid>            
          </form>
        </div>
      </Container>
      :
      <div>
          <h3> You are either not logged in or not worthy</h3>
      </div>
    )
}
const CustomButton = withStyles((theme) => ({
  root: {
      color: theme.palette.getContrastText(lime[700]),
      backgroundColor: "lime[700]",
      '&:hover': {
        backgroundColor: green[900],
      },
  },
}))(Button);

//styles at the bottom because closer to html return
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: lime[700],
      color: 'white',
      //background color?
      fontFamily: "Bookman Old Style",
      fontSize: 16
    },
    media: {

    }
}));