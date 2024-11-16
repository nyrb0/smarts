import server from '@/shared/constant/server';
import Modal from '@/shared/UI/Modal/Modal';
import axios from 'axios';
import { ChangeEvent, FC, useState } from 'react';
import { SiKodi } from 'react-icons/si';
import stLoad from '@/styles/componentsModules/LoadImage/LoadImage.module.scss';
import { FaRegFileImage } from 'react-icons/fa6';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import Image, { StaticImageData } from 'next/image';

interface LoanImageProps {
    stateOpen: { state: boolean; close: () => void };
    pathLoad: string;
    body: string;
    theImage: StaticImageData;
}

const LoadImage: FC<LoanImageProps> = ({ pathLoad, body, stateOpen, theImage }) => {
    const [selectedFile, setSelectedFile] = useState<null | string>(null);
    const [preview, setPreview] = useState<null | string>(null);

    const changeImageHeader = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const toLoadServer = async (method: 'post' | 'delete' | 'get' | 'patch', body?: string) => {
        try {
            let response;
            if ((method === 'post' || 'delete' || 'patch') && body) {
                response = await axios[method](`${server}/${pathLoad}`, { [body]: selectedFile });
            } else if (method === 'get') {
                response = await axios[method](`${server}/${pathLoad}`);
            }
            return response?.data;
        } catch (e) {
            console.log('Ошибка при загрузке на сервер:', e);
            return null;
        }
    };
    const saveImage = async () => {
        if (!selectedFile) {
            alert('Выберите изображение!');
            return;
        }
        const data = await toLoadServer('post', body);
        setPreview(data);
    };
    const removeImage = async () => {
        setPreview(null);
        toLoadServer('delete', body);
    };

    const moveZeros = (arr: any[]) => [...arr.filter(f => f !== 0), arr.filter(f => f === 0)];

    return (
        <Modal
            isOpen={stateOpen.state}
            close={() => {
                stateOpen.close();
                setSelectedFile('');
            }}
        >
            <div className={stLoad.file}>
                <div className={`${stLoad.profileImage} ${selectedFile ? 'dfja' : 'dfc'}`}>
                    {preview || theImage ? (
                        <div style={{ position: 'relative' }}>
                            <p>{selectedFile ? 'Старое:' : 'Текущий:'}</p>
                            <Image src={preview || theImage} alt='photo' />
                            <MdDelete size={20} className={stLoad.delete} onClick={removeImage} />
                        </div>
                    ) : null}
                    {selectedFile ? (
                        <div className={`${stLoad.selectedImage}`}>
                            <p>Новое:</p>
                            <div className='dfc'>
                                <img src={selectedFile} alt='photo' />
                                <button onClick={saveImage}>устоновить</button>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className={`${stLoad.file_camera} dfja`}>
                    <input type='file' accept='image/*' onChange={changeImageHeader} id={'profile_image'} style={{ display: 'none' }} />
                    <label htmlFor='profile_image'>
                        <p>Загрузить файлы</p>
                        <p>
                            <FaRegFileImage size={20} />
                        </p>
                    </label>
                    <p className={stLoad.or}>или</p>
                    <input type='file' accept='image/*' onChange={changeImageHeader} id={'profile_camera'} style={{ display: 'none' }} />
                    <label htmlFor='profile_camera'>
                        <p>Через камеру</p>
                        <div>
                            <MdOutlinePhotoCamera size={20} />
                        </div>
                    </label>
                </div>
            </div>
        </Modal>
    );
};
export default LoadImage;
