import '../styles/auth.scss';
import AuthHeader from '../components/AuthHeader/AuthHeader';
import loginImage from '../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import DynamicForm from '../components/DynamicForm/DynamicForm';
import Button from '../components/Button/Button';
import GoogleIcon from '../icons/Google';
import FacebookIcon from '../icons/Facebook';




const Login = ({ text, buttonText }) => {

    const { googleSignIn, facebookSignIn, signIn,  showSnackbar, user} = UserAuth();
    const navigate = useNavigate();


    const inputFields = [
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'password', type: 'password', label: 'Password', required: true },
        
    ];
   
    const handleSubmitwithEmail = async (formData) => {
        try{
            const { email, password } = formData;
            await signIn(email, password);
            showSnackbar( 'Logged in successfully' , 'success' );
            navigate("/");

        } catch (error) {
            showSnackbar( 'Fail to log in' , 'error' );
            console.log(error.message);
        }
        
    }

 

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            showSnackbar( 'Logged in successfully' , 'success' );
            navigate("/");
            
            
        } catch (error) {
            showSnackbar( 'Fail to log in' , 'error' );
            console.log(error)
        }
    }

    const handleFacebookSignIn = async () => {
        try {
            await facebookSignIn();
            navigate("/");
        } catch (error) {
            showSnackbar( 'Fail to log in' , 'error' );
            console.log(error)
        }
    }

    return (
        <div className='authorization'>
            <AuthHeader text={'Login'} />
            <div className='authorization__container'>
                <div className='authorization__left'>
                    <img src={loginImage} />
                </div>

                <div className='authorization__right login-form'>
                    <DynamicForm inputFields={inputFields} handleSubmit={handleSubmitwithEmail} showForgotPassword={true} buttonText='Login'  />

                    <div className='authorization__social-auth-btns-wrapper'>
                        <div className='authorization__center'>
                            <div className="line" />
                            <div className="or">OR</div>
                        </div>
                        <Button onClick={handleGoogleSignIn} text="Log in with Google" icon={<GoogleIcon />} />
                        <Button onClick={handleFacebookSignIn} text="Log in with Facebook" icon={<FacebookIcon />} />                       
                       
                        <div className='authorization__signup'>
                            <p>Don’t have an account?</p>
                            <Link className='signup-link' to="/signup">Sign Up</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
  
}

export default Login