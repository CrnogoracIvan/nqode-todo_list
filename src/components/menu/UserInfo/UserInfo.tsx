import {CgLogIn, CgProfile} from "react-icons/cg";
import {useAuth} from "../../../hooks/useAuth.ts";


export const UserInfo = () => {

    const auth = useAuth();
    if (!auth?.loggedUser) {
        return null
    }
    return (
        <div className={'flex flex-row items-center justify-between'}>
            <div className={'flex flex-row items-center'}>
                <CgProfile/>
                <p className={'ml-2'}>{auth?.loggedUser.name}</p>
            </div>
            <CgLogIn className={'text-xl cursor-pointer  hover:text-amber-300'} onClick={() => auth.logout()}/>
        </div>
    )
}