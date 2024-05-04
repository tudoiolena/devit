import "./App.css";
import CensoredText from "./components/censored-text";

function App() {
  const badWords = ["test", "someBadWord", "four"];
  const someText =
    "Very long text which contains someBadWord and testWord. One two three four five.";

  return <CensoredText badWords={badWords}>{someText}</CensoredText>;
}

export default App;
