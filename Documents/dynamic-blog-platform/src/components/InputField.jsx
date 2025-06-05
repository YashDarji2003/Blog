import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ label, type = 'text', placeholder, as = 'input', ...rest }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="text-white">{label}</Form.Label>
      <Form.Control
        as={as}
        type={type}
        placeholder={placeholder}
        className="bg-dark text-white border-secondary"
        {...rest}
      />
    </Form.Group>
  );
};

export default InputField;
