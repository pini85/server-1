import React, { useEffect, useState } from "react";

const IFrame = () => {
  const [iData, setIData] = useState("");
  useEffect(() => {
    const handler = (e) => {
      //! security
      // check origin

      if (
        e.origin == "https://613f20517240bc7bbd234a71--server-2.netlify.app/"
      ) {
        console.log(`origin is ${e.origin}`);
        //check message
        const data = JSON.parse(e.data);
        if (data.message === "Hello World") {
          console.log(`message is indeed ${data.message}`);
          console.log(data);
          setIData(data.message);
        }
      }
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);
  return (
    <div>
      <iframe
        style={{ height: "80vh", width: "100%" }}
        src="http://localhost:3001/"
      />
      <div>{iData}</div>
    </div>
  );
};
export default IFrame;
