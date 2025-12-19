import { formField, label, input } from "@/styles";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: "text" | "password" | "email" | "url";
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
}

export function FormField({
  id,
  name,
  label: labelText,
  type,
  value,
  defaultValue,
  onChange,
  placeholder,
  required,
  autoComplete,
  minLength,
  maxLength,
  readOnly,
}: FormFieldProps) {
  return (
    <div className={formField()}>
      <label htmlFor={id} className={label()}>
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        readOnly={readOnly}
        className={input({ readonly: readOnly })}
      />
    </div>
  );
}
