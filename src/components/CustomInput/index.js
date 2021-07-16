import React from "react";
import "./styles.scss";

const CustomInput = ({ label, onChange, onBlur, name, value, placeholder, type = "text", error, disabled = false, min }) => {
  return (
    <div className="custom-input">
      <label htmlFor={name}>{label}:</label>
      <input
        name={name}
        min={min && min}
        value={value}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      <p className={`${error ? "d-block" : "d-none"} input-error mt-1`}>{error}</p>
    </div>
  );
};

export default CustomInput;
