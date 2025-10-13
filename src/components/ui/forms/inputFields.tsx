import type { Path, FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface IProps<T extends FieldValues> {
    name: Path<T>;
    size?: "sm" | "md" | "lg";
    type?: string;
    label: string;
    placeholder?: string;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
}

const InputField = <T extends FieldValues>({
    name,
    size = "md",
    type = "text",
    label,
    placeholder,
    register,
    errors
}: IProps<T>) => {
    const sizeClass = {
        sm: "p-2 text-sm",
        md: "p-3 text-base",
        lg: "p-4 text-lg"
    }[size];

    const error = errors[name];
    const errorMessage = error?.message as string | undefined;

    return (
        <div className="flex flex-col w-full space-y-1">
            <label className="font-semibold text-gray-200 text-sm tracking-wide">
                {label}
            </label>
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className={`rounded-xl bg-white/10 text-gray-100 placeholder-gray-400 backdrop-blur-md border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 ${sizeClass} ${error ? "border-red-500 focus:ring-red-500/40" : ""
                    }`}
            />
            {errorMessage && (
                <span className="text-red-400 text-[10px] mt-1">{errorMessage}</span>
            )}
        </div>
    );
};

export default InputField;