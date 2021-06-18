function Loading({ children }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="loading-spinner"></div>
      {children}
    </div>
  );
}

export default Loading;
