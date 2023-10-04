import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './CropImage'; // Функция для кадрирования
import styles from './styles.module.scss'
import {Link} from "react-router-dom";

const UploadAndCropImage = () => {
    const [image, setImage] = useState<string | null>(null);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [croppedArea, setCroppedArea] = useState<{ x: number; y: number; width: number; height: number } | null>(
        null
    );
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedArea(croppedAreaPixels);
    }, []);

    const onDrop = useCallback((acceptedFiles: any) => {
        const selectedImage = acceptedFiles[0];
        setImage(URL.createObjectURL(selectedImage));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 5000000 // Максимальный размер файла (5 МБ)
    });

    const handleCropImage = async () => {
        if (image && croppedArea) {
            const cropped = await getCroppedImg(image, croppedArea);
            setCroppedImage(cropped); // Установка кадрированного изображения
            setImage(null)
        }
    };

    return (
        <div className={styles.UploadAndCropImage}>
            <Link to={'/'}>Форма</Link>
            <Link to={'/todo'}>TodoList</Link>
            <h1>Загрузка и кадрирование изображения</h1>
            <div {...getRootProps()} style={{ border: '2px dashed #fd0001', padding: '20px', textAlign: 'center' }}>
                <input {...getInputProps()} />
                <p>Перетащите сюда изображение или кликните, чтобы выбрать файл</p>
            </div>
            {image && (
                <div>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3} // Соотношение сторон
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                    <button onClick={handleCropImage}>Кадрировать изображение</button>
                </div>
            )}
            {croppedImage && (
                <div className={styles.CroppedImage}>
                    <h1>Кадрированное изображение</h1>
                    <img src={croppedImage} alt="Кадрированное изображение" />
                </div>
            )}
        </div>
    );
}

export default UploadAndCropImage;