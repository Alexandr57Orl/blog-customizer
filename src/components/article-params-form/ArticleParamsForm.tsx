import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
//  настройки инпутов
import {
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	fontFamilyOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	appState: (formState: typeof defaultArticleState) => void;
};
export const ArticleParamsForm = ({ appState }: ArticleParamsFormProps) => {
	const [isArowMenuOpen, setisArowMenuOpen] = React.useState(false);
	const [formState, setFormState] =
		React.useState<typeof defaultArticleState>(defaultArticleState);
	const formRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!isArowMenuOpen) return;

		const handleClickInOut = (evt: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(evt.target as Node)) {
				setisArowMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickInOut);
		return () => {
			document.removeEventListener('mousedown', handleClickInOut);
		};
	}, []);

	// меняем состояние меню асайда
	const handleFormSubmit = () => {
		setisArowMenuOpen(!isArowMenuOpen);
	};

	// сброс применившихся стилей
	const handleResetBtnClick = () => {
		setFormState(defaultArticleState);
		appState(defaultArticleState);
	};

	// общая функция для изменения стилей

	const handleChange = (name: string, value: OptionType) => {
		setFormState((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		appState(formState);
	};
	return (
		<>
			<ArrowButton isOpen={isArowMenuOpen} onClick={() => handleFormSubmit()} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isArowMenuOpen,
				})}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text>Задайте параметры</Text>

					<Select
						selected={formState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						options={fontSizeOptions}
						title='Размер шрифта'></RadioGroup>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Фиолетовый'
						onChange={(value) => handleChange('fontColor', value)}
						title='Цвет шрифта'
					/>

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Белый'
						onChange={(value) => handleChange('backgroundColor', value)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleChange('contentWidth', value)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleResetBtnClick}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
