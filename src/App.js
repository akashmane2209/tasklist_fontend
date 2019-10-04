import React from "react";
//CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//MODULES
import { Switch, Route } from "react-router-dom";

//COMPONENTS
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import Project from "./components/Project/Project";
// import Team from "./components/Team/Team";

//APIs
import { getTaskList } from "./apis/storage";
import { getUserById } from "./apis/user";
import { loginAction } from "./actions/authActions";
import store from "./store";

class App extends React.Component {
  state = {
    loading: true
  };
  componentDidMount = async () => {
    const taskList = getTaskList();
    if (taskList) {
      let response = await getUserById(taskList.userId);
      const user = response.data.user;
      store.dispatch(loginAction(user, taskList.token));
      this.setState({ loading: false });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="App">
        {this.state.loading ? (
          <div>Loading</div>
        ) : (
          <Switch>
            {["/", "/login"].map((path, index) => (
              <Route exact path={path} component={Login} key={index} />
            ))}{" "}
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
