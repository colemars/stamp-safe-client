import React, { Fragment } from "react";
import { Grid, Input, Header, Button, Divider, Icon } from 'semantic-ui-react'
import "./UploadImage.css";
import DragNDrop from './fileDragNDropUpload';

export default () =>
  <div className="uploadImage">
    <Grid textAlign='center' columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Header as='h1'>Image Upload</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="uploadImageFooterRow">
        <Grid.Column>
          <span id="uploadImageFooter">Choose images with good lighting and detail</span>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="uploadImageFooterRow">
        <Grid.Column>
          <div id="imageUploadWrapper">
              <DragNDrop />
            <div id="chooseImageBox">
              <div id="imageChoice">
                <Button icon>
                  <Icon name='file image outline' />
                  &nbsp;
                  &nbsp;
                  Choose Photo
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                </Button>
                <Divider horizontal id="test">Or</Divider>
                <Input placeholder='Paste Image or URL' />
              </div>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>