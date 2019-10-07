import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Comment,
  Form,
  Input,
  Row,
  Button,
  Col,
  Avatar,
  Alert,
  message
} from "antd";
import { addMessageAction } from "../../actions/messageActions";
import { addMessage } from "../../apis/message";
import SimpleReactValidator from "simple-react-validator";

export class ShowMessges extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => (
        <Alert message={message} className="mt-2" type="error" />
      ),
      autoForceUpdate: this
    });
  }
  state = {
    message: ""
  };

  handleMessageChange = event => {
    this.setState({ message: event.target.value });
  };

  addMessage = async () => {
    try {
      if (this.validator.allValid()) {
        const messageData = {
          content: this.state.message,
          userId: this.props.auth._id,
          taskId: this.props.taskId
        };
        const response = await addMessage(messageData);
        this.props.addMessageAction(response.data.message);
        message.success("Message added successfully");
        this.setState({ message: "" });
      } else {
        this.validator.showMessages();
      }
    } catch (error) {
      console.log(error);
      message.error("Operation Failed");
      this.setState({ message: "" });
    }
  };

  render() {
    const { visible, onCancel } = this.props;

    return (
      <div>
        <Modal
          visible={visible}
          title="View Message"
          onCancel={onCancel}
          width={850}
        >
          {this.props.messages.length === 0 ? (
            <p>No messages found</p>
          ) : (
            this.props.messages.map(message => {
              if (message.taskId === this.props.taskId) {
                return (
                  <Comment
                    key={message._id}
                    author={
                      <a>
                        {message.userId.firstName +
                          " " +
                          message.userId.lastName}
                      </a>
                    }
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: "#7265e6",
                          verticalAlign: "middle"
                        }}
                      >
                        {message.userId.firstName}
                      </Avatar>
                    }
                    content={<p>{message.content}</p>}
                    datetime={<span>{message.createdAt.substring(0, 10)}</span>}
                  />
                );
              }
            })
          )}

          <Form>
            <Row>
              <Col span={20}>
                <Input
                  value={this.state.message}
                  onChange={this.handleMessageChange}
                />
                {this.validator.message(
                  "Message",
                  this.state.message,
                  "required"
                )}
              </Col>
              <Col span={3} className="ml-2">
                <Button type="primary" onClick={this.addMessage}>
                  Add Message
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ message, auth }) => ({
  messages: message.message,
  auth: auth.user
});

export default connect(
  mapStateToProps,
  { addMessageAction }
)(ShowMessges);
