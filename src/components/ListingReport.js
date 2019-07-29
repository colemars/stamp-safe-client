import React, { useState } from "react";
import { API } from "aws-amplify";
import { Grid, Header, Image, Icon, Segment, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import shieldIcon from ".././shield-lock.png";
import safeShield from ".././shield-check.png";
import closeCircle from ".././close-circle.png";
import information from ".././information.png";
import accurateLogo from ".././accurate.jpeg";
import accountAlert from ".././account-alert-outline.png"
import safe from ".././safe.png";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ListingReport = (props) => {
  console.log(props)
  const [listings, setListings] = useState();
  const accessKey = props.accessKey;
  const test = async () => {
    const report = await API.get("stage", `/stage/${accessKey}`);
    setListings(report);
    console.log(report)
    return report;
  }

  // if (props.fields.length === 0) return <Redirect push to='/' />

  return (
    <div style={{ backgroundColor: "white", height: "100%", padding: "45px", color: "#202124" }}>
      <Header textAlign='center' as='h1'>
        <Header.Content>Your StampSafe Stage</Header.Content>
        <Header.Subheader style={{ padding: "1em" }}>Ensure your privacy, safety and security with StampSafe</Header.Subheader>
      </Header>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment.Group style={{ width: "70%", marginLeft: "auto" }}>
              <Segment>
                <Grid stackable columns={4}>
                  <Grid.Column width={12}>
                    <Header textAlign='left' as='h3' style={{
                      padding: "1em",
                      paddingTop: "1.5em",
                    }}>
                      <Header.Content>Linked Reports</Header.Content>
                      <Header.Subheader style={{ paddingTop: "1em" }}>
                        Ensure a report is
                    <img src={safeShield} style={{
                          width: "1em",
                          height: "1em",
                          marginLeft: ".3em",
                          marginBottom: "-.1em"
                        }} alt="" />
                        Safe before proceeding
                </Header.Subheader>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="left">
                    <Image src={shieldIcon} style={{
                      marginLeft: "-1em",
                      paddingTop: ".5em",
                      maxWidth: "6em",
                      height: "auto"
                    }} />
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment style={{ fontFamily: "Roboto", fontSize: "1.1rem", paddingTop: "1.5em", paddingBottom: "1.5em" }}>
                <Grid columns={2} textAlign="left">
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0", paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      John Smith
                </Grid.Column>
                    <Grid.Column width={7} textAlign="left" style={{ color: "#5F6368" }}>
                      <img src={closeCircle} style={{
                        width: "1em",
                        height: "1em",
                        marginLeft: ".3em",
                        marginBottom: "-.15em",
                        marginRight: ".2em"
                      }} alt="" />
                      Not Started
                </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0", paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      Deshaun Clark
                </Grid.Column>
                    <Grid.Column width={7} textAlign="left" style={{ color: "#5F6368" }}>
                      <img src={safeShield} style={{
                        width: "1em",
                        height: "1em",
                        marginLeft: ".3em",
                        marginBottom: "-.15em",
                        marginRight: ".2em"
                      }} alt="" />
                      Safe
                </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0", paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      Josh Alexander
                </Grid.Column>
                    <Grid.Column width={7} textAlign="left" style={{ color: "#5F6368" }}>
                      <Icon loading size='small' name='circle notch' color='teal' style={{
                        // width: "1em",
                        // height: "1em",
                        marginLeft: ".3em",
                        marginBottom: "-.15em"
                      }} />
                      In Progress
                </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                </Grid>
              </Segment>
            </Segment.Group>
            {/* own component start */}
            <Segment.Group style={{ width: "70%", marginLeft: "auto" }}>
              <Segment>
                <Grid stackable columns={4}>
                  <Grid.Column width={12}>
                    <Header textAlign='left' as='h3' style={{
                      padding: "1em",
                      paddingTop: "1.5em",
                    }}>
                      <Header.Content>Staging Details</Header.Content>
                      <Header.Subheader style={{ paddingTop: "1em" }}>
                        Information about your item
                </Header.Subheader>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="left">
                    <Image src={information} style={{
                      marginLeft: "-1em",
                      paddingTop: ".5em",
                      maxWidth: "6em",
                      height: "auto"
                    }} />
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment style={{ fontFamily: "Roboto", fontSize: "1.1rem", paddingTop: "1.5em", paddingBottom: "1.5em" }}>
                <Grid columns={2} textAlign="left">
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0", paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      Serial Number
                </Grid.Column>
                    <Grid.Column width={7} textAlign="left" style={{ color: "#5F6368" }}>
                      XXX-XXX-XXX
                </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0", paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      Year/Make/Model
                </Grid.Column>
                    <Grid.Column width={7} textAlign="left" style={{ color: "#5F6368" }}>
                      2012 Sig Sauer M11-A1
                </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0", paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      Condition
                </Grid.Column>
                    <Grid.Column width={7} textAlign="left" style={{ color: "#5F6368" }}>
                      Scuff on left side
                </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0", paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      Previous Owners
                </Grid.Column>
                    <Grid.Column width={7} textAlign="left" style={{ color: "#5F6368" }}>
                      0
                </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                </Grid>
              </Segment>
            </Segment.Group>
            {/* own component end */}
          </Grid.Column>
          <Grid.Column>
            {/* own component start */}
            <Segment.Group style={{ width: "70%", marginRight: "auto" }}>
              <Segment>
                <Grid stackable columns={4}>
                  <Grid.Column width={12}>
                    <Header textAlign='left' as='h3' style={{
                      padding: "1em",
                      paddingTop: "1em",
                      paddingBottom: ".5em"
                    }}>
                      <Header.Content>Criminal Record</Header.Content>
                      <Header.Subheader style={{ paddingTop: "1em" }}>
                        Utilizes Accurate Background Checks to run a Federal Criminal Record Search
                </Header.Subheader>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="left">
                    <Image src={accurateLogo} style={{
                      marginLeft: "-1em",
                      paddingTop: ".5em",
                      maxWidth: "6em",
                      height: "auto"
                    }} />
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment style={{ fontFamily: "Roboto", fontSize: "1.1rem", paddingTop: "1.5em", paddingBottom: "1em" }}>
                <Grid columns={2} textAlign="left">
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      <a href="https://www.w3schools.com" style={{ textDecoration: "none" }}>Start Here</a>
                    </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                </Grid>
              </Segment>
            </Segment.Group>
            {/* own component end */}
            {/* own component start */}
            <Segment.Group style={{ width: "70%", marginRight: "auto" }}>
              <Segment>
                <Grid stackable columns={4}>
                  <Grid.Column width={12}>
                    <Header textAlign='left' as='h3' style={{
                      padding: "1em",
                      paddingTop: "1em",
                      paddingBottom: ".5em"
                    }}>
                      <Header.Content>Stolen Property</Header.Content>
                      <Header.Subheader style={{ paddingTop: "1em" }}>
                        This is a non-comprehensive search of various stolen property databases
                </Header.Subheader>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="left">
                    <Image src={safe} style={{
                      marginLeft: "-1em",
                      paddingTop: ".5em",
                      maxWidth: "6em",
                      height: "auto"
                    }} />
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment style={{ fontFamily: "Roboto", fontSize: "1.1rem", paddingTop: "1.5em", paddingBottom: "1em" }}>
                <Grid columns={2} textAlign="left">
                  {/* own component eventually */}
                  <Grid.Row style={{ padding: "0" }}>
                    <Grid.Column width={9} style={{ paddingLeft: "2em" }}>
                      <a href="https://www.w3schools.com" style={{ textDecoration: "none" }}>View Details</a>
                    </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                </Grid>
              </Segment>
            </Segment.Group>
            {/* own component end */}
            {/* own component start */}
            <Segment.Group style={{ width: "70%", marginRight: "auto" }}>
              <Segment>
                <Grid stackable columns={4}>
                  <Grid.Column width={12}>
                    <Header textAlign='left' as='h3' style={{
                      padding: "1em",
                      paddingTop: "1em",
                      paddingBottom: ".5em"
                    }}>
                      <Header.Content>Actions</Header.Content>
                      <Header.Subheader style={{ paddingTop: "1em" }}>
                        Delete your listing or Export as a CSV
                </Header.Subheader>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="left">
                    <Image src={accountAlert} style={{
                      marginLeft: "-1em",
                      paddingTop: ".5em",
                      maxWidth: "6em",
                      height: "auto"
                    }} />
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment style={{ fontFamily: "Roboto", fontSize: "1.1rem", paddingTop: "1.5em", paddingBottom: "1em" }}>
                <Grid columns={2} textAlign="left">
                  {/* own component eventually */}
                  <Grid.Row centered columns={3} style={{ padding: "0", paddingBottom: ".6em", paddingTop: ".4em"}}>
                    <Grid.Column>
                      <Button style={{ width: "100%" }}>
                        Backup Key
                       </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button color="orange " style={{ width: "100%" }}>
                        Export CSV
                       </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button color="red" style={{ width: "100%" }}>
                        Delete
                       </Button>
                    </Grid.Column>
                  </Grid.Row>
                  {/* end own component  */}
                </Grid>
              </Segment>
            </Segment.Group>
            {/* own component end */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

ListingReport.propTypes = {
  accessKey: PropTypes.string
};

const mapStateToProps = state => ({
  fields: state.fields.fields
})

export default connect(mapStateToProps)(ListingReport)