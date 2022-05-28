import { useEffect, useState,useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Context as AuthContext } from '../../context/AuthContext';
import {useCookies} from 'react-cookie';

 const AuthGuard = (props) => {
  const {state}=useContext(AuthContext);
  const { children } = props;
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [cookies]=useCookies();

  useEffect(() => {
      if (!router.isReady) {
        return;
      }

      if (!cookies.user) {
        router.push({
          pathname: '/',
        });
      } else {
        setChecked(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]);

   
  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};


export default AuthGuard;