import { useState } from "react";
import {
    Container,
    Row,
    Col,
    InputGroup,
    Form,
    Button,
} from "react-bootstrap";
import Task from '../task/Task';
import styles from './todo.module.css'
import ConfirmDialog from "../ConfirmDialog";


function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);


    const handleInputChange = (event) => {
        setNewTaskTitle(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.code === 'Enter') {
            addNewTask();
        }
    };

    const addNewTask = () => {
        const trimmedTitle = newTaskTitle.trim(); // trim - ktrum e probelnere toxi skzbic ev verjic

        if (trimmedTitle === '') {
            return;
        }


        const apiUrl = 'http://localhost:3001/task';

        const newTask = {
            title: trimmedTitle,
        };


        fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask)
        })

            .then((result) => result.json())
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setNewTaskTitle('');
            });
    };


    const onTaskDelete = (taskId) => {
        const newTasks = tasks.filter(task => task._id !== taskId);
        setTasks(newTasks);

        if (selectedTasks.has(taskId)) {
            const newSelectedTasks = new Set(selectedTasks);
            newSelectedTasks.delete(taskId);
            setSelectedTasks(newSelectedTasks);
        }

    };

    const onTaskSelect = (taskId) => {
        const selectedTasksCopy = new Set(selectedTasks);

        if (selectedTasksCopy.has(taskId)) {
            selectedTasksCopy.delete(taskId);
        }
        else {
            selectedTasksCopy.add(taskId);
        }
        setSelectedTasks(selectedTasksCopy);
    }

    const deleteSelectedTasks = () => {
        const newTasks = [];
        tasks.forEach((task) => {
            if (!selectedTasks.has(task._id)) {
                newTasks.push(task);
            }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
        setIsConfirmDialogOpen(false);
    };

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen);
    };
    
    const isAddNewTaskButtonDisabled = newTaskTitle.trim() === '';

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs='12' sm='8' md='6' >
                    <InputGroup className="mb-3 mt-3">
                        <Form.Control
                            placeholder="Input Task"
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            value={newTaskTitle}
                        />
                        <Button
                            variant="success"
                            onClick={addNewTask}
                            disabled={isAddNewTaskButtonDisabled}
                        >
                            Add
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {tasks.map((task) => {
                    return (
                        <Task
                            data={task}
                            key={task._id}
                            onTaskDelete={onTaskDelete}
                            onTaskSelect={onTaskSelect}
                        />
                    );

                })}

            </Row>
            <Button
                className={styles.deleteSelected}
                variant="danger"
                onClick={toggleConfirmDialog}
                disabled={!selectedTasks.size}
            >
                Delete selected
            </Button>
            {isConfirmDialogOpen &&
                <ConfirmDialog
                    tasksCount={selectedTasks.size}
                    onCancel={toggleConfirmDialog}
                    onSubmit={deleteSelectedTasks}
                />
            }
        </Container>
    );


}

export default Todo;