import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function AddButton(props) {
  const { isArray, onSave } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [property, setProperty] = React.useState({ name: '', value: '' });

  function resetAndOpen() {
    setProperty({ name: '', value: '' });
    setIsOpen(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setProperty({ ...property, [name]: value });
  }

  function saveAndClose() {
    onSave(property);
    setIsOpen(false);
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={<button onClick={resetAndOpen}>+</button>}
    >
      <Modal.Header>Add {isArray ? 'Item' : 'Property'}</Modal.Header>
      <Modal.Content>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={property.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="value"
          placeholder="value"
          value={property.value}
          onChange={handleChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic content="Cancel" onClick={() => setIsOpen(false)} />
        <Button positive content="Save" onClick={saveAndClose} />
      </Modal.Actions>
    </Modal>
  );
}
