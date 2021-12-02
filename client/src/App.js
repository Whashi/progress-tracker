import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CreateNewProfile from "./Pages/CreateNewProfile";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import ProfileList from "./Pages/ProfileList";

function App() {
  const [canEdit, setCanEdit] = useState(false);
  const [authLevel, setAuthLevel] = useState();
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login setAuthLevel={setAuthLevel} />
        </Route>
        <Route path={"/profile/:profileId"}>
          <Profile
            canEdit={canEdit}
            setCanEdit={setCanEdit}
            authLevel={authLevel}
          />
        </Route>
        <Route path="/new-profile">
          <CreateNewProfile />
        </Route>
        <Route path="/profile-list">
          <ProfileList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
