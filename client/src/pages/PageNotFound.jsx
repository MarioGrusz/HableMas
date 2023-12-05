import '../styles/notFound.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const NotFoundPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }, [])


  return (
    <div className='not-found'>
      <h1>PAGE NOT FOUND!</h1>
      <p>404</p>
      <h1>PÁGINA NO ENCONTRADA!</h1>
    </div>
  )
}

export default NotFoundPage