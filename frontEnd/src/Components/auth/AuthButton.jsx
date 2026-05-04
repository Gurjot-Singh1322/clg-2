const AuthButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-[#d4a017] text-[#3e2c2c] py-4 rounded-lg font-bold text-lg hover:bg-[#3e2c2c] hover:text-[#d4a017] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    >
      {text}
    </button>
  );
};

export default AuthButton;