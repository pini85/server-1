import React, { useEffect, useState } from "react";

const IFrame = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cookieData, setCookieData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`wss://${url()}`);
    socket.addEventListener("open", function (event) {
      console.log("Connected to WS Server from server1");
    });
    socket.addEventListener("message", function (event) {
      console.log("Message from server in server 1 ", event.data);
      setIsEnabled(true);
    });
  }, []);

  const url = () => {
    if (process.env.NODE_ENV === "development") {
      return "localhost:8080/";
    }
    return "pini-backend-playground.herokuapp.com/";
  };

  return (
    <div>
      <iframe
        style={{ height: "80vh", width: "100%" }}
        src="https://server-2.netlify.app/"
      />
      <h1>new build</h1>
      <button disabled={isEnabled}>Continue</button>
      {isEnabled && <div>enabled</div>}
    </div>
  );
};
export default IFrame;
