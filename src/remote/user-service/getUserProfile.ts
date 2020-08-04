import { fellowshipClient } from ".."

export const getUserProfile = async (userId:number) => {
    
    try{
        let response = await fellowshipClient.get(`/P2-Fellowship-User-Service/users/${userId}`)
        console.log(response)
        return response.data

    } catch(err){
        console.log(err)
    }
}