import { useState } from "react";
import "../app/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/chat");
  };
  return (
    <Component
      handleLoginChange={(e) => setUserName(e.target.value)}
      username={userName}
      handleLogin={handleLogin}
      {...pageProps}
    />
  );
}

export default MyApp;
