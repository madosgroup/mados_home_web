import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { SignupForm } from '../../components/authentication/signupForm';
import { Logo } from '../../icons/logo';
import theme from "../../constants/theme"

const Page = () => {
  const router = useRouter();
  const { disableGuard } = router.query;

  return (
    <>
     <Head>
				<title>Mados Home</title>
				<link rel="icon" href="/logo.svg" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "40px",
              md: "45px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">Sign Up</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {/* {platform === "Amplify" && <AmplifyLogin />}
              {platform === "Auth0" && <Auth0Login />}
              {platform === "Firebase" && <FirebaseLogin />}
              {platform === "JWT" && <JWTLogin />} */}
              <SignupForm />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2">Don&apos;t have an account?&#160;
              <NextLink
                href="/authentication/login"
                passHref
              >
                <Link sx={{color:theme.color.primary}}>
                 Sign In
                </Link>
              </NextLink>
              </Typography>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};


export default Page