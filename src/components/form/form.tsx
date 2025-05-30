import clsx from 'clsx';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState
} from 'react';

import styles from './form.module.scss';
const errorText = 'Поле не должно быть пусто';

export const Form = () => {
    //добавить картинку по умолчанию
    const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
    const [currentName, setCurrentName] = useState<string | null>(null);
    const [currentDesc, setCurrentDesc] = useState<string | null>(null);
    const [variants, setVariants] = useState<string[]>(['']);
    
    const [nameError, setNameError] = useState<string | null>(null);
    const [variantsError, setVariantsError] = useState<string | null>(null);


    const avatarRef = useRef<HTMLDivElement | null>(null);
    const filesRef = useRef<HTMLInputElement | null>(null);

    const uploadImage = () => {
        const file = filesRef.current?.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCurrentAvatar(imageUrl);
        }
    }

    const handleNameChange: ChangeEventHandler<HTMLInputElement> = ({
        target}) => {
        setCurrentName(target.value);
        if (currentName){
            setNameError(null);
        }
    };

    const handleDescChange: ChangeEventHandler<HTMLInputElement> = ({
        target}) => {
        setCurrentDesc(target.value);
    };

    const handleVariantChange = (index: number, value: string) => {
        const updated = [...variants];
        updated[index] = value;
        setVariants(updated);
        if (variantsError && !isEmptyElement(variants)){
            setVariantsError(null);
        }

    };

    const addOption = () => {
        setVariants([...variants, '']);
        
    };

    const onClick = () => {
        if (currentName && !isEmptyElement(variants)){
            console.log("Отправляем запрос на сервер")
            return;
        }

        if (!currentName) {
            setNameError('Поле должно быть заполнено');
        } 
        console.log(variants);
        console.log(isEmptyElement(variants));
        if (isEmptyElement(variants)){
            setVariantsError('Все варианты должны быть заполнены');
        }

    }

    const isEmptyElement = (elements: string[]) => {
        return elements.some((el) => el.trim() === '');
    }

    return (
        <div className={clsx(styles.form)}>
            <div className={clsx(styles.photo)}>
                <div ref={avatarRef} className={clsx(styles.photo_preview)} >
                        {currentAvatar && (
                            <img
                                src={currentAvatar}
                                alt="Фото превью"
                                className={clsx(styles.previewImage)}
                            />
                    )}
                </div>
                <label className={clsx(styles.form_button)}>
                    Добавить фото
                    <input 
                        ref={filesRef} 
                        
                        type="file" 
                        hidden 
                        onChange={uploadImage}
                        />
                </label>
            </div>
            <div className={clsx(styles.form_element)}>
                <label htmlFor="title">Название:</label>
                <input 
                    className={clsx(styles.form__input)}
                    type="text" id="title" name="title" 
                    placeholder="Введите название опроса..." 
                    onChange={handleNameChange}
                    required/>
                {nameError &&
                    <p className={clsx(styles.error)}>
                        {nameError}
                    </p>}
            </div>
            <div className={clsx(styles.form_element)}>
                <label htmlFor="description">Описание:</label>
                <input
                    className={clsx(styles.form__input)}
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Введите описание опроса..."
                    onChange={handleDescChange} />
            </div>            
            <div className={clsx(styles.form_element)}>
                <label>Добавьте варианты ответов:</label>
                <div className={clsx(styles.variants_area)}>               
                
                    <div className={clsx(styles.form_variants)}>
                        {variantsError &&
                            <p className={clsx(styles.error)}>
                                {variantsError}
                            </p>}
                        {variants.map((option, index) => (
                            <input
                                key={index}
                                className={clsx(styles.form__input)}
                                type="text"
                                value={option}
                                onChange={(e) => handleVariantChange(index, e.target.value)}
                                placeholder={`Вариант ответа ${index + 1}...`}
                                
                            />
                        ))}
                    </div>
                
                    <button 
                        className={clsx(styles.add_button)}
                        onClick={addOption}>+</button>
                </div>
            </div>
            <button 
                className={clsx(styles.form_button)}
                onClick={onClick}
                >Создать</button>
        </div>
    )
}