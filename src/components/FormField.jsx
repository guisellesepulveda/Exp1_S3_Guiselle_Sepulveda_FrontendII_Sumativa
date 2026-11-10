
function FormField({ label, id, type = 'text', value, onChange, error, placeholder, required = false }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
            />
            {error && (
                <p id={`${id}-error`} className="text-red-600 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormField;