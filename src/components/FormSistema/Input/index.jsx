import { ErrorMessage, Field } from 'formik';

const Input = ({ name, type, label, placeholder }) => {
  return (
    <div className="my-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-control "
      />
      <ErrorMessage name={name}>
        {(mensagens) => (
          <div style={{ color: 'red', marginTop: '4px' }}>{mensagens}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default Input;
