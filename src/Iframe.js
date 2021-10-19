import React, { useEffect, useState } from "react";

const IFrame = () => {
  const [iData, setIData] = useState("");
  const [cookieData, setCookieData] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      //! security
      // check origin

      if (
        e.origin === "https://server-2.netlify.app" ||
        e.origin === "http://localhost:3001"
      ) {
        console.log(`origin is ${e.origin}`);

        //check message
        const data = JSON.parse(e.data);
        console.log("data", data.message);
        const c = data.message.split("=");
        console.log("c", c[0], c[1]);

        document.cookie = `${c[0]}=${c[1]}; SameSite=none; Secure; Domain=https://server-1.netlify.app/`;
        document
          .hasStorageAccess()
          .then((hasAccess) => {
            console.log("hasAccess: " + hasAccess);
            if (!hasAccess) {
              return document.requestStorageAccess();
            }
          })
          .then((_) => {
            console.log("Now we have first-party storage access!");
            document.cookie = `${c[0]}=${c[1]}; SameSite=none; Secure; Domain=https://server-1.netlify.app/`;

            console.log(`document.cookie: ${document.cookie}`);
          })
          .catch((_) => {
            console.log("error");
          });
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
