const AuthContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3e2c2c]">
      {children}
    </div>
  );
};

export default AuthContainer;