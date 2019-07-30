import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import StageItem from './components/StageItem';
import UploadImage from './components/UploadImage';
import Review from './components/ReviewItemStaging';
import ListingReport from './components/ListingReport';
import GetReport from './components/GetReport';
import BuyerReport from './components/BuyerReport';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/get-report" exact component={GetReport} />
      <Route path="/stage" exact component={StageItem} />
      <Route path="/upload" exact component={UploadImage} />
      <Route path="/review" exact component={Review} />
      <Route path="/stage-report" exact component={ListingReport} />
      <Route path="/buyer-report" exact component={BuyerReport} />
    </Switch>
  );
};

export default Routes;
