import React, { useState } from "react";
import { Grid, Input, Header, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import "./StageItem.css";
import { API } from "aws-amplify";
import { connect } from 'react-redux';
import { addFields } from '../actions/index'

const disabledButtonStyle = {
  backgroundColor: "#E6E6E6",
  cursor: "default"
}

const StageItem = (props) => {

  const [loading, setLoading] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [yearManufactored, setYearManufactored] = useState(null);
  const [condition, setCondition] = useState(null);
  const [previousOwners, setPreviousOwners] = useState(null);
  const [price, setPrice] = useState(null);
  const [route, setRoute] = useState(null);

  const validateForm = () => {
    return serialNumber > 0 &&
      make > 0 &&
      model > 0 &&
      yearManufactored > 0 &&
      condition > 0 &&
      previousOwners > 0 &&
      price > 0;
  }

  const stageUpload = fields => {
    return API.post("stage", "/stage", {
      body: fields
    });
  }

  const routeChange = () => {
    setRoute("/upload")
  }

  const handleSubmit = async () => {
    const fields = [
      serialNumber,
      make,
      model,
      yearManufactored,
      condition,
      previousOwners,
      price
    ]

    props.addFields(fields)

    routeChange()

    // setLoading(true);

    // try {
    //   await stageUpload({
    //     serialNumber: serialNumber,
    //     make: make,
    //     model: model,
    //     yearManufactored: yearManufactored,
    //     conditionOfItem: condition,
    //     previousOwners: previousOwners,
    //     price: price
    //   });
    //   routeChange();
    //   setLoading(false);
    // } catch (e) {
    //   alert(e);
    //   setLoading(false);
    // }
  }
  
  let button = validateForm()
  ? <Button fluid onClick={handleSubmit} style={{ backgroundColor: "#313131" }} content='Submit' />
  : <Button fluid style={disabledButtonStyle} content='Submit' />
  
  if (route) {
    return <Redirect push to='/upload' />
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
              <Input id="serialNumber" className="itemInput" onChange={e => setSerialNumber(e.target.value)}
                transparent placeholder='Serial Number' />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input id="make" className="itemInput" onChange={e => setMake(e.target.value)}
                transparent placeholder='Make' />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input id="model" className="itemInput" onChange={e => setModel(e.target.value)}
                transparent placeholder='Model' />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input id="yearManufactored" className="itemInput" onChange={e => setYearManufactored(e.target.value)}
                transparent placeholder='Year Manufactored' />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input id="condition" className="itemInput" onChange={e => setCondition(e.target.value)}
                transparent placeholder='Condition' />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input id="previousOwners" className="itemInput" onChange={e => setPreviousOwners(e.target.value)}
                transparent placeholder='Previous Owners' />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="itemInputBox">
              <Input id="price" className="itemInput" onChange={e => setPrice(e.target.value)}
                transparent placeholder='Price' />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {button}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  fields: state.fields
})

const mapDispatchToProps = dispatch => ({
  addFields: fields => dispatch(addFields(fields))
})

export default connect(mapStateToProps, mapDispatchToProps)(StageItem)