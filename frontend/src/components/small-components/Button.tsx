interface ButtonProp {
  label: string;
  onClick: () => Promise<void>| void;
}

function Button({ label, onClick }: ButtonProp) {
  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black w-full"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
