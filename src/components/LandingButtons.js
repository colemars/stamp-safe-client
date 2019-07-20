import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import "./LandingButtons.css";

export default () =>
  <Button.Group>
    <Button>Buyer</Button>
      <Button.Or text='or' color='red'/>
    <Button>Seller</Button>
  </Button.Group>