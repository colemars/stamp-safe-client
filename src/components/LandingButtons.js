import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import "./LandingButtons.css";

const LandingButtons = () => {
  const [route, setRoute] = useState(null);

  if (route) return <Redirect push to={route} />

  return (
    <Grid className="landingButtons" textAlign='center' columns={8}>
      <Grid.Row>
        <Grid.Column>
          <Button fluid onClick={e => setRoute("buyer")}>Buyer</Button>
        </Grid.Column>
        <Grid.Column>
          <Button fluid onClick={e => setRoute("stage")}>Seller</Button>
        </Grid.Column>
      </Grid.Row>
      <span className="link-block">Or <a href="123" style={{ color: "inherit" }}>Log in</a></span>
    </Grid>
  )
}

export default LandingButtons;
