"use client";

const Button = ({ children, onClick, className = "btn-danger", disabled }) => {
  return (
    <button onClick={onClick} className={`${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
