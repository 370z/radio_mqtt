"use server"
export default async function CreateChannel(prevState:any,formData:any){
    const channelName = formData.get("channelName");
    const description = formData.get("description");
    const channelType = formData.get("channelType");
    if(!channelName){
        return {
            message: "please enter channel name",
        }
    }
    return {
        message: formData
    }
    console.log(channelName)
}