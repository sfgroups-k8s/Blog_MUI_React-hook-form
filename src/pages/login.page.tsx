import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';
import styled from '@emotion/styled';

// 👇 Styled React Route Dom Link Component
export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

// 👇 Styled Material UI Link Component
export const OauthMuiLink = styled(MuiLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

// 👇 Login Schema with Zod
const loginSchema = object({
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  persistUser: literal(false).optional(),
});

// 👇 Infer the Schema to get the TS Type
type ILogin = TypeOf<typeof loginSchema>;

const LoginPage: FC = () => {
  // 👇 Default Values
  const defaultValues: ILogin = {
    email: '',
    password: '',
  };

  // 👇 The object returned from useForm Hook
  const methods = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  // 👇 Submit Handler
  const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
    console.log(values);
  };

  // 👇 JSX to be rendered
  return (
    <Container
      maxWidth={false} >
      <Typography
        variant='h6'
        component='h1'
        sx={{ textAlign: 'center', mb: '1.5rem' }}
      >
        Log into your account
      </Typography>



      <FormProvider {...methods}>


        <Box
          display='flex'
          flexDirection='row'
          component='form'
          noValidate
          autoComplete='off'
          sx={{ paddingRight: { sm: '3rem' } }}
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >

          <Grid item xs>

            <FormInput
              label='Enter your email'
              type='email'
              name='email'
              focused
              required
            />
          </Grid>
          <Grid item xs>
            <FormInput
              type='password'
              label='Password'
              name='password'
              required
              focused
            />
          </Grid>
          <Grid item xs>
            <FormControlLabel
              control={
                <Checkbox
                  size='small'
                  aria-label='trust this device checkbox'
                  required
                  {...methods.register('persistUser')}
                />
              }
              label={
                <Typography
                  variant='body2'
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    color: '#5e5b5d',
                  }}
                >
                  Trust this device
                </Typography>
              }
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              loading={false}
              type='submit'
              variant='contained'
              sx={{
                py: '0.8rem',
                mt: 2,
                width: '80%',
                marginInline: 'auto',
              }}
            >
              Submit
            </LoadingButton>
          </Grid>
          <br/>
Test
        </Box>

      </FormProvider>


    </Container>
  );
};

export default LoginPage;
