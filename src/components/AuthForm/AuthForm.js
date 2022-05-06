import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userService} from "../../services";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";

const AuthForm = () => {
    const {register, handleSubmit, reset} = useForm();
    const [isLogin, setIsLogin] = useState(null);
    const [errors, setErrors] = useState(null);
    const {loginError} = useSelector(state1 => state1.auth);

    const {pathname, state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        pathname === '/register' ? setIsLogin(false) : setIsLogin(true)
    }, [pathname])

    const submit = async (user) => {
        try {
            if (!isLogin) {
                await userService.create(user);
                navigate('/login')
            } else {
                await dispatch(authActions.login({user}))
                navigate(state.pathname, {replace: true})
            }
        } catch (e) {
            setErrors(e.response.data)
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>{isLogin ? 'Login' : 'Register'}</button>
            <div>
                <div>{errors?.username && <span>{errors.username[0]}</span>}</div>
                <div>{errors?.password && <span>{errors.password[0]}</span>}</div>
                <span>{loginError && <span>Wrong username or password</span>}</span>
            </div>
        </form>
    );
};

export {AuthForm};