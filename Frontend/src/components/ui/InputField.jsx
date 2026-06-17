const InputField = ({ icon: Icon, className = "", ...props }) => {
  if (!Icon) {
    return <input className={`input-field ${className}`.trim()} {...props} />;
  }

  return (
    <div className="field-with-icon">
      <Icon />
      <input className={`input-field ${className}`.trim()} {...props} />
    </div>
  );
};

export default InputField;
