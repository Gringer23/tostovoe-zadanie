import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ErrorMessage from "../ErrorMessage";
import {toast, ToastContainer} from "react-toastify";
import styles from './RegistrationForm.module.scss'
import {Link} from "react-router-dom";

const RegistrationForm = () => {
    const { handleSubmit, control, getValues, formState: {isSubmitting, errors} } = useForm();

    const onSubmit = handleSubmit((data) => {
        // Здесь можно обработать отправку данных формы, например, на сервер
        try{
            console.log(data);
            toast.success("Данные успешно отправлены!", {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
        catch (e){
            toast.error('Произошла ошибка при регистрации.', {
                position: "bottom-right",
                autoClose: 3000,
            });
        }

    });

    return (
        <div className={styles.RegistrationForm}>
            <Link to={'/todo'}>TodoList</Link>
            <Link to={'/picture'}>Картинки</Link>
        <form onSubmit={onSubmit}>
            <h1>Форма регистрации</h1>
            <div>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Поле "Имя" обязательно для заполнения' }}
                    render={({ field }) => <input type="text" placeholder={'Имя'} {...field} />}
                />
                {errors.name && <ErrorMessage error={errors.name}/>}
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Поле "Почта" обязательно для заполнения',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Неправильный формат email',
                        },
                    }}
                    render={({ field }) => <input type="text" placeholder={'Email'} {...field}></input>}
                />
                {errors.email && <ErrorMessage error={errors.email}/>}
                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Поле "Телефон" обязательно для заполнения' }}
                    render={({ field }) => <input type="text" placeholder={'Телефон'} {...field} />}
                />
                {errors.phone && <ErrorMessage error={errors.phone}/>}
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Поле "Пароль" обязательно для заполнения' }}
                    render={({ field }) => <input type="password" placeholder={'Пароль'} {...field} />}
                />
                {errors.password && <ErrorMessage error={errors.password}/>}
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Поле "Подтвердить пароль" обязательно для заполнения',
                        validate: (value) => value === getValues('password') || 'Пароли должны совпадать',
                    }}
                    render={({ field }) => <input type="password" placeholder={'Подтвердите пароль'} {...field} />}
                />
                {errors.confirmPassword && <ErrorMessage error={errors.confirmPassword}/>}
                <div className={styles.checkbox}>
                    <Controller
                        name="checkbox"
                        control={control}
                        defaultValue={false}
                        rules={{ required: 'Вы должны согласиться с условиями' }}
                        render={({ field }) => (
                            <input type="checkbox" {...field} />
                        )}
                    />{' '}
                    <div>Я согласен с условиями</div>
                </div>
                {errors.checkbox && <ErrorMessage error={errors.checkbox}/>}
            </div>
            <button type="submit" disabled={isSubmitting}>Отправить</button>
        </form>
            <ToastContainer/>
        </div>
    );
};

export default RegistrationForm;