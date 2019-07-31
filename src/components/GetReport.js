import React, { useState } from 'react';
import { Grid, Input, Header, Button } from 'semantic-ui-react';
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
  const [errorModal, setErrorModal] = useState(false);

  const validateForm = () => {
    return (accessKey || secureToken) && !(accessKey && secureToken);
  };

  const handleError = () => {
    setErrorModal(true);
  };

  const handleAccessKeySubmit = async () => {
    const report = await API.get('stage', `/report/${accessKey}`);
    if (report.linkedReports) {
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
      setRoute('/stage-report');
    }
    if (report.linkedReport) {
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
        accessToken: report.accessToken
      });
      setRoute('/buyer-report');
    }
  };

  const handleSecureTokenSubmit = async () => {
    const report = await API.get('stage', `/authorize/${secureToken}`);
    if (report) {
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
        accessToken: report.accessToken
      });
      setRoute('/buyer-report');
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

  if (route) {
    return <Redirect push to={route} />;
  }

  return (
    <div className="stageItem">
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
