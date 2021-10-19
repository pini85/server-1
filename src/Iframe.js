import React, { useEffect, useState } from "react";

const IFrame = () => {
  const [iData, setIData] = useState("");
  useEffect(() => {
    const handler = (e) => {
      //! security
      // check origin
      console.log(e.origin);
      if (
        e.origin === "https://server-2.netlify.app" ||
        e.origin === "http://localhost:3001"
      ) {
        console.log(`origin is ${e.origin}`);
        //check message
        const data = JSON.parse(e.data);
        console.log(data);
        if (data.message === "Hello World") {
          console.log(`message is indeed ${data.message}`);
          console.log(data);
          setIData(data.message);
          localStorage.setItem("id", data.message);
        }
      }
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);
  const url = () => {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3001/";
    }
    return "https://server-2.netlify.app/";
  };
  return (
    <div>
      <iframe style={{ height: "80vh", width: "100%" }} src={url()} />
      <div>{iData}</div>
    </div>
  );
};
export default IFrame;
