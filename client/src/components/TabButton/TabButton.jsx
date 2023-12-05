import './index.scss';
import { useState } from 'react';


const TabButton = ({ text, content, onClick, activeTab, id }) => {

    const [isActive, setIsActive] = useState(false);

    const handleMouseOver = () => {
        setIsActive(true);
    };

    const handleMouseOut = () => {
        setIsActive(false);
    };

    const buttonStyle = {
        
    };

    return (
        <span
            onClick={onClick} onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut} 
            style={buttonStyle}
            className={`animated-button ${activeTab === id ? 'tab-active' : ''}`} 
        >
            <span className='animated-button__border'></span>
            <span className='animated-button__ripple'>
                <span className={`${isActive ? 'active' : ''}`}></span>
            </span>
            <span className='animated-button__title'>
                <span data-text={content} className={`text ${isActive ? 'active' : ''}`}>{text}</span>
            </span>
        </span>
    )
}

export default TabButton