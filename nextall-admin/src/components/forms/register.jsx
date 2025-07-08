"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useMutation } from 'react-query';
import { Stack, TextField, InputAdornment, MenuItem, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdLock } from 'react-icons/md';
import { IoMdMale, IoMdMail, IoMdFemale } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';
import { MdLocalPhone } from 'react-icons/md';
import { FaTransgender } from 'react-icons/fa6';
// You will need to implement this api.register function to call your backend
import * as api from '@/src/services';

export default function RegisterForm() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().max(50, 'Too long!').required('First name is required'),
    lastName: Yup.string().max(50, 'Too long!').required('Last name is required'),
    email: Yup.string().email('Enter valid email').required('Email is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should be 8 characters or longer.')
  });
  const { mutate } = useMutation(api.register, {
    onSuccess: async (data) => {
      toast.success('Registered successfully! Please login.');
      router.push('/admin/login');
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: 'male',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      mutate(values);
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h5">Admin Registration</Typography>
          <TextField
            fullWidth
            label="First Name"
            {...getFieldProps('firstName')}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoPerson />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoPerson />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Phone"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdLocalPhone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            fullWidth
            label="Gender"
            {...getFieldProps('gender')}
            error={Boolean(touched.gender && errors.gender)}
            helperText={touched.gender && errors.gender}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {formik.values.gender === 'male' ? <IoMdMale /> : formik.values.gender === 'female' ? <IoMdFemale /> : <FaTransgender />}
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
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
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
