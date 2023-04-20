import { useState } from "react";
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";
import * as sqlFormatter from "sql-formatter";

interface ChatData {
  role: string,
  content: string,
}

const App = () => {
  const [value, setValue] = useState<string>("")

  const [chat, setChat] = useState<ChatData[]>([])

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      }
      const response = await fetch("http://localhost:8000/completions", options)
      const data = await response.json()
      console.log(data)
      const userMessage = {
        role: "user",
        content: value
      }

      data.content = sqlFormatter.format(data.content);

      setChat(oldChat => [...oldChat, data, userMessage])

      setValue("");
    } catch (error) {
      console.error(error)
    }
  }

  const clearChat = () => {
    setValue("")
    setChat([])
  }

  const filteredUserMessages = chat.filter(message => message.role === "user")
  const latestCode = chat.filter(message => message.role === "assistant").pop()

  return (
    <div className="app">
      <h1 className="app-title">sqlGPT</h1>
      <MessagesDisplay userMessages={filteredUserMessages}/>
      <CodeDisplay text={latestCode?.content || ""}/>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={4} // Adjust the number of visible rows
        cols={50} // Adjust the number of visible columns
        placeholder="Type your query here..."
      />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>Query</button>
        <button id="clear-chat" onClick={clearChat}>Clear</button>
      </div>
    </div>
  )
}

export default App;
