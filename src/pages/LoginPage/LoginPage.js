import {Link} from "react-router-dom";

import {AuthForm} from "../../components";

const LoginPage = () => {
    return (
        <div>
            <AuthForm/>
            <Link to={'/register'}>register</Link>
        </div>
    );
};

export {LoginPage};