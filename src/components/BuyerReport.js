/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { Grid, Header, Modal, Icon, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import download from 'downloadjs';
import { API } from 'aws-amplify';
import safe from '../safe.png';
import SecurityVerificationSegment from './SecurityVerificationSegment';
import StagingDetailsSegment from './StagingDetailsSegment';
import DescriptiveLinkSegment from './DescriptiveLinkSegment';
import ActionsSegment from './ActionsSegment';
import CriminalRecordCheckSegment from './CriminalRecordCheckSegment';

const BuyerReport = props => {
  const [keyModalOpen, setKeyModalOpen] = useState();
  const [firstTimeAuth, setFirstTimeAuth] = useState(
    props.fields.accessToken !== 'expired'
  );
  const [route, setRoute] = useState();

  const handleDownloadKey = () => {
    download(
      props.fields.accessKey,
      'STAMPSAFE-BUYER-ACCESSKEY.txt',
      'text/plain'
    );
    setKeyModalOpen(false);
  };

  const handleFirstTimeAuth = () => {
    setFirstTimeAuth(false);
    setKeyModalOpen(true);
  };

  const sendUpdate = params => {
    return API.put('stage', `/report/${props.fields.accessKey}`, {
      body: {
        backgroundCheckStatus:
          params.backgroundCheckStatus || props.fields.backgroundCheckStatus,
        stolenPropertyCheckStatus:
          params.priceAlertStatus || props.fields.stolenPropertyCheckStatus,
        priceAlertStatus: props.fields.priceAlertStatus
      }
    });
  };

  const updateStatuses = async status => {
    const params = {};
    if (status.backgroundCheckStatus)
      params.backgroundCheckStatus = status.backgroundCheckStatus;
    if (status.priceAlertStatus)
      params.priceAlertStatus = status.priceAlertStatus;
    try {
      await sendUpdate(params);
    } catch (e) {
      console.log(e);
    }
  };

  if (props.fields.length === 0) return <Redirect push to="/get-report" />;
  if (firstTimeAuth) handleFirstTimeAuth();
  if (route) return <Redirect push to="/get-report" />;
  return (
    <Fragment>
      <Icon
        link
        name="times circle outline"
        size="big"
        color="grey"
        style={{ position: 'absolute', left: '82vw', top: '8vh' }}
        onClick={() => setRoute('/get-report')}
      />
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          padding: '45px',
          color: '#202124'
        }}
      >
        {/* make modal own component -- same here as in listing report */}
        <Modal
          open={keyModalOpen}
          onClose={() => setKeyModalOpen(false)}
          size="tiny"
          closeOnEscape={false}
          closeOnDimmerClick={false}
        >
          <Modal.Content>
            <Icon
              className={'warningIcon'}
              name="warning sign"
              size="huge"
              style={{
                color: '#B51F23',
                width: '100%',
                margin: 'auto',
                marginTop: '1rem'
              }}
            />
            <div className={'modalHeader'}>Here is your Report Key!</div>
            <div className={'modalContent'}>
              You will need this to access the report you just created.
            </div>
            <div className={'modalSubContent'}>
              In an effort to protect your privacy there is not a sign up
              process. This key is how you will access your information. If you
              lose this key{' '}
              <span className={'modalEmphasis'}>
                access to your report will be lost and will be irrecoverable.
              </span>
            </div>
            <div className={'keyBox'}>
              <Grid columns={2}>
                <Grid.Column width={10}>
                  <Grid.Row>
                    <div className={'listKeyHeader'}>
                      Backup your StampSafe Report Key
                    </div>
                  </Grid.Row>
                  <Grid.Row>
                    <div className={'listKey'}>
                      <Icon name="key" />
                      {props.fields.accessKey}
                    </div>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Button
                    color="teal"
                    className={'keyDownloadButton'}
                    onClick={handleDownloadKey}
                  >
                    Download Key
                  </Button>
                </Grid.Column>
              </Grid>
            </div>
          </Modal.Content>
        </Modal>
        <Header textAlign="center" as="h1">
          <Header.Content>Your StampSafe Report</Header.Content>
          <Header.Subheader style={{ padding: '1em' }}>
            Ensure your privacy, safety and security with StampSafe
          </Header.Subheader>
        </Header>
        <Grid centered columns={2}>
          <Grid.Row stretched>
            <Grid.Column>
              <SecurityVerificationSegment
                details={props.fields}
                updateStatuses={updateStatuses}
              />
              <StagingDetailsSegment details={props.fields} />
            </Grid.Column>
            <Grid.Column>
              <CriminalRecordCheckSegment updateStatuses={updateStatuses} />
              <DescriptiveLinkSegment
                header="Stolen Property"
                subheader=" This is a non-comprehensive search of various stolen property databases"
                url="https://www.hotgunz.com/"
                urlText="View Details"
                logo={safe}
              />
              <ActionsSegment
                reportType="101"
                accessKey={props.fields.accessKey}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  fields: state.fields.fields,
  accessKey: state.keys.accessKey,
  linkKey: state.keys.linkKey
});

export default connect(mapStateToProps)(BuyerReport);
