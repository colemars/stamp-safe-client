import React, { useState, Fragment } from 'react';
import {
  Grid,
  Header,
  Image,
  Icon,
  Segment,
  Modal,
  Button,
  Dimmer
} from 'semantic-ui-react';
import './LinkedReportsSegment.css';
import { API } from 'aws-amplify';
import PropTypes from 'prop-types';
import v4 from 'uuid';
import download from 'downloadjs';
import closeCircle from '../close-circle.png';
import safeShield from '../shield-check.png';
import shieldIcon from '../shield-lock.png';

const LinkedReportsSegment = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  const createReport = fields => {
    return API.post('stage', '/report', {
      body: fields
    });
  };

  const linkedReportsUpdate = async () => {
    setLoading(true);
    const stage = await API.get('stage', `/stage/${props.stageAccessKey}`);
    const report = await createReport({
      stageId: stage.stageId
    });
    setLoading(false);
    return report;
  };

  const handleDownloadToken = () => {
    download(token, 'STAMPSAFE-BUYERTOKEN.txt', 'text/plain');
    setModalOpen(false);
  };

  const handleLinkBuyer = async () => {
    const newToken = v4();
    await linkedReportsUpdate(newToken);
    setToken(newToken);
    setModalOpen(true);
  };

  return (
    <Fragment>
      <Dimmer active={loading} page>
        <Icon loading name="spinner" size="huge" style={{ color: '#3CA1AC' }} />
      </Dimmer>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="mini"
        dimmer="blurring"
        style={{
          fontFamily: 'Roboto'
        }}
      >
        <Modal.Content>
          <Icon
            name="linkify"
            size="huge"
            style={{
              color: 'teal',
              width: '100%',
              margin: 'auto',
              marginTop: '.5rem'
            }}
          />
          <div className={'modalHeader'}>Report Token</div>
          <div
            style={{
              textAlign: 'center',
              paddingTop: '.5rem'
            }}
          >
            This token will be used by your potential buyer to generate a new
            StampSafe Buyer Report.
          </div>
          <div
            style={{
              textAlign: 'center',
              paddingTop: '1rem',
              fontWeight: 500
            }}
          >
            Don&apos;t forget to share it!
          </div>
          <Grid textAlign="center">
            <Grid.Row></Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Button
                  color="teal"
                  className={'keyDownloadButton'}
                  onClick={handleDownloadToken}
                  style={{ width: '50%', marginBottom: '1.5rem' }}
                >
                  Download Token
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
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
                <Header.Content>Linked Reports</Header.Content>
                <Header.Subheader style={{ paddingTop: '1em' }}>
                  Ensure a report is
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
                John Smith
              </Grid.Column>
              <Grid.Column
                width={7}
                textAlign="left"
                style={{ color: '#5F6368' }}
              >
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
                Not Started
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
                Josh Alexander
              </Grid.Column>
              <Grid.Column
                width={7}
                textAlign="left"
                style={{ color: '#5F6368' }}
              >
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
                In Progress
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
              <Grid.Column
                width={9}
                style={{ paddingLeft: '2em', fontSize: '.9em', color: 'teal' }}
              >
                <Icon link fitted name="add circle" color="teal" />
                <span
                  className="link"
                  onClick={handleLinkBuyer}
                  style={{ textDecoration: 'none', color: 'teal' }}
                >
                  Link new buyer..
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

LinkedReportsSegment.propTypes = {
  stageAccessKey: PropTypes.string
};

export default LinkedReportsSegment;
