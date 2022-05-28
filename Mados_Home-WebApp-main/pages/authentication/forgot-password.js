import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { RecoverForm } from '../../components/authentication/recoverPasswordForm';
import { Logo } from '../../icons/logo';
import theme from "../../constants/theme"

const Page = () => {
  const router = useRouter();
  const { disableGuard } = router.query;

  return (
    <>
      <Head>
        <title>Seeing-is-believing</title>
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
              <Typography variant="h4">Password Recovery</Typography>
              <Typography sx={{fontSize:'0.9em',color:'#323232',mt:1}}>Tell us your email so we can send you a reset link</Typography>
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
              <RecoverForm />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};


export default Page