import './index.scss'

const Button = ({ onClick, disabled,  text, icon, type, backgroundColor, color, border, width }) => {

    const buttonStyle = {
      backgroundColor: backgroundColor,
      color: color,
      border: border,
      width: width,
    };

    return (
      <button className='custom-button' onClick={onClick} disabled={disabled} type={type} style={buttonStyle}>
        {icon}
        <p>{text}</p>
      </button>
    );
};
  
  

export default Button