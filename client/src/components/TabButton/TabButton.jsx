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

    const handleClick = () => {
        onClick()
        setIsActive(current => !current);
    };

    const buttonStyle = {
        
    };

    return (
        <span
            onClick={handleClick}
            style={buttonStyle}
            className={`animated-button`} 
        >
            <span className='animated-button__border'></span>
            <span className='animated-button__ripple'>
                <span className={`${activeTab === id ? 'active' : ''}`}></span>
            </span>
            <span className='animated-button__title'>
                <span data-text={content} className={`text ${activeTab === id ? 'active' : ''}`}>{text}</span>
            </span>
        </span>
    )
}

export default TabButton