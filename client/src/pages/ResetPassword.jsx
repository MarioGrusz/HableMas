import AuthHeader from '../components/AuthHeader/AuthHeader'
import resetImage from '../assets/reset.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import DynamicForm from '../components/DynamicForm/DynamicForm';

const ResetPassword = ({ text, buttonText }) => {

    const { resetPassword,  showSnackbar, user } = UserAuth();
    const [loading, setLoading] = useState(false);


    const inputFields = [
        { name: 'email', type: 'email', label: 'Email', required: true },
        
    ];

    const handleResetPassword = async (formData) => {
        try{
            setLoading(true)
            const { email } = formData;
            await resetPassword(email); 
            showSnackbar( 'Check your email inbox for instructions' , 'success' );
        } catch (error) {
            showSnackbar( 'Faild to reset password' , 'error' );
            console.log(error.message);
        }
        setLoading(false);
        
    }


    return (
        <div className='authorization'>
            <AuthHeader text={'Reset Password'} />
            <div className='authorization__container'>
                <div className='authorization__left'>
                    <img src={resetImage} />
                </div>

                <div className='authorization__right'>
                    <DynamicForm inputFields={inputFields} handleSubmit={handleResetPassword} buttonText='Submit'  />
                </div>
            </div>
        </div>

    )
  
};

export default ResetPassword