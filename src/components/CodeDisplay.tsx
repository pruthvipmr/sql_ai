import {useState} from "react";

interface CodeDisplayProps {
    text: string
}

const CodeDisplay = ({text}: CodeDisplayProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text).then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        });
      };


    return (
      <div className="code-display">
        <div className="buttons">
            <div className="button first"></div>
            <div className="button middle"></div>
            <div className="button last"></div>
        </div>
        <div className="code-output">
            <p>{text}</p>
        </div>
        <button className="copy-button" onClick={copyToClipboard}>
            {isCopied ? "Copied!" : "Copy"}
        </button>
    </div>
    );
  }
  
  export default CodeDisplay