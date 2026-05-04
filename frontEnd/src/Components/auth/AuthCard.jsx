const AuthCard = ({ title, children }) => {
  return (
    <div className="bg-[#f7ebe8] p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-[#3e2c2c] mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default AuthCard;