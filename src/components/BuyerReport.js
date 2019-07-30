import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import accurateLogo from '../accurate.jpeg';
import safe from '../safe.png';
import LinkedReportsSegment from './LinkedReportsSegment';
import StagingDetailsSegment from './StagingDetailsSegment';
import DescriptiveLinkSegment from './DescriptiveLinkSegment';
import ActionsSegment from './ActionsSegment';

const BuyerReport = props => {
  if (props.fields.length === 0) return <Redirect push to="/" />;
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100%',
        padding: '45px',
        color: '#202124'
      }}
    >
      <Header textAlign="center" as="h1">
        <Header.Content>Your StampSafe Stage</Header.Content>
        <Header.Subheader style={{ padding: '1em' }}>
          Ensure your privacy, safety and security with StampSafe
        </Header.Subheader>
      </Header>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <LinkedReportsSegment stageAccessKey={props.accessKey} />
            <StagingDetailsSegment details={props.fields} />
          </Grid.Column>
          <Grid.Column>
            <DescriptiveLinkSegment
              header="Criminal Record"
              subheader="Utilize Accurate Background Checks to run a Federal Criminal Record Search"
              url="https://www.google.com/"
              urlText="Start Here"
              logo={accurateLogo}
            />
            <DescriptiveLinkSegment
              header="Stolen Property"
              subheader=" This is a non-comprehensive search of various stolen property databases"
              url="https://www.google.com/"
              urlText="View Details"
              logo={safe}
            />
            <ActionsSegment />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  fields: state.fields.fields,
  accessKey: state.accessKey.stageAccessKey
});

export default connect(mapStateToProps)(BuyerReport);
