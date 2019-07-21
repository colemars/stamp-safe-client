import React, { Fragment } from "react";
import { Grid, Input, Header, Button } from 'semantic-ui-react'
import "./StageItem.css";

export default () =>
  <div className ="stageItem">
    <Grid textAlign='center' columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Header as='h1'>Stage Item</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="stageItemFooterRow">
        <Grid.Column>
          <span id="stageItemFooter">Looking for an item you've already staged? <a href="123" style={{color:"inherit"}}>Find it here</a></span>
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
          <Button fluid>Submit</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>