import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Container,
    Row,
    Col,
    Button,
} from "react-bootstrap";
import Task from '../../components/task/Task';
import styles from './todo.module.css'
import ConfirmDialog from "../../components/ConfirmDialog";
import TaskModal from "../../components/taskModal/TaskModal.jsx";
import Filters from "../../components/filters/Filters.jsx";
import TaskApi from '../../api/taskApi';

const taskApi = new TaskApi();

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    const getTasks = (filters) => {
        taskApi.getAll(filters)
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    const onAddNewTask = (newTask) => {
        taskApi
            .add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.success('🦄 The task has been added successfully!');
            })
            .catch((err) => {
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
                const newTasks = [...tasks];
                const foundIndex = newTasks.findIndex((t) => t._id === task._id);
                newTasks[foundIndex] = task;
                toast.success(`🦄 task has been updated successfully!`);
                setTasks(newTasks);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const onFilter = (filters) => {
        getTasks(filters);
    };

    return (
        <Container>
            <Row className="justify-content-center m-2"  >
                <Col xs='6' sm='4' md='3' className="text-center p-1">
                    <Button
                        variant="success w-100"
                        onClick={() => setIsAddTaskModalOpen(true)}
                    >
                        Add new task
                    </Button>
                </Col>

                <Col xs='6' sm='4' md='3' className="text-center p-1">
                    <Button
                        variant='primary w-100'
                        onClick={selectAllTasks}
                    >
                        Select all
                    </Button>
                </Col>

                <Col xs='6' sm='4' md='3' className="text-center p-1">
                    <Button
                        variant='secondary w-100'
                        onClick={resetSelectedTasks}
                    >
                        Reset selected
                    </Button>
                </Col>

                <Col xs='6' sm='4' md='3' className="text-center p-1">
                    <Button
                        variant='danger w-100'
                        onClick={toggleConfirmDialog}
                        disabled={!selectedTasks.size}
                    >
                        Delete selected
                    </Button>
                </Col>
            </Row>

            <Row>
                <Filters onFilter={onFilter} />
            </Row>

            <Row className={styles.scrollTasks}>
                {tasks.map((task) => {
                    return (
                        <Task
                            data={task}
                            key={task._id}
                            onTaskDelete={onTaskDelete}
                            onTaskSelect={onTaskSelect}
                            checked={selectedTasks.has(task._id)}
                            onTaskEdit={setEditableTask}
                            onStatusChange={onEditTask}
                        />
                    );
                })}
            </Row>

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


        </Container>
    );
}

export default Todo;