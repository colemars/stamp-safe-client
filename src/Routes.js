import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "./components/Landing";
import Buyer from "./components/Buyer";
import Seller from "./components/Seller";
import UploadImage from "./components/UploadImage";

export default () =>
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/buyer" exact component={Buyer} />
    <Route path="/seller" exact component={Seller} />
    <Route path="/uploadImage" exact component={UploadImage} />
  </Switch>;
