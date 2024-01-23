"use server"
export default async function Login(prevState:any,formData:any){
    const username = formData.get("username");
    const password = formData.get("password");
    if(!username || !password){
        return {
            message: "please enter username or password",
        }
    }
    return {
        message: "success"
    }
}