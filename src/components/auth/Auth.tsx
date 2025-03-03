import {useState} from "react";
import {FoundationInput} from "../_foundation/FoundationInput/FoundationInput.tsx";
import {FoundationButton} from "../_foundation/FoundationButton/FoundationButton.tsx";
import {mockUsers} from "../../mocks/dummyData.ts";
import {localStorageSetUser} from "../../utils.ts";
import {IDummyUserData} from "../../types.ts";

interface IProps {
    onSuccessLogin: (user: IDummyUserData) => void;
}

export const Auth = ({onSuccessLogin}: IProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const buttonDisabled = username.length === 0 || password.length === 0 || isError;

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        setIsError(false);
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setIsError(false);
    }

    const handleLogin = () => {
        const findUser = mockUsers.find((user) => user.name === username && user.password === password);
        if (findUser) {
            findUser.password = '****'
            onSuccessLogin(findUser);
            localStorageSetUser(findUser);
        } else {
            setIsError(true)
        }
    }

    const renderError = () => (
        <p className={'text-red-600 mb-2'}>Username or password are incorrect.</p>
    )

    const renderInputs = () => (
        <div className='my-4 w-72'>
            <FoundationInput label={'username'} value={username} onChangeValue={handleUsernameChange} error={isError}/>
            <FoundationInput label={'password'} value={password} type={'password'} onChangeValue={handlePasswordChange}
                             error={isError}/>
            {isError && renderError()}

        </div>
    )

    return (
        <div className="flex flex-col justify-center items-center bg-slate-50 rounded-2xl w-[40rem] h-[36rem]">
            <h1 className={'text-3xl font-bold text-center'}>
                Welcome in <br/>ToDo list
            </h1>
            {renderInputs()}
            <FoundationButton type={'SUBMIT'} label={'Login'} onClick={handleLogin} disabled={buttonDisabled}/>
        </div>
    )
}