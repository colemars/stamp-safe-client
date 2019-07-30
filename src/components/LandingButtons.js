import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';

import './LandingButtons.css';

const LandingButtons = () => {
  const [route, setRoute] = useState(null);

  if (route) return <Redirect push to={route} />;

  return (
    <Grid className="landingButtons" textAlign="center" columns={8}>
      <Grid.Row>
        <Grid.Column>
          <Button fluid onClick={() => setRoute('get-report')}>
            Buyer
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button fluid onClick={() => setRoute('stage')}>
            Seller
          </Button>
        </Grid.Column>
      </Grid.Row>
      <span className="link-block">
        Or{' '}
        <a href="123" style={{ color: 'inherit' }}>
          Get Report
        </a>
      </span>
    </Grid>
  );
};

export default LandingButtons;
