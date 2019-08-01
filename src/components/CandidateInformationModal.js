/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { API } from 'aws-amplify';
import { connect } from 'react-redux';
import { addFields } from '../actions/index';

const DescriptiveLinkSegment = props => {
  const [firstName, setfirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [ssn, setSSN] = useState(null);
  const [email, setEmail] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [address, setAddress] = useState(null);
  const [region, setRegion] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [loading, setLoading] = useState(null);

  const backgroundCheck = fields => {
    return API.post('stage', '/backgroundcheck', {
      body: fields
    });
  };

  const validateForm = () => {
    return (
      firstName &&
      lastName &&
      phone &&
      dateOfBirth.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g) &&
      // eslint-disable-next-line no-useless-escape
      ssn.match(/^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/g) &&
      email &&
      city &&
      country &&
      address &&
      postalCode &&
      region
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await backgroundCheck({
        firstName,
        middleName,
        lastName,
        phone,
        dateOfBirth,
        ssn,
        email,
        city,
        country,
        address,
        postalCode,
        region
      });
      setLoading(false);
      if (result.id) {
        props.addFields({
          ...props.fields,
          backgroundCheckStatus: 'In Progress'
        });
        props.setOpen(false);
        props.updateStatuses({ backgroundCheckStatus: 'In Progress' });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const button = validateForm() ? (
    <Button
      positive
      icon="checkmark"
      labelPosition="left"
      content="Submit"
      onClick={handleSubmit}
    />
  ) : (
    <Button
      disabled
      icon="checkmark"
      labelPosition="left"
      content="Submit"
      onClick={handleSubmit}
    />
  );

  return (
    <Modal
      size={'small'}
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <Modal.Header>Background Check</Modal.Header>
      <Modal.Content scrolling>
        <Form loading={loading}>
          <Form.Group widths="equal">
            <Form.Input
              required
              fluid
              label="First name"
              placeholder="First name"
              onChange={e => setfirstName(e.target.value)}
            />
            <Form.Input
              fluid
              label="Middle Name"
              placeholder="Middle Name"
              onChange={e => setMiddleName(e.target.value)}
            />
            <Form.Input
              required
              fluid
              label="Last name"
              placeholder="Last name"
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              required
              fluid
              label="Date of birth"
              placeholder="Date of birth"
              onChange={e => setDateOfBirth(e.target.value)}
            />
            <Form.Input
              required
              fluid
              label="Social Security Number"
              placeholder="Social Security Number"
              onChange={e => setSSN(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              required
              fluid
              label="Email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Input
              required
              fluid
              label="Phone Number"
              placeholder="Phone Number"
              onChange={e => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              required
              fluid
              label="Address"
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
            />
            <Form.Input
              required
              fluid
              label="Postal Code"
              placeholder="Postal Code"
              onChange={e => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              required
              fluid
              label="City"
              placeholder="City"
              onChange={e => setCity(e.target.value)}
            />
            <Form.Input
              required
              fluid
              label="State"
              placeholder="State"
              onChange={e => setRegion(e.target.value)}
            />
            <Form.Input
              required
              fluid
              label="Country"
              placeholder="Country"
              onChange={e => setCountry(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>{button}</Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  fields: state.fields.fields
});

const mapDispatchToProps = dispatch => ({
  addFields: fields => dispatch(addFields(fields))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DescriptiveLinkSegment);
