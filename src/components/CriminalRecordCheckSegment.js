/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import './CriminalRecordCheckSegment.css';
import CandidateInformationModal from './CandidateInformationModal';
import accurateLogo from '../accurate.jpeg';

const DescriptiveLinkSegment = props => {
  const [backgroundCheckModalOpen, setBackgroundCheckModalOpen] = useState();
  return (
    <Fragment>
      <CandidateInformationModal
        open={backgroundCheckModalOpen}
        setOpen={setBackgroundCheckModalOpen}
        updateStatuses={props.updateStatuses}
      />
      <Segment.Group style={{ width: '70%', marginRight: 'auto' }}>
        <Segment>
          <Grid stackable columns={4}>
            <Grid.Column width={12}>
              <Header
                textAlign="left"
                as="h3"
                style={{
                  padding: '1em',
                  paddingTop: '1em',
                  paddingBottom: '.5em'
                }}
              >
                <Header.Content>Criminal Record</Header.Content>
                <Header.Subheader style={{ paddingTop: '1em' }}>
                  Utilize Accurate Background Checks to run a Federal Criminal
                  Record Search
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column width={4} textAlign="left">
              <Image
                src={accurateLogo}
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
            fontSize: '1.1rem'
          }}
        >
          <Grid columns={2} textAlign="left">
            {/* own component eventually */}
            <Grid.Row style={{ paddingTop: '.5em', paddingBottom: '.6em' }}>
              <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
                <span
                  className="buttonLink"
                  onClick={() => setBackgroundCheckModalOpen(true)}
                >
                  {' '}
                  Start Here{' '}
                </span>
              </Grid.Column>
            </Grid.Row>
            {/* end own component  */}
          </Grid>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default DescriptiveLinkSegment;
