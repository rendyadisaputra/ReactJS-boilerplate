import React from 'react';
import Button from '../components/Button/Button';
import TextInput from '../components/Form/TextInput';

export default function FormPayment() {
  return (
    <form>
      <TextInput spacing label="Card Number" />
      <TextInput spacing label="MM / YY" />
      <TextInput label="CVC" />
      <Button className="mt3">save</Button>
    </form>
  );
}
