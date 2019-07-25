import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Buyer from "./components/Buyer";
import Seller from "./components/Seller";
import UploadImage from "./components/UploadImage";
import Review from "./components/ReviewItemStaging";

export default () =>
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/buyer" exact component={Buyer} />
    <Route path="/stage" exact component={Seller} />
    <Route path="/upload" exact component={UploadImage} />
    <Route path="/review" exact component={Review} />
  </Switch>;
