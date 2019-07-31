import React from 'react';
import { Grid, Header, Image, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import closeCircle from '../close-circle.png';
import safeShield from '../shield-check.png';
import shieldIcon from '../shield-lock.png';

const SecurityVerificationSegment = props => {
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
  return (
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
            style={{ padding: '0', paddingTop: '.5em', paddingBottom: '.5em' }}
          >
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              Criminal Record
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
            style={{ padding: '0', paddingTop: '.5em', paddingBottom: '.5em' }}
          >
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              Stolen Property
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
            style={{ padding: '0', paddingTop: '.5em', paddingBottom: '.5em' }}
          >
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              Price Alert
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
  );
};

SecurityVerificationSegment.propTypes = {
  details: PropTypes.any.isRequired
};

export default SecurityVerificationSegment;
