// components/cart/InputField.tsx
type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputField = (props: InputFieldProps) => {
    return (
        <input
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
            {...props}
        />
    );
};

export default InputField;
