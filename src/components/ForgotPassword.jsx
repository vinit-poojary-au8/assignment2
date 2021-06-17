import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function ForgotPassword() {
	const initialValues = { email: '' }

	const [formValues, setFormValues] = useState(initialValues)
	const [formErrors, setFormErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submit = () => {
		console.log(formValues)
	}

	//input change handler
	const handleChange = (e) => {
		const { name, value } = e.target
		setFormValues({ ...formValues, [name]: value })
	}

	//form submission handler
	const handleSubmit = (e) => {
		e.preventDefault()
		setFormErrors(validate(formValues))
		setIsSubmitting(true)
	}

	//form validation handler
	const validate = (values) => {
		let errors = {}
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

		if (!values.email) {
			errors.email = 'Cannot be blank'
		} else if (!regex.test(values.email)) {
			errors.email = 'Invalid email format'
		}

		return errors
	}

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitting) {
			submit()
		}
	}, [formErrors])

	return (
		<div className='center'>
			<div className='custom-card shadow p-3 mb-5 bg-white rounded'>
				<h1>Forgot Password?</h1>
				{Object.keys(formErrors).length === 0 && isSubmitting && (
					<Alert variant='success' className='success-msg'>
						Form submitted successfully
					</Alert>
				)}
				<Form onSubmit={handleSubmit} noValidate>
					<div className='form-row'>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>
								Enter your details
								to receive a reset
								link
							</Form.Label>
							<Form.Control
								type='email'
								name='email'
								id='email'
								value={
									formValues.email
								}
								placeholder='Email address'
								onChange={
									handleChange
								}
								className={
									formErrors.email &&
									'input-error'
								}
							/>
							{formErrors.email && (
								<Alert
									variant='danger'
									className='error m-2'>
									{
										formErrors.email
									}
								</Alert>
							)}
						</Form.Group>
					</div>

					<Button type='submit'>Send Reset Link</Button>
				</Form>
			</div>
		</div>
	)
}

export default ForgotPassword
