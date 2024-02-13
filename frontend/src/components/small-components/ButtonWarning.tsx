import { Link } from "react-router-dom";

interface ButtonWarningProp {
  label: string;
  buttonText: string;
  to: string;
}

function ButtonWarning({ label, buttonText, to }: ButtonWarningProp) {
  return (
    <div className="text-xs font-bold text-center text-black">
      {label}
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}

export default ButtonWarning;
