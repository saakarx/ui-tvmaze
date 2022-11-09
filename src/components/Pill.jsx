const Pill = ({ text, leftSpacer = false, variant = 'primary' }) => {
  return (
    <span
      className={`${
        leftSpacer ? 'ms-2 ' : ''
      }px-3 py-2 badge rounded-pill bg-${variant}`}
    >
      {text}
    </span>
  );
};

export default Pill;
