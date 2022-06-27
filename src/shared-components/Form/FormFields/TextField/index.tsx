import React from "react";
import { makeStyles, TextField, Typography } from "@material-ui/core";
import { useField } from "formik";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
	root: { display: "flex", width: "100%" },
});

function CustomTextField(props: any) {
	const classes = useStyles();
	const { name, ...otherProps } = props;

	const [field, mata] = useField(name);

	let configTextField = {
		...field,
		...otherProps,
		fullWidth: true,
		variant: "outlined",
	};

	if (mata && mata.touched && mata.error) {
		configTextField.error = true;
		configTextField.helperText = mata.error;
	}

	return 	<div className={classes.root}>
  <TextField {...configTextField} />
</div>
}

export default React.memo(CustomTextField);
