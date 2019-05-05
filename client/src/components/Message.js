import React from "react";
import ReactDOM from "react-dom";
import "./Message.css";

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
  background: "#0B93F6",
  borderRadius: "25px",
  float: "right",
  fontFamily: "ibmplexsans",
  fontWeight: "600",
  width: "fit-content",
  float: "left"
};

class Message extends React.Component {
  render() {
    return (
      <div>
        <div style={this.props.m.userStyle}> {this.props.m.text} </div>
        <div style={{ height: "7vh" }} />
      </div>
    );
  }
}
export default Message;
