import React from 'react';
import styles from './Button.module.scss';

export const Button = () => {
	return <div className={`tw-text-3xl ${styles.Button} ${styles.error}`}>Click here</div>
}