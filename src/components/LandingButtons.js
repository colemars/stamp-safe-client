import React, { Component }  from "react";
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import "./LandingButtons.css";

export default class LandingButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {navigateTo: ""};

    this.routeChange = this.routeChange.bind(this);
  }


  routeChange(e) {
    this.setState({navigateTo: `/${e.target.textContent}`})
  }
  
  render() {
    if (this.state.navigateTo.length > 0) {
      return <Redirect push to={this.state.navigateTo} />
    }
    return(
    <Grid className="landingButtons" textAlign='center' columns={8}>
        <Grid.Row>
          <Grid.Column>
            <Button fluid onClick={this.routeChange}>Buyer</Button>
          </Grid.Column>
          <Grid.Column>
            <Button fluid onClick={this.routeChange}>Seller</Button>
          </Grid.Column>
        </Grid.Row>
        <span className="link-block">Or <a href="123" style={{color:"inherit"}}>Log in</a></span>
      </Grid>
    )
  }
}

