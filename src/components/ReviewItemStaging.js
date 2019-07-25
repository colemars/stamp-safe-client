import React, { useState } from "react";
import { Grid, Input, Header, Button, Dimmer, Icon } from 'semantic-ui-react'
import v4 from "uuid";
import { Redirect } from 'react-router-dom';
import "./ReviewItemStaging.css";
import { API } from "aws-amplify";
import { connect } from 'react-redux';
import { addFields } from '../actions/index'
import { s3Upload } from "../libs/awsLib";

const buttonStyle = {
  backgroundColor: "#313131",
  color: "white",
  cursor: "pointer",
  width: "80%",
  height: "3rem",
  margin: "auto",
  marginTop: ".5rem"
}

const imageStyle = {
  borderRadius: "25px",
  border: "3px solid rgb(255, 255, 255)",
  width: "25rem",
  zIndex: 1,
  cursor: "default",
  maxWidth: "100%",
  height: "auto",
  margin: "auto",
  display: "block",
  border: "none"
}

// add functionality so that, if user hits back button or re-navigates to his page AFTER hitting submit, the fields show the infomation already submitted and editing them will edit the already existing state instead of submitting a new state

const StageItem = (props) => {
  const { serialNumber, make, model, yearManufactored, condition, previousOwners, price } = props.fields;
  
  const images  = props.images;
  
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [route, setRoute] = useState(null);

  const routeChange = () => {
    setRoute("/upload")
  }

  const stageUpload = fields => {
    return API.post("stage", "/stage", {
      body: fields
    });
  }

  const getAccessToken = () => {
    return v4();
  }

  const handleSubmit = async () => {
    console.log('submit')
    setLoading(true);

    const accessToken = getAccessToken();

    const imageKeys = await s3Upload(props.images, accessToken);

    try {
      await stageUpload({
        accessToken,
        serialNumber,
        make,
        model,
        yearManufactored,
        conditionOfItem: condition,
        previousOwners,
        price,
        imageKeys
      });
      // routeChange();
      setLoadingComplete(true);
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  }

  const imageURL = (number) => {
    if (images[number]) return URL.createObjectURL(images[number]);
    else return 'https://react.semantic-ui.com/images/wireframe/image.png'
  };

  if (route) {
    return <Redirect push to='/upload' />
  }

  // if (props.fields.length === 0) return <Redirect push to='/' />

  const dimmerIcon = loadingComplete ? <Icon name="check circle outline" size='huge' style={{color: "#2AC940"}}/> : <Icon loading name="spinner" size='huge' style={{color: "#3CA1AC"}}/> 

  return (
    <div className="itemReview">
      <Dimmer active={loading} page>
        {dimmerIcon}
      </Dimmer>
      <Grid>
        <Grid.Row centered columns={2}>
          <Grid.Column textAlign='center'>
            <Header as='h1'>Review</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={2} className="itemReviewFooterRow">
          <Grid.Column textAlign='center'>
            <div id="itemReviewFooter">Verify your information is correct - once you hit submit you won't be able to change it </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={3} style={{ marginTop: "1rem" }}>

          {/* first column */}

          <Grid.Column className="imageColumn" style={{ marginTop: ".5rem" }}>
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  <img className="Preview" src={imageURL(0)} style={{ ...imageStyle, ...{ boxShadow: "1px 3px 10px 2px rgba(52, 51, 51, 0.3)" } }} alt="" />
                </Grid.Column>
                <Grid.Column>
                  <img className="Preview" src={imageURL(1)} style={{ ...imageStyle, ...{ boxShadow: "1px 2px 10px 1px rgba(52, 51, 51, 0.3)" } }} alt="" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <img className="Preview" src={imageURL(2)} style={{ ...imageStyle, ...{ boxShadow: "1px 3px 10px 2px rgba(52, 51, 51, 0.3)" } }} alt="" />
                </Grid.Column>
                <Grid.Column>
                  <img className="Preview" src={imageURL(3)} style={{ ...imageStyle, ...{ boxShadow: "1px 3px 10px 2px rgba(52, 51, 51, 0.3)" } }} alt="" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          {/* second column */}

          <Grid.Column textAlign='left'>
            <Grid.Row>
              <Grid.Column>
                <div className="itemReviewInputBox">
                  <Input disabled id="serialNumber" className="itemReviewInput" value={serialNumber} label='SN' placeholder='Serial Number' />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="itemReviewInputBox">
                  <Input disabled id="make" className="itemReviewInput" value={make}
                    label='Make' placeholder='Make' />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="itemReviewInputBox">
                  <Input disabled id="model" className="itemReviewInput" value={model}
                    label='Model' placeholder='Model' />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="itemReviewInputBox">
                  <Input disabled id="yearManufactored" className="itemReviewInput" value={yearManufactored}
                    label='Manufactored' placeholder='Year Manufactored' />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="itemReviewInputBox">
                  <Input disabled id="condition" className="itemReviewInput" value={condition}
                    label='Condition' placeholder='Condition' />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="itemReviewInputBox">
                  <Input disabled id="previousOwners" className="itemReviewInput" value={previousOwners}
                    label='Owners' placeholder='Previous Owners' />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="itemReviewInputBox">
                  <Input disabled id="price" className="itemReviewInput" value={price}
                    label='Price' placeholder='Price' />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div style={{ textAlign: "center", paddingTop: "3.5rem", width: "20rem", margin: "auto", fontSize: ".8rem", fontFamily: "Open Sans", fontWeight: "500", lineHeight: "1rem" }}>
                By clicking submit, you agree to our <span style={{ textDecoration: "underline" }}>Terms of Service</span> and have read and understood the <span style={{ textDecoration: "underline" }}>Privacy Policy</span>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <Button fluid onClick={handleSubmit} style={buttonStyle} content='Submit' />
            </Grid.Column>
          </Grid.Row>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  fields: state.fields.fields,
  images: state.images.images
})

const mapDispatchToProps = dispatch => ({
  addFields: fields => dispatch(addFields(fields))
})

export default connect(mapStateToProps, mapDispatchToProps)(StageItem)