import Layout from "@/components/Layout";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormFields, submitForm } from "store/slice/product/products";
import Form from "../shared-components/Form";
import * as yup from "yup";
import { CircularProgress } from "@material-ui/core";

export default function Home() {
	const dispatch = useDispatch();

	const [formElements, setFormElements] = useState([]);
	const [validationSchema, setValidationSchema] = useState<any>({});
	const [initialValues, setInitialValues] = useState({});
	const [responseData, setResponseData] = useState('');
	const { products } = useSelector((state: any) => state?.product);

  const validationDecider = (fieldName:string) => {
    switch (fieldName) {
      case "gender":
        return yup.string().oneOf(['male', 'female', "others"]);
      case "testimonial":
        return yup.string();
      case "emailAddress": 
        return yup.string().email("Please enter a valid email.").required("This field is required.")
      case "age":
        return yup.number();
      default:
        return yup.string().required("This field is required.");
    }
  }

	useEffect(() => {
		dispatch(fetchFormFields());
	}, []);

	useEffect(()=>{
		setResponseData(products.response);
	},[products])

	useEffect(() => {
		
		if (products?.list?.length) {
			
		
			const values = {};
      const validation = {};
			const elements = products.list.map(
				({ fieldName, type, value, options }: any) => {
					Object.assign(values, { [fieldName]: value });
          Object.assign(validation, {[fieldName]: validationDecider(fieldName)})
					let fieldData: any = {
						fieldName,
						type,
						label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
					};
					if (options)
						fieldData.options = options.map((item: String) => ({
							name: item,
							id: item,
						}));
					return fieldData;
				}
			);
			setFormElements(elements);
			setInitialValues(values);
      setValidationSchema(validation);
		}
	}, [products]);

	const handleFormSubmit = (values: any) => {
		
		dispatch(submitForm(values));
	};

	return (
		<Layout>
			<Container style={{ marginTop: "50px" }}>
				{formElements?.length ? (
					<Form
						formElements={formElements}
						initialValues={initialValues}
						validationSchema={yup.object().shape(validationSchema)}
						handleFormSubmit={handleFormSubmit}
					/>
				) : (
          <div style={{width:"100%", height:"100%", display: "flex", justifyContent:"center", alignItems :"center"}}>
					<CircularProgress />
          </div>
				)}
		
		{ responseData?.length ?
		(<div>
		<h2>Response</h2>	
		<p>{responseData}</p>
		</div>)
		:
		<></>	
		}
			</Container>
		</Layout>
	);
}
