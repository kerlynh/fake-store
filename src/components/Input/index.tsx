interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  label,
  id,
  type,
  name,
  onChange,
}: InputFieldProps) {
  return (
    <div className="w-full flex flex-col space-y-1 items-start">
      <label htmlFor={id} className="text-xs">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="w-full h-10 rounded-lg outline-none py-2 px-4 text-black border border-green-900/75"
        onChange={(value) => onChange(value)}
      />
    </div>
  );
}
