import { useLayoutEffect, useEffect, useState, memo } from "react";
import {
  Form,
  Button,
  Modal
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import { formatDate } from "../../utils/helpers";
import styles from './taskModal.module.css';

function TaskModal(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [isTitleValid, setIsTitleValid] = useState(false);

  useEffect(() => {
    const { data } = props;
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setDate(data.date ? new Date(data.date) : new Date());
      setIsTitleValid(true);
    }
  }, [props]);

  const saveTask = () => {
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      date: formatDate(date)
    };
    if (props.data) {
      newTask._id = props.data._id;
    }

    props.onSave(newTask);
  };

  const onTitleChange = (event) => {
    const { value } = event.target;
    const trimmedTitle = value.trim(); // trim - ktrum e probelnere toxi skzbic ev verjic

    setIsTitleValid(!!trimmedTitle);
    setTitle(value);
  };

  useLayoutEffect(() => {
    const keydownHandler = (event) => {

      if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        saveTask();
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [title, description, date]);

  return (
    <Modal
      size="md"
      show={true}
      onHide={props.onCancel}
    >
      <Modal.Header closeButton className="modal-content-bg">
        <Modal.Title> Add new task </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-content-bg">
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

      <Modal.Footer className="modal-content-bg">
        <div className="d-flex justify-content-evenly gap-3">
          <Button
            variant='success'
            onClick={saveTask}
            disabled={!isTitleValid}
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
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object
};

export default memo(TaskModal);