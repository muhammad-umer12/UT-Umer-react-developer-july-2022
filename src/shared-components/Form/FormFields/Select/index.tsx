import React, { useEffect } from "react";
import { TextField, MenuItem, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { useSelector } from "react-redux";

function Select(props: any) {
	const { name, options, ...otherProps } = props;

	const useStyles = makeStyles(() => ({
		root: { display: "flex", width: "100%" },
	}));

	const { setFieldValue, values }: any = useFormikContext();
	const classes = useStyles();
	const [field, meta] = useField(name);

	const onChange = (event: any) => {
		const { value } = event.target;
		setFieldValue(name, value, true);
	};

	let configSelect: any = {
		...field,
		...otherProps,
		select: true,
        value: values[name],
        defaultValue: values[name],
        initialValue: values[name],
		variant: "outlined",
		fullWidth: true,
		onChange,
	};

	if (meta && meta.touched && meta.error) {
		configSelect.error = true;
		configSelect.helperText = meta.error;
	}

	return (
		<div className={classes.root}>
			<TextField {...configSelect}>
				{options?.map((item: { name: string; id: string }, index: number) => (
					<MenuItem
						key={index}
						value={item.id}
						style={{
							justifyContent: "left",
						}}
					>
						{item.name}
					</MenuItem>
				))}
			</TextField>
		</div>
	);
}

export default Select;
