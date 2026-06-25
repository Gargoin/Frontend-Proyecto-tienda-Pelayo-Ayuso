import {redirect} from "react-router-dom";

function userLoader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) {
        return redirect("/auth/login");
    };
    
}

export default userLoader;