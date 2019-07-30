import React, { useState } from "react";
import { Grid, Input, Header, Button, Dimmer, Icon, Modal } from 'semantic-ui-react'
import v4 from "uuid";
import { Redirect } from 'react-router-dom';
import "./ReviewItemStaging.css";
import { API } from "aws-amplify";
import { connect } from 'react-redux';
import { addFields } from '../actions/index'
import { addStageAccessKey } from '../actions/index'
import { s3Upload } from "../libs/awsLib";
import download from "downloadjs"

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

// TODO add functionality so that, if user hits back button or re-navigates to his page AFTER hitting submit, the fields show the infomation already submitted and editing them will edit the already existing state instead of submitting a new state

const StageItem = (props) => {
  const { serialNumber, make, model, yearManufactored, condition, previousOwners, price } = props.fields;
  const images  = props.images;
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [route, setRoute] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [accessKey, setAccessKey] = useState();


  const routeChange = (route) => {
    setRoute(route)
  }

  const stageUpload = fields => {
    return API.post("stage", "/stage", {
      body: fields
    });
  }

  const getAccessKey = () => {
    const key = v4();
    setAccessKey(key)
    return key;
  }

  const uploadComplete = () => {
    setLoadingComplete(true);
    setTimeout(() => {
      setModalOpen(true);
      setLoadingComplete(false);
      setLoading(false);
    }, 1000);
  }

  const handleSubmit = async () => {
    setLoading(true);
    const accessToken = getAccessKey();
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
      uploadComplete();
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  }

  const handleDownloadKey = () => {
    download(accessKey, "STAMPSAFE-LISTINGKEY.txt", "text/plain");
    props.addStageAccessKey(accessKey);
    routeChange('/stage-report')
  }

  const imageURL = (number) => {
    if (images[number]) return URL.createObjectURL(images[number]);
    else return 'https://react.semantic-ui.com/images/wireframe/image.png'
  };

  const dimmerIcon = loadingComplete ? <Icon name="check circle outline" size='huge' style={{color: "#2AC940"}}/> : <Icon loading name="spinner" size='huge' style={{color: "#3CA1AC"}}/> 

  if (route) {
    return <Redirect push to={route} />
  }

  // if (props.fields.length === 0) return <Redirect push to='/' />

  return (
    <div className="itemReview">
      <Dimmer active={loading} page>
        {dimmerIcon}
      </Dimmer>
      <Modal
        open={modalOpen}
        onClose={e => setModalOpen(false)}
        size='tiny'
      >
        <Modal.Content>
          <Icon className={"warningIcon"} name="warning sign" size='huge' style={{color: "#B51F23", width: "100%", margin: "auto", marginTop: "1rem"}}/> 
          <div className={"modalHeader"}>Here is your Listing Key!</div>
          <div className={"modalContent"}>You will need this to access the listing you just created.</div>
          <div className={"modalSubContent"}>In an effort to protect your privacy there is not a sign up process. This key is how you will access your information. If you lose this key <span className={"modalEmphasis"}>access to your listing will be lost and will be irrecoverable.</span></div>
            <div className={"keyBox"}>
          <Grid columns={2}>
            <Grid.Column width={10}>
              <Grid.Row>
                <div className={"listKeyHeader"}>Backup your StampSafe Listing Key</div>
              </Grid.Row>
              <Grid.Row>
                <div className={"listKey"}><Icon name='key'/>{accessKey}</div>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button color='teal' className={"keyDownloadButton"} onClick={handleDownloadKey}>Download Key</Button> 
            </Grid.Column>
          </Grid>
            </div>
        </Modal.Content>
      </Modal>
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
                    label='$' placeholder='Price' />
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
  addFields: fields => dispatch(addFields(fields)),
  addStageAccessKey: key => dispatch(addStageAccessKey(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(StageItem)