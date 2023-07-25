import React from 'react';
import classes from './MyInput.module.css';

const MyInput = React.forwardRef((props) => {
	return (
		<input {...props} className={classes.myInput} />
	);
});

export default MyInput;