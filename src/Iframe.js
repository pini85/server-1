import React, { useEffect, useState } from "react";

const IFrame = () => {
  const [iData, setIData] = useState("");
  useEffect(() => {
    const handler = (e) => {
      //! security
      // check origin
      console.log(e.origin);

      if (e.origin == "https://server-2.netlify.app") {
        console.log(`origin is ${e.origin}`);
        //check message
        const data = JSON.parse(e.data);
        console.log(data);
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
        src="https://server-2.netlify.app/"
      />
      <div>{iData}</div>
    </div>
  );
};
export default IFrame;
