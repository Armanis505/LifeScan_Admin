const ButtonAccept = ( {text, type, onClick, disabled} ) => {
  return (
    <>
      <button
        type={type}
        className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonAccept;
