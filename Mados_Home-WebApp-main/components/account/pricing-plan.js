import { Box, Button, Divider, Typography } from '@mui/material';
import {Check as CheckIcon} from '../../icons/check';
import {Logo} from '../../icons/logo';
import theme from '../../constants/theme';
import { LoadingButton } from '@mui/lab';
const PricingPlan = (props) => {
  const { cta, currency, time, description, features, image, name, popular, price, sx, subscribe ,isLoading, ...other } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...sx
      }}
      {...other}>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            height: 52,
            width: 52,
            '& img': {
              height: 'auto',
              width: '100%'
            }
          }}
        >
          <Logo
            sx={{width:'1.8em',height:'1.8em'}}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h4">
            {currency}
            {price}
          </Typography>
          <Typography
            color="textSecondary"
            sx={{
              alignSelf: 'flex-end',
              ml: 1
            }}
            variant="subtitle2"
          >
            /{time}
          </Typography>
        </Box>
        <Typography
          sx={{ mt: 2 }}
          variant="h6"
        >
          {name}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ mt: 2 }}
          variant="body2"
        >
          {description}
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 3
        }}
      >
        {features.map((feature) => (
          <Box
            key={feature}
            sx={{
              alignItems: 'center',
              display: 'flex',
              '& + &': {
                mt: 2
              }
            }}
          >
            <CheckIcon
              fontSize="small"
              sx={{ color: 'text.primary' }}
            />
            <Typography
              sx={{
                fontWeight: 500,
                ml: 2
              }}
              variant="body2"
            >
              {feature}
            </Typography>
          </Box>
        ))}
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 6
          }}
        >
          <LoadingButton
            onClick={subscribe}
            loading={isLoading}
            fullWidth
            sx={styles.btnOutlined}
          >
            {cta}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

const styles={
    btnOutlined: {
		backgroundColor: "white",
        width:'100%',
		border: `2px solid ${theme.color.primary}`,
		borderWidth: 1,
		color: theme.color.primary,
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
    '& .MuiLoadingButton-loadingIndicator':{
      color:theme.color.primary
    }
	},
    btnContained: {
		backgroundColor: theme.color.primary,
		color: "white",
        width:'100%',
		fontWeight: "medium",
		fontFamily: "Poppins",
        borderRadius:10,
		"&:hover": {
			background: theme.color.primary_,
		},
	}
}

export default PricingPlan;