import React from "react";
import { Button } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import "./LandingButtons.css";

export default () =>
<Grid className="landingButtons" textAlign='center' columns={8}>
    <Grid.Row>
      <Grid.Column>
        <Button fluid vertical>Buyer</Button>
      </Grid.Column>
      <Grid.Column>
        <Button fluid vertical>Seller</Button>
      </Grid.Column>
    </Grid.Row>
    <span className="link-block">Or <a href="123" style={{color:"inherit"}}>Log in</a></span>
  </Grid>