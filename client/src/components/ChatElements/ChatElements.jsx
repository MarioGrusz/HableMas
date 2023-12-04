import './index.scss';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import chatbotImage from '../../assets/image1.png';
import userImage from '../../assets/image2.png';


const UserMessage = ({ message }) => {

  return (

    <figure className='message-bubble'>
      <div className='message-bubble__avatar'>
          <img src={userImage} alt='chatbot-image' />
      </div>
      <div className='message-bubble__text message-bubble__user-message'>
        <p>{message}</p>
      </div>
    </figure>

  )
}


const ChatBotMessage = ({ message, audioUrl }) => {

  return (

    <figure className='message-bubble'>
      <div className='message-bubble__avatar'>
          <img src={chatbotImage} alt='chatbot-image' />
      </div>
      <div className='message-bubble__text message-bubble__chatbot-message'>
        <p>{message}</p>
        {audioUrl ? <AudioPlayer url={audioUrl} /> : null}
      </div>
    </figure>

  )
}


const DotAnimation = () => {
  return (

    <figure className='message-bubble__dots'>
       <div className='message-bubble__dots-flashing'></div>
    </figure>

  )
}

export {
    UserMessage,
    ChatBotMessage,
    DotAnimation,
}