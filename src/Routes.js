import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Buyer from './components/Buyer';
import StageItem from './components/StageItem';
import UploadImage from './components/UploadImage';
import Review from './components/ReviewItemStaging';
import ListingReport from './components/ListingReport';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/buyer" exact component={Buyer} />
      <Route path="/stage" exact component={StageItem} />
      <Route path="/upload" exact component={UploadImage} />
      <Route path="/review" exact component={Review} />
      <Route path="/stage-report" exact component={ListingReport} />
    </Switch>
  );
};

export default Routes;
