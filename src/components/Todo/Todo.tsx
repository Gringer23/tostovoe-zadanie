import React, { useState } from 'react';
import {Link} from "react-router-dom";

import styles from './style.module.scss';

interface Todo {
    text: string;
    id: number;
}

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editingIndex, setEditingIndex] = useState<number>(-1);
    const [editedTodo, setEditedTodo] = useState<string>('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() === '') return;

        setTodos([...todos, { text: newTodo, id: Date.now() }]);
        setNewTodo('');
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleEditTodo = (id: number) => {
        setEditingIndex(id);
        setEditedTodo(todos.find((todo) => todo.id === id)!.text);
        setIsPopupOpen(true);
    };

    const handleSaveEdit = () => {
        const updatedTodos = todos.map((todo) =>
            todo.id === editingIndex ? { ...todo, text: editedTodo } : todo
        );
        setTodos(updatedTodos);
        setEditingIndex(-1);
        setEditedTodo('');
        setIsPopupOpen(false);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className={styles.TodoList}>
            <Link to={'/'}>Форма</Link>
            <Link to={'/picture'}>Картинки</Link>
            <h1>Todo List</h1>
            <div className={styles.inputTodo}>
                <input
                    type="text"
                    placeholder="Введите задачу"
                    value={newTodo}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddTodo}>Добавить</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <div className={styles.inputTodo}>
                            <input type="checkbox"/>
                            <p>{todo.text}</p>
                                <button onClick={() => handleEditTodo(todo.id)}>Редактировать</button>
                                <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
                            </div>
                    </li>
                ))}
            </ul>
            {isPopupOpen && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h1>Редактирование TODO</h1>
                        <div className={styles.editTodo}>
                            <input
                                type="text"
                                value={editedTodo}
                                onChange={(e) => setEditedTodo(e.target.value)}
                            />
                            <button onClick={handleSaveEdit}>Сохранить</button>
                            <button onClick={handleClosePopup}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;