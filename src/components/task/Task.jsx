
import PropTypes from 'prop-types';
import { Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from "../../utils/helpers";
import styles from './task.module.css';

function Task(props) {
    const task = props.data;

    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <Card className='mt-2 mb-2'>
                <Card.Body>
                    <Form.Check
                        className={styles.selectTask}
                        onChange={() => props.onTaskSelect(task._id)}
                        checked={props.checked}
                    />
                    <Card.Title className={styles.textEllipsis}>{task.title}</Card.Title>
                    <Card.Text className={styles.textEllipsis}>
                        {task.description}
                    </Card.Text>
                    <Card.Text> Status: {task.status} </Card.Text>
                    <Card.Text> Created At: {formatDate(task.created_at)} </Card.Text>
                    <Card.Text> Deadline: {formatDate(task.date)} </Card.Text>
                    <div className={styles.actionButtons}>
                        {
                            task.status === 'active' ?
                                <Button
                                    title="Mark as done"
                                    variant="success"
                                    onClick={() => props.onStatusChange({ status: 'done', _id: task._id })}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button> :
                                <Button
                                    title="Mark as active"
                                    variant="info"
                                    onClick={() => props.onStatusChange({ status: 'active', _id: task._id })}>
                                    <FontAwesomeIcon icon={faHistory} />
                                </Button>
                        }

                        <Button
                            title="Edit"
                            variant="warning"
                            className={styles.actionButton}
                            onClick={() => props.onTaskEdit(task)}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>

                        <Button
                            title="Delete"
                            variant="danger"
                            className={styles.deleteButton}
                            onClick={() => {
                                props.onTaskDelete(task._id);
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskSelect: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default (Task);