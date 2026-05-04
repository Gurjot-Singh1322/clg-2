import { Link } from "react-router-dom";

const AuthSwitch = ({ text, linkText, to }) => {
  return (
    <p className="text-center mt-4 text-sm text-gray-600">
      {text}{" "}
      <Link to={to} className="text-[#6b4f4f] font-semibold hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthSwitch;