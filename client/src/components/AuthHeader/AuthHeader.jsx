import './index.scss';
import ArrowSvg from '../ArrowSvg/ArrowSvg';
import { Link } from "react-router-dom";



const AuthHeader = ({ text }) => {

  return (

    <div className="authorization-header">
    
        <Link to='/' className="arrow">
            <ArrowSvg />
        </Link>
    
      
      <h2>{text}</h2>
    </div>
  )
}

export default AuthHeader