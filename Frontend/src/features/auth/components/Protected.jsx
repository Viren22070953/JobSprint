import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (<main className="loading-screen"><div className="loader" /><h1>Loading...</h1></main>)
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected
