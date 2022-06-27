import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {  Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import TextField from "./FormFields/TextField";
import SubmitButton from "./FormFields/SubmitButton";
import Select from "./FormFields/Select";
import PropTypes from "prop-types";

const DynamicForm = ({ handleFormSubmit, formElements, initialValues, validationSchema }: any) => {

	const Component = (formElement: any) => {
		switch (formElement.type) {
			case "select":
				return (
					<Select
						name={formElement.fieldName}
						label={formElement.label}
						options={formElement.options}
					/>
				);
			case "email":
			case "text":
			case "number":
			case "multiline": {
				let conditionalProps: any = {};
				if (formElement.type === "multiline")
					conditionalProps = { multiline: true, rows: 10 };
				return (
					<TextField
						name={formElement.fieldName}
						label={formElement.label}
						type={formElement.type}
						{...conditionalProps}
					/>
				);
				break;
			}
			default:
				return (
					<Grid className={classes.inputGrid}>
						<div>{formElement.type} is not defined</div>
					</Grid>
				);
		}
	};

	const useStyles = makeStyles((theme) => ({
		button: {
			margin: 5,
		},
		inputGrid: {
			paddingBottom: "2em",
		},
        footer: {
            padding: " 0",
			width: "100%",
            marginBottom:"55px"
        },
	}));

	const classes = useStyles();

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			enableReinitialize={true}
			onSubmit={handleFormSubmit}
		>
			{({ values, errors }) => {
				return (
					<Form>
						{formElements &&
							formElements.map((formElement: any) => {
								return (
									<Grid
										item
										xs={12}
										sm={12}
										md={12}
										lg={12}
										key={formElement.fieldName}
										className={classes.inputGrid}
									>
										{Component(formElement)}
									</Grid>
								);
							})}
						<div
							className={classes.footer}
						>
							<SubmitButton
								id="submitButton"
								key={"submitButton"}
								className={classes.button}
								color="primary"
								variant="contained"
								
							>
								Submit
							</SubmitButton>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

DynamicForm.propTypes = {
	handleFormSubmit: PropTypes.func,
	formElements: PropTypes.array,
	initialValues: PropTypes.object,
	validationSchema: PropTypes.object,
};

export default DynamicForm;
