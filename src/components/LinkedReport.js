import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import closeCircle from '../close-circle.png';
import safeShield from '../shield-check.png';

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

const LinkedReport = props => {
  return (
    <Grid.Row
      style={{
        padding: '0',
        paddingTop: '.5em',
        paddingBottom: '.5em'
      }}
    >
      <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
        {props.reportKey}
      </Grid.Column>
      <Grid.Column width={7} textAlign="left" style={{ color: '#5F6368' }}>
        {getStatusIcon(props.status)}
        {props.status}
      </Grid.Column>
    </Grid.Row>
  );
};

export default LinkedReport;
