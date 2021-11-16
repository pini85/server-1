import React, { useEffect, useState } from "react";

const IFrame = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [cookieData, setCookieData] = useState(null);
  const studentId = 1234;

  useEffect(() => {
    const url = () => {
      if (process.env.NODE_ENV === "development") {
        return "ws://localhost:8080/";
      }
      return "wss://pini-backend-playground.herokuapp.com";
    };
    const socket = new WebSocket(url());
    socket.addEventListener("open", function (event) {
      console.log("Connected to WS Server from server1");
    });
    socket.addEventListener("message", function (event) {
      const message = event.data.text();
      message.then((data) => {
        const parsedData = JSON.parse(data);
        if (studentId === parsedData.studentId) {
          setDisabled(false);
        }
      });
    });
  }, []);
  const iframeUrl = () => {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3009/";
    }
    return "https://server-2.netlify.app/";
  };

  return (
    <div>
      <iframe style={{ height: "80vh", width: "100%" }} src={iframeUrl()} />
      <h1>new build</h1>
      <button disabled={isDisabled}>Continue</button>
    </div>
  );
};
export default IFrame;
