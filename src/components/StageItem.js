import React, { Component }  from "react";
import { Grid, Input, Header, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import "./StageItem.css";

export default class StageItem extends Component  {
  constructor(props) {
    super(props);
    this.state = {navigateTo: ""};

    this.routeChange = this.routeChange.bind(this);
  }


  routeChange(e) {
    this.setState({navigateTo: `/${e.target.textContent.toLowerCase()}`})
  }
  
  render() {
    if (this.state.navigateTo.length > 0) {
      return <Redirect push to='/uploadimage' />
    }
    return (
      <div className="stageItem">
        <Grid textAlign='center' columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header as='h1'>Stage Item</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="stageItemFooterRow">
            <Grid.Column>
              <span id="stageItemFooter">Looking for an item you've already staged? <a href="123" style={{ color: "inherit" }}>Find it here</a></span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input className="itemInput" transparent placeholder='Serial Number' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input className="itemInput" transparent placeholder='Make' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input className="itemInput" transparent placeholder='Model' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input className="itemInput" transparent placeholder='Year Manufactored' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input className="itemInput" transparent placeholder='Condition' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input className="itemInput" transparent placeholder='Previous Owners' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input className="itemInput" transparent placeholder='Price' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button fluid onClick={this.routeChange}>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}