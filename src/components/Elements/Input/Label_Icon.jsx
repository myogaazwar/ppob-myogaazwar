const LabelIcon = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className='absolute bottom-3 left-2'>
      {children}
    </label>
  );
};

export default LabelIcon;
