import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const InputField = ({
  required,
  label,
  name,
  type,
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <div className="mt-6">
      <Label htmlFor={label} className={" text-sm text-dark-navy"}>
        <span className="text-danger">{required && "*"}</span> {label}
      </Label>
      <Input
        id={label}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`text-sm rounded-sm h-11 mt-2 ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
