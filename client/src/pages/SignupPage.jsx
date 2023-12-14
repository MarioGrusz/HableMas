import '../styles/auth.scss';
import AuthHeader from '../components/AuthHeader/AuthHeader'
import signupImage from '../assets/signUp.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import DynamicForm from '../components/DynamicForm/DynamicForm';


const Signup = ({ text , buttonText }) => {

    const { createUser,  showSnackbar} = UserAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const inputFields = [
        { name: 'name', type: 'name', label: 'Your Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'password', type: 'password', label: 'Password', required: true },
        
    ];
   
    const handleCreateUserWithEmail = async (formData) => {
        try{
            setLoading(true)
            const { email, password, name } = formData;
            await createUser(email, password, name);
            showSnackbar( 'Account created successfully. Please log in.' , 'success' );
            navigate("/login");
        } catch (error) {
            showSnackbar( 'Failed to create an account.' , 'error' );
            console.log(error.message);
        }
        setLoading(false);
        
    }


    return (
        <div className='authorization'>
            <AuthHeader text={'Signup'} />
            <div className='authorization__container'>
                <div className='authorization__left'>
                    <img src={signupImage} />
                </div>

                <div className='authorization__right'>
                    <DynamicForm inputFields={inputFields} handleSubmit={handleCreateUserWithEmail} showPrivacyPolicy={true} buttonText='SignUp'  />
                </div>
            </div>
        </div>

    )
  
};

export default Signup