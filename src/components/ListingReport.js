/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import accurateLogo from '../accurate.jpeg';
import safe from '../safe.png';
import LinkedReportsSegment from './LinkedReportsSegment';
import StagingDetailsSegment from './StagingDetailsSegment';
import DescriptiveLinkSegment from './DescriptiveLinkSegment';
import ActionsSegment from './ActionsSegment';

const ListingReport = props => {
  const [route, setRoute] = useState();

  // if (props.fields.length === 0) return <Redirect push to="/" />;
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
        <Header textAlign="center" as="h1">
          <Header.Content>Your StampSafe Stage</Header.Content>
          <Header.Subheader style={{ padding: '1em' }}>
            Ensure your privacy, safety and security with StampSafe
          </Header.Subheader>
        </Header>
        <Grid centered columns={2}>
          <Grid.Row stretched>
            <Grid.Column>
              <LinkedReportsSegment
                accessKey={props.accessKey}
                linkKey={props.linkKey}
                fields={props.fields}
              />
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
                url="https://www.hotgunz.com/"
                urlText="View Details"
                logo={safe}
              />
              <ActionsSegment accessKey={props.accessKey} reportType="100" />
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

export default connect(mapStateToProps)(ListingReport);
