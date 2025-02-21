/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Grid, Header, Button, Divider, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './UploadImage.css';
import v4 from 'uuid';
import { connect } from 'react-redux';
import DragNDrop from './fileDragNDropUpload';
import PasteImageInput from './PasteImageInput';
import PreviewFloat from './PreviewFloat';

const buttonStyle = {
  backgroundColor: '#313131',
  color: 'white',
  cursor: 'pointer',
  width: '100%',
  height: '3rem',
  margin: 'auto',
  marginTop: '3rem'
};

const disabledButtonStyle = {
  ...buttonStyle,
  ...{
    backgroundColor: '#E6E6E6',
    cursor: 'default'
  }
};

// TODO: add limit for file uploads

const UploadImage = props => {
  const [route, setRoute] = useState(null);
  let leftPosition = 50;
  let topPosition = 8;
  const previewFloats = props.images.map(imageFile => {
    const objectURL = URL.createObjectURL(imageFile);
    const position = {
      left: `${leftPosition}%`,
      top: `${topPosition}rem`
    };

    leftPosition = leftPosition === 50 ? 49 : 50;
    topPosition += 5;

    return <PreviewFloat url={objectURL} position={position} key={v4()} />;
  });

  const routeChange = () => {
    setRoute('/review');
  };

  const handleSubmit = () => {
    routeChange();
  };

  const button =
    props.images.length > 0 ? (
      <Button
        fluid
        onClick={handleSubmit}
        style={buttonStyle}
        content="Continue"
      />
    ) : (
      <Button fluid style={disabledButtonStyle} content="Continue" />
    );

  if (props.fields.length === 0) return <Redirect push to="/" />;
  if (route) return <Redirect push to={route} />;
  return (
    <div className="uploadImage">
      <Grid textAlign="center" columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Image Upload</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="uploadImageFooterRow">
          <Grid.Column>
            <span id="uploadImageFooter">
              Choose pictures with good lighting and detail
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="uploadImageFooterRow">
          <Grid.Column>
            <div id="ImageUploadDialog">
              {previewFloats}
              <div id="imageUploadWrapper">
                <DragNDrop />
                <div id="chooseImageBox">
                  <div id="imageChoice">
                    <Button icon>
                      <Icon name="file image outline" />
                      &nbsp; &nbsp; Choose Photo &nbsp; &nbsp; &nbsp; &nbsp;
                    </Button>
                    <Divider horizontal id="divider">
                      Or
                    </Divider>
                    <PasteImageInput />
                  </div>
                </div>
              </div>
              {button}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  images: state.images.images,
  fields: state.fields.fields
});

export default connect(mapStateToProps)(UploadImage);
