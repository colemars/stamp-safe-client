import React, { Component }  from "react";
import { Grid, Input, Header, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import "./StageItem.css";
import { API } from "aws-amplify";

const disabledButtonStyle = {
  backgroundColor: "#E6E6E6",
  cursor: "default"
}


export default class StageItem extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      serialNumber: "",
      make: "",
      model: "",
      yearManufactored: "",
      condition: "",
      previousOwners: "",
      price: "",
      navigateTo: ""
    };

    this.routeChange = this.routeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.serialNumber.length > 0 &&
      this.state.make.length > 0 &&
      this.state.model.length > 0 &&
      this.state.yearManufactored.length > 0 &&
      this.state.condition.length > 0 &&
      this.state.previousOwners.length > 0 &&
      this.state.price.length > 0;
  }

  stageUpload(fields) {
    return API.post("stage", "/stage", {
      body: fields
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log("change")
  }

  routeChange() {
    this.setState({navigateTo: `/upload`})
  }

  handleSubmit = async event => {
    this.setState({ isLoading: true });

    try {
      await this.stageUpload({
        serialNumber: this.state.serialNumber,
        make: this.state.make,
        model: this.state.model,
        yearManufactored: this.state.yearManufactored,
        conditionOfItem: this.state.condition,
        previousOwners: this.state.previousOwners,
        price: this.state.price
      });
      this.routeChange();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  render() {
    if (this.state.navigateTo.length > 0) {
      return <Redirect push to='/upload' />
    }
    let test = this.validateForm() 
    ? <Button fluid onClick={this.handleSubmit} style={{backgroundColor: "#313131"}} content='Submit' />
    : <Button fluid style={disabledButtonStyle} content='Submit' />
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
                <Input id="serialNumber" className="itemInput" onChange={this.handleChange}
              value={this.state.serialNumber || ''} transparent placeholder='Serial Number' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input id="make" className="itemInput" onChange={this.handleChange}
              value={this.state.make || ''} transparent placeholder='Make' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input id="model" className="itemInput" onChange={this.handleChange}
              value={this.state.model || ''} transparent placeholder='Model' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input id="yearManufactored" className="itemInput" onChange={this.handleChange}
              value={this.state.yearManufactored || ''} transparent placeholder='Year Manufactored' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input id="condition" className="itemInput" onChange={this.handleChange}
              value={this.state.condition || ''} transparent placeholder='Condition' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input id="previousOwners" className="itemInput" onChange={this.handleChange}
              value={this.state.previousOwners || ''} transparent placeholder='Previous Owners' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="itemInputBox">
                <Input id="price" className="itemInput" onChange={this.handleChange}
              value={this.state.price || ''} transparent placeholder='Price' />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {test}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}