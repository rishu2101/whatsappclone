import React from "react";
import "./App.css";
import Sidebar from "./Sidebar.js";
import Chat from "./Chat.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
// For sending Push Notification From FCM Console
// import {getToken} from './firebase';

function App() {
  const [user, dispatch] = useStateValue();

  // For sending Push Notification From FCM Console
  
  // const [isTokenFound, setTokenFound] = useState(false);
  // getToken(setTokenFound);

  // to check if user data exists in local storage if yes then log in user directly
  if (!user.user && localStorage.getItem("user") != null) {
    dispatch({
      type: actionTypes.SET_USER,
      user: JSON.parse(localStorage.getItem("user")),
    });
  }

  return (
    <div className="app">
      {!user.user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Switch>
              <Route path="/:documentId">
                <Sidebar />
                <Chat />
              </Route>
              <Route path="/" exact>
                <Sidebar />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
