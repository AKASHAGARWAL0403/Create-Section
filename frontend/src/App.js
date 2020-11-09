import React from "react";
import "./App.css";
import NavTabs from "./pages/NavTabs";
import CreateSectionModule from './pages/CreateSection';
import ViewSectionModule from './pages/ViewSection';
import { Switch, Route, Redirect } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import history from "./HistoryContainer/History";
import { Router } from "react-router-dom";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <NavTabs />
        <Switch>
          <Route path="/view-section" exact component={ViewSectionModule} />
          <Route path="/create-section" exact>
            <CreateSectionModule/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
