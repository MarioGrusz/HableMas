import './index.scss';
import avatarImage from '../../assets/image1.png'
import { useState } from 'react';
import Button from '../Button/Button';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const ChatHeader = ({ setMessages, text }) => {
  
  const [isResetting, setIsResetting] = useState(false);
  const { logOut,  showSnackbar, user} = UserAuth();

  const navigate = useNavigate();


  const handleSignout = async (formData) => {
    try{
        await logOut();
        showSnackbar( 'Logged out successfully' , 'success' );
        navigate("/login");
    } catch (error) {
        showSnackbar( 'Fail to log out' , 'error' );
        console.log(error.message);
    }
  }  
 

  return (
    <div className='chat-header'>
        <div className='chat-header__avatar-wrapper'>
            <img src={avatarImage} alt='avatar'/>
        </div>
        <div className='chat-header__text-wrapper'>
            <span className='chat-header__name'>ALEJANDRO ChatBot</span>
            <span className='chat-header__question'>Hi {user.displayName}!</span>
            <span className='chat-header__question'>Do you want to chat today?</span>
        </div>
        <Button id="logout-button" onClick={handleSignout} text="Log Out" backgroundColor='transparent' color='black' border='1px solid black' width='20%'/> 
    </div>
  )
  
}

export default ChatHeader