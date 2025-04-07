import { useEffect } from "react";
import GmailMockupTwo from "./components/GmailMockupTwo";

const App = () => {
  useEffect(() => {
    [
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    ];
  });

  return (
    <div className="flex items-center justify-center h-full">
      <GmailMockupTwo />
    </div>
  );
};

export default App;
