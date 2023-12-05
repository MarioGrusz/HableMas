import Tab from '../components/Tabs/Tabs';
import ChatHeader from '../components/ChatHeader/ChatHeader';
import ChatController from '../components/ChatController/ChatController';


const Home = () => {

  const tabs = [

    {
      id: 1,
      label: 'ChatBot',
      content: <ChatController />
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