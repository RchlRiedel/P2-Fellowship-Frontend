//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FullUserDisplayComponent } from '../User-Display-Components/FullUserDisplayComponent'
import { UserCardDisplayComponent } from '../User-Display-Components/UserCardDisplayComponent'
import { User } from '../../models/User'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IState } from '../../reducers'
import { getUserProfile } from '../../remote/user-service/getUserProfile'
import { useParams } from 'react-router'

//navbar - admin update location 
export const UserProfileComponent:FunctionComponent<any> = (props) => {

    let[userProfile, changeUserProfile] = useState<any>(null)
    let {userId} = useParams()
    console.log("user Id at profile comp = " + userId)


    //query the server
    useEffect(()=>{

        const getUser = async ()=>{
            let response = await getUserProfile(userId)
            console.log("getUsers respone: " + response)
            changeUserProfile(response)
        }

        if(!userProfile){
            getUser()
        }
    })  

    
    // let userDisplays = userProfile.map((user: User)=>{
    //     return <FullUserDisplayComponent key={'user-key-' + user.userId} user={user}/>
    // })
    
    

    return(
        (userProfile) ?
            <FullUserDisplayComponent user={userProfile}/>
        :
        <div>
            <h3>User Not Found</h3>
        </div>
        
    )
}


  