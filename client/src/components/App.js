import React from "react";
import ReactDOM from "react-dom";
import ShowMessages from "./ShowMessages";

class App extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ShowMessages />
      </div>
    );
  }
}
export default App;
