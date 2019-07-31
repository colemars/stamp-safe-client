import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DescriptiveLinkSegment = props => {
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
              <Header.Content>{props.header}</Header.Content>
              <Header.Subheader style={{ paddingTop: '1em' }}>
                {props.subheader}
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={4} textAlign="left">
            <Image
              src={props.logo}
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
          <Grid.Row style={{ paddingTop: ".5em", paddingBottom: ".6em" }}>
            <Grid.Column width={9} style={{ paddingLeft: '2em' }}>
              <a href={props.url} style={{ textDecoration: 'none' }}>
                {props.urlText}
              </a>
            </Grid.Column>
          </Grid.Row>
          {/* end own component  */}
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

DescriptiveLinkSegment.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlText: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
};

export default DescriptiveLinkSegment;
