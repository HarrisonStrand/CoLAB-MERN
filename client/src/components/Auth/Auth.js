import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
	
	const handleSubmit = () => {

	}

	const handleChange = () => {

	}
	
	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup)
		handleShowPassword(false);
	}

	const googleSuccess = async (res) => {
		console.log(res);
		console.log('Google Sign In was successful')
	}
	const googleFailure = (error) => {
		console.log(error)
		console.log('Google Sign In was unsuccessful.')
	}


	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutLinedIcon/>
				</Avatar>
				<Typography variant='h5'>{isSignup ? 'Register' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{
							isSignup && (
								<>
										<Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
										<Input name='lastName' label='Last Name' handleChange={handleChange} half/>
								</>
							)
						}
						<Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
						<Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
						{ isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' /> }
					</Grid>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						{isSignup ? 'Register' : 'Sign In'}
					</Button>
					<GoogleLogin 
						clientId='382150534437-72s1eootm61k6ujq0h8mefh2p0f4s21i.apps.googleusercontent.com'
						render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>
					<Grid container justify='flex-end'>
						<Grid item>
							<Button className={classes.form} onClick={switchMode}>
								{ isSignup ? 'Already have an account? Sign In' : "Don't have an account? Register!"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}

export default Auth;
