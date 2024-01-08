import "./index.scss";
import Button from "../Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const DynamicForm = ({
  inputFields,
  handleSubmit,
  showForgotPassword,
  showPrivacyPolicy,
  buttonText,
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Pass the form data to the submit function
  };

  const handleOnBlur = (e) => {
    if (e.target.value !== "") return;
    e.target.classList.remove("active");
  };

  return (
    <form onSubmit={onSubmit}>
      {inputFields.map((field) => (
        <div key={field.name} className="input-wrap">
          <input
            type={field.type}
            name={field.name}
            className="input-field"
            autoComplete="off"
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
            onFocus={(e) => {
              e.target.classList.add("active");
            }}
            onBlur={handleOnBlur}
          />
          <label>{field.label}</label>
        </div>
      ))}
      {showForgotPassword && (
        <p className="forgot-password">
          <Link to="/reset" className="forgot-password-link">
            Forgot Your Password?
          </Link>
        </p>
      )}

      {showPrivacyPolicy && (
        <p className="privacy-policy">
          By signing up, I agree to the
          <a href="#">Terms of Services</a> and
          <a href="#">Privacy Policy</a>
        </p>
      )}
      <Button
        onClick={onSubmit}
        type="submit"
        text={buttonText}
        backgroundColor="#7a5af5"
        color="#fff"
      />
    </form>
  );
};

export default DynamicForm;
