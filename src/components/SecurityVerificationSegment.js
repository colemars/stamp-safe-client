/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { Grid, Header, Image, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { connect } from 'react-redux';
import closeCircle from '../close-circle.png';
import safeShield from '../shield-check.png';
import shieldIcon from '../shield-lock.png';
import { addFields } from '../actions/index';
import CandidateInformationModal from './CandidateInformationModal';

const SecurityVerificationSegment = props => {
  const [backgroundCheckModalOpen, setBackgroundCheckModalOpen] = useState();
  const notStartedIcon = (
    <img
      src={closeCircle}
      style={{
        width: '1em',
        height: '1em',
        marginLeft: '.3em',
        marginBottom: '-.15em',
        marginRight: '.2em'
      }}
      alt=""
    />
  );
  const inProgressIcon = (
    <Icon
      loading
      size="small"
      name="circle notch"
      color="teal"
      style={{
        marginLeft: '.3em',
        marginBottom: '-.15em'
      }}
    />
  );
  const safeIcon = (
    <img
      src={safeShield}
      style={{
        width: '1em',
        height: '1em',
        marginLeft: '.3em',
        marginBottom: '-.15em',
        marginRight: '.2em'
      }}
      alt=""
    />
  );
  const getStatusIcon = status => {
    if (status === 'Not Started') return notStartedIcon;
    if (status === 'In Progress') return inProgressIcon;
    if (status === 'Safe') return safeIcon;
    return notStartedIcon;
  };

  const getStolenRecord = fields => {
    return API.post('stage', '/stolen', {
      body: fields
    });
  };

  const handleStolenPropertySearch = async () => {
    props.addFields({
      ...props.fields,
      stolenPropertyCheckStatus: 'In Progress'
    });
    const result = await getStolenRecord({
      serialNumber: props.details.serialNumber
    });
    if (result.result === 'Not found') {
      props.addFields({
        ...props.fields,
        stolenPropertyCheckStatus: 'Safe'
      });
      return props.updateStatuses({ stolenPropertyCheckStatus: 'Safe' });
    }
  };

  return (
    <Fragment>
      <CandidateInformationModal
        open={backgroundCheckModalOpen}
        setOpen={setBackgroundCheckModalOpen}
        updateStatuses={props.updateStatuses}
      />
      <Segment.Group style={{ width: '70%', marginLeft: 'auto' }}>
        <Segment>
          <Grid stackable columns={4}>
            <Grid.Column width={12}>
              <Header
                textAlign="left"
                as="h3"
                style={{
                  padding: '1em',
                  paddingTop: '1.5em'
                }}
              >
                <Header.Content>Security Verification</Header.Content>
                <Header.Subheader style={{ paddingTop: '1em' }}>
                  Ensure each time is
                  <img
                    src={safeShield}
                    style={{
                      width: '1em',
                      height: '1em',
                      marginLeft: '.3em',
                      marginBottom: '-.1em'
                    }}
                    alt=""
                  />
                  Safe before proceeding
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column width={4} textAlign="left">
              <Image
                src={shieldIcon}
                style={{
                  marginLeft: '-1em',
                  paddingTop: '.5em',
                  maxWidth: '6em',
                  height: 'auto'
                }}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment
          style={{
            fontFamily: 'Roboto',
            fontSize: '1.1rem',
            paddingTop: '1.5em',
            paddingBottom: '1.5em'
          }}
        >
          <Grid columns={2} textAlign="left">
            {/* own component eventually */}
            <Grid.Row
              style={{
                padding: '0',
                paddingTop: '.5em',
                paddingBottom: '.5em'
              }}
            >
              <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
                Criminal Record
                <Icon
                  link={props.details.backgroundCheckStatus === 'Not Started'}
                  name="play circle outline"
                  color="green"
                  disabled={
                    !(props.details.backgroundCheckStatus === 'Not Started')
                  }
                  style={{ marginLeft: '.2em', transform: 'translateY(.1em)' }}
                  onClick={() => setBackgroundCheckModalOpen(true)}
                />
              </Grid.Column>
              <Grid.Column
                width={7}
                textAlign="left"
                style={{ color: '#5F6368' }}
              >
                {getStatusIcon(props.details.backgroundCheckStatus)}
                {props.details.backgroundCheckStatus}
              </Grid.Column>
            </Grid.Row>
            {/* end own component  */}
            {/* own component eventually */}
            <Grid.Row
              style={{
                padding: '0',
                paddingTop: '.5em',
                paddingBottom: '.5em'
              }}
            >
              <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
                Stolen Property
                <Icon
                  link={
                    props.details.stolenPropertyCheckStatus === 'Not Started'
                  }
                  name="play circle outline"
                  color="green"
                  disabled={
                    !(props.details.stolenPropertyCheckStatus === 'Not Started')
                  }
                  style={{ marginLeft: '.2em', transform: 'translateY(.1em)' }}
                  onClick={handleStolenPropertySearch}
                />
              </Grid.Column>
              <Grid.Column
                width={7}
                textAlign="left"
                style={{ color: '#5F6368' }}
              >
                {getStatusIcon(props.details.stolenPropertyCheckStatus)}
                {props.details.stolenPropertyCheckStatus}
              </Grid.Column>
            </Grid.Row>
            {/* end own component  */}
            {/* own component eventually */}
            <Grid.Row
              style={{
                padding: '0',
                paddingTop: '.5em',
                paddingBottom: '.5em'
              }}
            >
              <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
                Price Alert
                <Icon
                  link={false}
                  name="play circle outline"
                  color="green"
                  disabled={true}
                  style={{ marginLeft: '.2em', transform: 'translateY(.1em)' }}
                  onClick={() => console.log('click')}
                />
              </Grid.Column>
              <Grid.Column
                width={7}
                textAlign="left"
                style={{ color: '#5F6368' }}
              >
                {getStatusIcon(props.details.priceAlertStatus)}
                {props.details.priceAlertStatus}
              </Grid.Column>
            </Grid.Row>
            {/* end own component  */}
          </Grid>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

SecurityVerificationSegment.propTypes = {
  details: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  fields: state.fields.fields
});

const mapDispatchToProps = dispatch => ({
  addFields: fields => dispatch(addFields(fields))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurityVerificationSegment);
