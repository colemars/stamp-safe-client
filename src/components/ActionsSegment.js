import React from 'react';
import { Grid, Header, Image, Segment, Button } from 'semantic-ui-react';
import accountAlert from '../account-alert-outline.png';

const ActionsSegment = props => {
  return (
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
              <Header.Content>Actions</Header.Content>
              <Header.Subheader style={{ paddingTop: '1em' }}>
                Delete your listing or Export as a CSV
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={4} textAlign="left">
            <Image
              src={accountAlert}
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
          paddingBottom: '1em'
        }}
      >
        <Grid columns={2} textAlign="left">
          {/* own component eventually */}
          <Grid.Row
            centered
            columns={3}
            style={{ padding: '0', paddingBottom: '.6em', paddingTop: '.1em' }}
          >
            <Grid.Column>
              <Button style={{ width: '100%' }}>Backup Key</Button>
            </Grid.Column>
            <Grid.Column>
              <Button color="orange" style={{ width: '100%' }}>
                Export CSV
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button color="red" style={{ width: '100%' }}>
                Delete
              </Button>
            </Grid.Column>
          </Grid.Row>
          {/* end own component  */}
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ActionsSegment;
