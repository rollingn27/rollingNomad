import { createContext, useState } from "react";

const LoggerContext = createContext({
  log: () => {},
});

const LoggerProvier = ({ children }) => {
  const [, setLogs] = useState([]);
  const log = (tag, message) => {
    if (process.env.NODE_ENV === "development") {
      console.log(tag ? `[${tag}]: ${message}` : message);
      setLogs((preLogs) => [...preLogs, { message, tag }]);
    }
  };

  const value = { log };

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
};

const { Consumer: LoggerConsumer } = LoggerContext;

export { LoggerProvier, LoggerConsumer };

export default LoggerContext;
