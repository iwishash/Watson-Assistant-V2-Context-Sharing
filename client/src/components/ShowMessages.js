import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";
import "./Message.css";
import axios from "axios";

const customerBubbleMessageStyle = {
  position: "relative",
  padding: "10px 20px",
  color: "white",
  background: "#0B93F6",
  borderRadius: "25px",
  float: "right",
  fontFamily: "ibmplexsans",
  fontWeight: "600",
  width: "fit-content",
  float: "right"
};

const watsonBubbleMessageStyle = {
  position: "relative",
  padding: "10px 20px",
  color: "white",
  background: "#3CB371",
  borderRadius: "25px",
  float: "right",
  fontFamily: "ibmplexsans",
  fontWeight: "600",
  width: "fit-content",
  float: "left"
};
const messages = [];

// const messages = [
//   {
//     id: 1,
//     text: "Hello Watson. ",
//     userStyle: customerBubbleMessageStyle
//   },
//   {
//     id: 2,
//     text: "Hi. Hope you are having a great day. ",
//     userStyle: watsonBubbleMessageStyle
//   },
//   {
//     id: 3,
//     text: "Show me the weather in New York. ",
//     userStyle: customerBubbleMessageStyle
//   },
//   {
//     id: 4,
//     text: "The weather in New York is 25 degrees celcius. ",
//     userStyle: watsonBubbleMessageStyle
//   }
// ];

class ShowMessages extends React.Component {
  state = {
    messages: messages,
    index: 5,
    term: ""
  };

  constructor(props) {
    super(props);
    const newMessages = this.state.messages;

    this.setState({
      messages: newMessages
    });
  }

  onSearch = event => {
    event.preventDefault();

    const newMessages = this.state.messages;

    newMessages.push({
      id: this.state.index++,
      text: this.state.term,
      userStyle: customerBubbleMessageStyle
    });

    this.setState({
      messages: newMessages,
      term: ""
    });

    var that = this;

    axios
      .post("http://localhost:9001/watson", {
        text: this.state.term
      })
      .then(function(response) {
        console.log(JSON.stringify(response, null, 2));
        // alert(JSON.stringify(response, null, 2));

        newMessages.push({
          id: that.state.index++,
          text: response.data,
          userStyle: watsonBubbleMessageStyle
        });

        that.setState({
          messages: newMessages
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  setTerm = event => {
    this.setState({
      term: event.target.value
    });
  };

  render() {
    const results = this.state.messages.map(message => {
      return <Message m={message} />;
    });
    return (
      <div
        style={{
          border: "2px solid black",
          height: "90vh",
          width: "70vw",
          display: "flex",
          flexDirection: "column",
          padding: "1vw",
          borderRadius: "3.5vw"
        }}
      >
        {results}
        <div style={{ bottom: "7vh", position: "absolute", marginLeft: "1vw" }}>
          <form onSubmit={this.onSearch}>
            <input
              type="text"
              placeHolder="Enter message"
              value={this.state.term}
              onChange={this.setTerm}
              style={{
                height: "5vh",
                width: "56vw",
                borderRadius: "3vw",
                border: "2px solid gray",
                textIndent: "2vw",
                fontSize: "2vh",
                marginLeft: "5vw"
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default ShowMessages;

// <button
//   className="send-button"
//   style={{
//     marginLeft: "1vw",
//     height: "6vh",
//     width: "10vw",
//     borderRadius: "3vw",
//     border: "2px solid green",
//     fontSize: "2vh",
//     fontFamily: "ibmplexsans",
//     cursor: "pointer"
//   }}
// >
//   Send
// </button>
