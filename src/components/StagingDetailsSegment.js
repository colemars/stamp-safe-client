import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import information from '../information.png';

const StagingDetailsSegment = props => {
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
              <Header.Content>Item Details</Header.Content>
              <Header.Subheader style={{ paddingTop: '1em' }}>
                Detailed information about your item
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={4} textAlign="left">
            <Image
              src={information}
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
            style={{ padding: '0', paddingTop: '.3em', paddingBottom: '.3em' }}
          >
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              Serial Number
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="left"
              style={{ color: '#5F6368' }}
            >
              {props.details.serialNumber}
            </Grid.Column>
          </Grid.Row>
          {/* end own component  */}
          {/* own component eventually */}
          <Grid.Row
            style={{ padding: '0', paddingTop: '.3em', paddingBottom: '.3em' }}
          >
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              Year/Make/Model
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="left"
              style={{
                color: '#5F6368',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {props.details.yearManufactored} {props.details.make}{' '}
              {props.details.model}
            </Grid.Column>
          </Grid.Row>
          {/* end own component  */}
          {/* own component eventually */}
          <Grid.Row
            style={{ padding: '0', paddingTop: '.3em', paddingBottom: '.3em' }}
          >
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              Condition
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="left"
              style={{ color: '#5F6368' }}
            >
              {props.details.condition}
            </Grid.Column>
          </Grid.Row>
          {/* end own component  */}
          {/* own component eventually */}
          <Grid.Row
            style={{ padding: '0', paddingTop: '.3em', paddingBottom: '.3em' }}
          >
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              Previous Owners
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="left"
              style={{ color: '#5F6368' }}
            >
              {props.details.previousOwners}
            </Grid.Column>
          </Grid.Row>
          {/* end own component  */}
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

StagingDetailsSegment.propTypes = {
  details: PropTypes.any.isRequired
};

export default StagingDetailsSegment;
