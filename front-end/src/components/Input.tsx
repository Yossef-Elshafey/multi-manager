type InputProps = {
	id: string;
	label: string;
	inputType: string;
	placeholder?: string;
	value?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	children?: React.ReactNode;
	checked?: boolean;
};

export const Input = ({
	id,
	label,
	inputType,
	placeholder,
	value,
	onChange,
	checked,
	children,
}: InputProps) => {
	return (
		<label htmlFor={id} className="w-full text-white">
			{label}
			<input
				name={id}
				checked={checked}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type={inputType}
				className="w-full focus:outline-none focus:border-white bg-transparent border border-gray-500 rounded-md mt-2 p-2"
			/>
			{/* for the error msg under a two in on row inputs to take the same layout*/}
			{children}
		</label>
	);
};
