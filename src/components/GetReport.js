import React, { useState } from 'react';
import { Grid, Input, Header, Button, Dimmer, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './GetReport.css';
import { connect } from 'react-redux';
import { API } from 'aws-amplify';
import { addFields } from '../actions/index';

const disabledButtonStyle = {
  backgroundColor: '#E6E6E6',
  cursor: 'default'
};

// add functionality so that, if user hits back button or re-navigates to his page AFTER hitting submit, the fields show the infomation already submitted and editing them will edit the already existing state instead of submitting a new state

const GetReport = props => {
  const [accessKey, setAccessKey] = useState(null);
  const [secureToken, setSecureToken] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const validateForm = () => {
    return (accessKey || secureToken) && !(accessKey && secureToken);
  };

  const handleError = () => {
    setErrorModalOpen(true);
  };

  const handleBuyerReport = report => {
    props.addFields({
      serialNumber: report.serialNumber,
      make: report.make,
      model: report.model,
      yearManufactored: report.yearManufactored,
      condition: report.conditionOfItem,
      imageKeys: report.imageKeys,
      previousOwners: report.previousOwners,
      price: report.price,
      backgroundCheckStatus: report.backgroundCheckStatus,
      stolenPropertyCheckStatus: report.stolenPropertyCheckStatus,
      priceAlertStatus: report.priceAlertStatus,
      accessKey: report.accessKey,
      accessToken: report.accessToken,
      reportStatus: report.reportStatus
    });
    setLoading(false);
    setRoute('/buyer-report');
  };

  const handleSellerReport = report => {
    props.addFields({
      serialNumber: report.serialNumber,
      make: report.make,
      model: report.model,
      yearManufactored: report.yearManufactored,
      condition: report.conditionOfItem,
      previousOwners: report.previousOwners,
      price: report.price,
      imageKeys: report.imageKeys,
      backgroundCheckStatus: report.backgroundCheckStatus
    });
    setLoading(false);
    setRoute('/stage-report');
  };

  const handleAccessKeySubmit = async () => {
    const report = await API.get('stage', `/report/${accessKey}`);
    if (report.linkedReports) {
      handleSellerReport(report);
    }
    if (report.linkedReport) {
      handleBuyerReport(report);
    }
  };

  const handleSecureTokenSubmit = async () => {
    const report = await API.get('stage', `/authorize/${secureToken}`);
    if (report) {
      handleBuyerReport(report);
    } else handleError();
  };

  const handleSubmit = () => {
    setLoading(true);
    if (accessKey) handleAccessKeySubmit();
    else if (secureToken) handleSecureTokenSubmit();
  };

  const button = validateForm() ? (
    <Button
      fluid
      onClick={handleSubmit}
      style={{ backgroundColor: '#313131' }}
      content="Submit"
    />
  ) : (
    <Button fluid style={disabledButtonStyle} content="Submit" />
  );

  const dimmerIcon = loadingComplete ? (
    <Icon
      name="check circle outline"
      size="huge"
      style={{ color: '#2AC940' }}
    />
  ) : (
    <Icon loading name="spinner" size="huge" style={{ color: '#3CA1AC' }} />
  );

  if (route) {
    return <Redirect push to={route} />;
  }

  return (
    <div className="stageItem">
      <Dimmer active={loading} page>
        {dimmerIcon}
      </Dimmer>
      <Grid textAlign="center" columns={2} style={{ paddingTop: '3em' }}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">StampSafe Report</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="stageItemFooterRow">
          <Grid.Column>
            <div id="stageItemFooter" style={{ width: '50%', margin: 'auto' }}>
              Input your access key or one-time authorization token to get your
              report
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input
                id="accessKey"
                className="itemInput"
                onChange={e => setAccessKey(e.target.value)}
                transparent
                placeholder="Access key"
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input
                id="secureToken"
                className="itemInput"
                onChange={e => setSecureToken(e.target.value)}
                transparent
                placeholder="Authorization token"
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>{button}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addFields: fields => dispatch(addFields(fields))
});

export default connect(
  null,
  mapDispatchToProps
)(GetReport);
