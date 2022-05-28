import { useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { ContactForm } from '../components/contact/contact-form';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { Mail as MailIcon } from '../icons/mail';
import NextLink from 'next/link';
import theme from '../constants/theme'

const Contact = () => {
 

  return (
    <>
      <Head>
				<title>Mados Home</title>
				<link rel="icon" href="/logo.svg" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            py: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15
              }
            }}
          >
            <NextLink
              href="/"
              passHref
            >
              <Button
                component="a"
                sx={styles.btnOutlined}
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                Back
              </Button>
            </NextLink>
            <Typography
              variant="h3"
              sx={{ mt: 3 }}
            >
              Contact
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                mb: 6,
                mt: 8
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: theme.color.primary,
                  color: 'primary.contrastText',
                  mr: 2
                }}
                variant="rounded"
              >
                <MailIcon fontSize="small" />
              </Avatar>
              <Typography variant="overline">
                Get in touch
              </Typography>
            </Box>
            <Typography variant="h1">
              Talk to our expert Team
            </Typography>
            <Typography
              sx={{ py: 3 }}
              variant="body1"
            >
              Have questions about the app? Fill out the form and a expert will be in touch shortly.
            </Typography>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h5"
            >
              Fill the form below
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};


const styles={
    btnOutlined: {
		backgroundColor: "white",
		border: `2px solid ${theme.color.primary}`,
		borderWidth: 1,
		mx:1,
		px:3,
		color: theme.color.primary,
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
	}
}
export default Contact;
