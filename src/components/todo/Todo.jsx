import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {
    Container,
    Row,
    Col,
    Button,
} from "react-bootstrap";
import Task from '../task/Task';
import styles from './todo.module.css'
import ConfirmDialog from "../ConfirmDialog";
import TaskModal from "../taskModal/TaskModal.jsx";
import TaskApi from '../../api/taskApi';


const taskApi = new TaskApi();

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    //const [taskToDelete, setTaskToDelete] = useState(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    useEffect(() => {
        taskApi.getAll().then((tasks) => {
            setTasks(tasks);
        });
    }, []);

    const onAddNewTask = (newTask) => {
        taskApi.add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.success('🦄 The task has been added successfully!');
            })
            .catch((err) => {
                console.log('err', err);
                toast.error(err.message);
            });
    };


    const onTaskDelete = (taskId) => {
        taskApi
            .delete(taskId)
            .then(() => {
                const newTasks = tasks.filter(task => task._id !== taskId);
                setTasks(newTasks);

                if (selectedTasks.has(taskId)) {
                    const newSelectedTasks = new Set(selectedTasks);
                    newSelectedTasks.delete(taskId);
                    setSelectedTasks(newSelectedTasks);
                }

                toast.success('🦄 The task has been deleted successfully!');
            })
            .catch((err) => {
                toast.error(err.message);
            });
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
        taskApi
            .deleteMany([...selectedTasks])
            .then(() => {
                const newTasks = [];
                const deletedTasksCount = selectedTasks.Size;
                tasks.forEach((task) => {
                    if (!selectedTasks.has(task._id)) {
                        newTasks.push(task);
                    }
                });
                setTasks(newTasks);
                setSelectedTasks(new Set());
                setIsConfirmDialogOpen(false);

                toast.success(`🦄 ${deletedTasksCount} tasks have been deleted successfully!`);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen);
    };

    const selectAllTasks = () => {
        const taskIds = tasks.map(task => task._id);
        setSelectedTasks(new Set(taskIds));
    };

    const resetSelectedTasks = () => {
        setSelectedTasks(new Set());
    };

    const onEditTask = (editedTask) => {        
        taskApi
            .update(editedTask)
            .then((task) => {
                console.log('task', task);
                toast.success(`🦄 task has been updated successfully!`);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
            });

        
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs='12' sm='8' md='6' >
                    <Button
                        variant="success"
                        onClick={() => setIsAddTaskModalOpen(true)}
                    >
                        Add new task
                    </Button>
                </Col>

                <Col xs='6' sm='4' md='3'>
                    <Button variant='warning' onClick={selectAllTasks}>
                        Select all
                    </Button>
                </Col>

                <Col xs='6' sm='4' md='3'>
                    <Button variant='secondary' onClick={resetSelectedTasks}>
                        Reset selected
                    </Button>
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
                            checked={selectedTasks.has(task._id)}
                            onTaskEdit={setEditableTask}
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
            {isConfirmDialogOpen && (
                <ConfirmDialog
                    tasksCount={selectedTasks.size}
                    onCancel={toggleConfirmDialog}
                    onSubmit={deleteSelectedTasks}
                />
            )}

            {isAddTaskModalOpen && (
                <TaskModal
                    onCancel={() => setIsAddTaskModalOpen(false)}
                    onSave={onAddNewTask}
                />
            )}

            {editableTask && (
                <TaskModal
                    onCancel={() => setEditableTask(null)}
                    onSave={onEditTask}
                    data={editableTask}
                />
            )}

            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Container>
    );


}

export default Todo;