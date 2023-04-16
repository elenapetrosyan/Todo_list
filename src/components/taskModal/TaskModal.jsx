import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Modal
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import styles from './taskModal.module.css';

function TaskModal(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [isTitleValid, setIsTitleValid] = useState(false);

  const saveTask = () => {
    const newTask = {
      title: title.trim(), 
      description: description.trim(),
      //date: date.toLocaleDateString()
    };
    props.onSave(newTask);
  };

  const onTitleChange = (event) => {
    const { value } = event.target;
    const trimmedTitle = value.trim(); // trim - ktrum e probelnere toxi skzbic ev verjic

    setIsTitleValid(!!trimmedTitle);
    setTitle(value);
  };

  return (
    <Modal
      size="sm"
      show={true}
      onHide={props.onCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title> Add new task </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Control
          className={`${!isTitleValid ? styles.invalid : ''} mb-2`}
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
        />
        <Form.Control
          className='mb-2'
          as="textarea"
          placeholder='Description'
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <h6>Deadline:</h6>
        <DatePicker
          showIcon
          selected={date}
          onChange={setDate}
        />
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-evenly gap-3">
          <Button 
          variant='success' 
          onClick={saveTask} 
          disabled = {!isTitleValid}
          >
            Save
          </Button>
          <Button
            variant='warning' onClick={props.onCancel}>
            Cancel </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

TaskModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default TaskModal;