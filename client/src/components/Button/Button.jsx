import "./index.scss";

const Button = (props) => {
  const {
    onClick,
    disabled,
    text,
    icon,
    type,
    backgroundColor,
    color,
    border,
    width,
    alignSelf,
    margin,
  } = props;

  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: color,
    border: border,
    width: width,
    alignSelf: alignSelf,
    margin: margin,
  };

  return (
    <button
      className="custom-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={buttonStyle}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};

export default Button;
