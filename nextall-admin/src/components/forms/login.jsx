"use client";
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// mui
import {
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Alert,
  AlertTitle
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MdOutlineVisibility, MdLock, MdOutlineVisibilityOff } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { useFormik, Form, FormikProvider } from 'formik';

// You will need to implement this api.login function to call your backend
import * as api from '../../services';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation(api.login, {
    onSuccess: async (data) => {
      // Store token and user in localStorage
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      toast.success('Logged in successfully!');
      router.push('/admin/dashboard');
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err?.response?.data?.message || 'Login failed');
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      mutate(values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h5">Admin Login</Typography>
          <TextField
            fullWidth
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoMdMail />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdLock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => setShowPassword((show) => !show)}>
                    {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton loading={loading} type="submit" fullWidth variant="contained">
            Login
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
