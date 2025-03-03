import {Auth} from "./components/auth/Auth.tsx";
import {useEffect, useState} from "react";
import {localStorageDeleteUser, localStorageGetUser} from "./utils.ts";
import {Home} from "./components/home/Home.tsx";
import {IDummyUserData} from "./types.ts";
import {AuthContext} from "./hooks/useAuth.ts";

function App() {
    const [loggedUser, setLoggedUser] = useState<IDummyUserData | null>(null);

    const login = (user: IDummyUserData) => {
        setLoggedUser(user);
    };

    const logout = () => {
        setLoggedUser(null);
        localStorageDeleteUser();
    };

    useEffect(() => {
        const user = localStorageGetUser();
        if (user) setLoggedUser(user);
    }, []);

    return (
        <div className="flex flex-row justify-center items-center w-full h-dvh">
            <AuthContext.Provider value={{loggedUser, login, logout}}>
                {loggedUser ? <Home/> : <Auth onSuccessLogin={login}/>}
            </AuthContext.Provider>
        </div>
    );
}

export default App;
