import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Alert, message } from "antd";
import SimpleReactValidator from "simple-react-validator";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../actions/authActions.js";
import { loginUser } from "../../apis/user";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => (
        <Alert message={message} className="mb-2" type="error" />
      ),
      autoForceUpdate: this
    });
  }
  state = {
    email: "",
    password: "",
    logged: false
  };

  componentDidMount() {
    const logged = localStorage.getItem("taskList");
    this.setState({ logged });
  }

  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onLoginHandler = async event => {
    event.preventDefault();
    if (this.validator.allValid()) {
      const credentials = {
        email: this.state.email,
        password: this.state.password
      };
      try {
        const response = await loginUser(credentials);
        const { user, token } = response.data;
        this.props.loginAction(user, token);
        this.props.history.push("/dashboard/workspace");
        message.success("Login Successful");
      } catch (e) {
        message.error("Invalid email or password");
        console.log(e);
      }
    } else {
      this.validator.showMessages();
    }
  };

  render() {
    let showLogin = null;
    if (!this.state.logged) {
      showLogin = (
        <div style={{ fontFamily: "Montserrat" }}>
          <div className="loginSidebar">
            <Row className="ml-5">
              <Col lg={2} className="ml-3 mt-3">
                <img
                  className="logo"
                  src={require("../../assets/list.png")}
                  height="50"
                />
              </Col>
              <Col className="mt-4">
                <h3 style={{ color: "white" }}>TASKLIST</h3>
              </Col>
            </Row>
            <Row
              className="d-flex justify-content-center align-items-center"
              style={{ height: "78%", padding: "2rem", fontWeight: "bold" }}
            >
              <Col>
                <p className="text-center">
                  To enjoy good health, to bring true happiness to one's family,
                  to bring peace to all, one must first discipline and control
                  one's own mind. If a man can control his mind he can find the
                  way to Enlightenment, and all wisdom and virtue will naturally
                  come to him.
                </p>
              </Col>
            </Row>
            <Row
              style={{
                position: "absolute",
                bottom: "25px",
                width: "100%",
                color: "white"
              }}
            >
              <Col>
                <h6 style={{ color: "white" }} className="text-center">
                  Powered by Techzilla India
                </h6>
              </Col>
            </Row>
          </div>

          <div className="content d-flex align-items-center justify-content-center">
            <Row className="">
              <Col>
                <form className="form">
                  <p className="text-center" style={{ fontSize: "2rem" }}>
                    Welcome to <b>TaskList</b>
                  </p>
                  <p className="text-center text-muted">
                    Login to manage your account
                  </p>
                  <div className="form-content">
                    <input
                      className="form-input"
                      id="email"
                      placeholder="Email ID"
                      type="text"
                      value={this.state.email}
                      onChange={this.onChangeHandler}
                    />
                    {this.validator.message(
                      "Email",
                      this.state.email,
                      "required|email"
                    )}

                    <input
                      className="form-input"
                      id="password"
                      placeholder="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChangeHandler}
                    />
                    {this.validator.message(
                      "Password",
                      this.state.password,
                      "required"
                    )}

                    <br />
                    <button onClick={this.onLoginHandler} className="button">
                      Log in
                    </button>
                    <br />
                    <div className="signup-message">
                      <br />
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      );
    } else {
      showLogin = <Redirect to="/dashboard/workspace" />;
    }
    return <div>{showLogin}</div>;
  }
}

export default connect(
  null,
  { loginAction }
)(Login);
