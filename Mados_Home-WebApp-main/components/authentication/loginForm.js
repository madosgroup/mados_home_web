import {useState} from 'react';
import { useRouter } from 'next/router';
import {
    withStyles,
  } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Button, Divider, FormHelperText, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import theme from '../../constants/theme'

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#323232',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'black',
          borderWidth:1
        },
      },
    },
  })(TextField);

export const LoginForm = (props) => {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			email: "ntore2000@gmail.com",
			password: "123123",
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Must be a valid email")
				.max(255)
				.required("Email is required"),
			password: Yup.string().max(255).required("Password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await signInWithEmailAndPassword(
					values.email,
					values.password
				).then(async () => {
					if (isMounted()) {
						const returnUrl = router.query.returnUrl || "/student";
						//router.push('returnUrl');
						router.push("/");
					}
				});
			} catch (err) {
				if (isMounted()) {
					helpers.setStatus({success: false});
					helpers.setErrors({submit: err.message});
					helpers.setSubmitting(false);
				}
			}
		},
	});

    const handleSubmit = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			router.push("/");
		}, 2000);
	};


  return (
    <div {...props}>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <CssTextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <CssTextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            sx={{backgroundColor:theme.color.primary,'&:hover':{backgroundColor:theme.color.primary_}}}
            size="large"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Sign In
          </LoadingButton>
        </Box>
        {/* <Box sx={{ mt: 2 }}>
          <Alert severity="info">
            <div>
              You can use
              {' '}
              <b>demo@devias.io</b>
              {' '}
              and password
              {' '}
              <b>Password123!</b>
            </div>
          </Alert>
        </Box> */}
      </form>
    </div>
  );
};
