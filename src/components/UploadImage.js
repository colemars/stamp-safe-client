import React, { useState } from "react";
import { Grid, Input, Header, Button, Divider, Icon } from 'semantic-ui-react'
import "./UploadImage.css";
import DragNDrop from './fileDragNDropUpload';
import config from '../config'
import convertBlob from '../helpers/blobToFile';
import { v4 } from 'uuid'
import { connect } from 'react-redux';
import { addImage } from '../actions/index'

const style = {
  backgroundColor: "rgb(50, 50, 50)",
  color: "white",
  fontSize: "14px",
  width: "18vw",
  borderRadius: "6px"
}

function UploadImage(props) {

  const [imageUrl, setImageUrl] = useState(
    ''
  );

  const [isUrlLoading, setUrlLoading] = useState(
    false
  );

  const handleURLPaste = async (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const urlString = clipboardData.getData('Text');
    setUrlLoading(true);
    setImageUrl(urlString);
    fetch(urlString)
      .then(res => res.blob())
      .then(blob => {
        console.log(blob)
        if (config.file.allowedFileSize < blob.size) {
          console.log("Sorry, URL failed to upload.", "Error: size limit exceeded");
          setUrlLoading(false);
          setImageUrl("");
          return;
        }
        if (config.file.allowedFileTypes.indexOf(blob.type) === -1) {
          console.log("Sorry, URL failed to upload.", "Error: wrong file type");
          setUrlLoading(false);
          setImageUrl("");
          return;
        }
        console.log("success");
        setUrlLoading(false);
        setImageUrl("");
        const imageFile = convertBlob(blob, v4());
        props.addImage(imageFile)

        // creates image to diplay
        // let objectURL = URL.createObjectURL(convertBlob(blob, v4()));
        // let myImage = new Image();
        // myImage.src = objectURL;
        // console.log(myImage)
      })
      .catch(error => {
        console.log(error)
        setUrlLoading(false);
        setImageUrl("");
      })
  }

  return (
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
                  <Input
                    loading={isUrlLoading}
                    onPaste={handleURLPaste}
                    value={imageUrl}
                    placeholder='Paste image or URL'
                    input={<input style={style} />}
                  />
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  images: state.images
})

const mapDispatchToProps = dispatch => ({
  addImage: image => dispatch(addImage(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage)