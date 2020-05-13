import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalStyle } from "./theme/globalStyle";

import BoardPage from "./pages/BoardPage";
import BoardListingPage from "./pages/BoardListingPage";

const theme = {
  secondaryColor: "white",
  primaryColor: "black",
  borderColor: "#ccc",
  xsText: "1rem",
  smText: "1rem",
  mdtext: "1rem",
  lgText: "1rem",
  xlText: "1rem"
};

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <BoardListingPage {...props} />}
              />
              <Route
                path="/board/:boardId"
                render={props => <BoardPage {...props} />}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
