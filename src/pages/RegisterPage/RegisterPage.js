import {AuthForm} from "../../components";
import {authActions} from "../../redux";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const RegisterPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.setError())
    }, [])

    return (
        <div>
            <AuthForm/>
        </div>
    );
};

export {RegisterPage};