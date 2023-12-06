import Tab from '../components/Tabs/Tabs';
import ChatHeader from '../components/ChatHeader/ChatHeader';
import ChatController from '../components/ChatController/ChatController';
import Feedback from '../components/Feedback/Feedback';


const Home = () => {

  const tabs = [

    {
      id: 1,
      label: 'ChatBot',
      content: <ChatController />
    },
    {
      id: 2,
      label: 'Feedback',
      content: <Feedback />
    },

  ];


  return (

    <main className='home-container'>
        <ChatHeader />
        <Tab tabs={tabs} />
    </main>
  )
}

export default Home