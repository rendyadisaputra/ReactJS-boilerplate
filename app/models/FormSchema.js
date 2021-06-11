import { object, string } from 'yup';

const regPhoneNumber = /^(^\+62\s?|^08)(\d{3,4}-?){2}\d{3,4}$/;
const regZipCode = /^\d{5}$/;

export const FormCreateAccountSchema = object().shape({
  user_email: string()
    .email('Masukkan email yang valid')
    .required('Email tidak boleh kosong'),
  user_password: string()
    .min(6, 'Kata sandi minimal 6 karakter')
    .required('Kata sandi tidak boleh kosong'),
  user_first_name: string()
    .min(2, 'Nama depan minimal 2 karakter')
    .required('Nama depan tidak boleh kosong'),
  user_last_name: string().required('Nama belakang tidak boleh kosong'),
  user_phone_number: string()
    .min(10, 'Nomor handphone harus lebih dari 10 digit')
    .max(16, 'Nomor handphone tidak boleh lebih dari 16 digit')
    .required('Nomor handphone tidak boleh kosong'),
  user_referral: string().max(6, 'Maximum 6 karakter'),
});

export const FormLoginSchema = object().shape({
  email: string().default("email@mail.com")
    .email('Masukkan email yang valid')
    .required('Email tidak boleh kosong'),
  password: string()
    .min(3, 'Kata sandi minimal 6 karakter')
    .required('Kata sandi tidak boleh kosong'),
});

export const FormForgetPasswordSchema = object().shape({
  email: string()
    .email('Masukkan email yang valid')
    .required('Email tidak boleh kosong'),
});

export const FormResetPasswordSchema = object().shape({
  password: string()
    .min(6, 'Kata sandi minimal 6 karakter')
    .required('Kata sandi tidak boleh kosong'),
});

export const FormUserShippingSchema = object().shape({
  shipping_first_name: string().required('First Name tidak boleh kosong'),
  shipping_last_name: string().required('Last Name tidak boleh kosong'),
  shipping_address: string().required('Shipping Address tidak boleh kosong'),
  shipping_apartment: string().required('Apartment/Other tidak boleh kosong'),
  shipping_city: string().required('City tidak boleh kosong'),
  shipping_province: string().required('Province tidak boleh kosong'),
  shipping_zipcode: string()
    .matches(regZipCode, 'Hanya angka dan harus terdiri 5 angka')
    .required('Zip Code tidak boleh kosong'),
  shipping_phone_number: string()
    .matches(
      regPhoneNumber,
      'Phone Number harus diawali dengan 08 dan tidak boleh lebih dari 12 angka',
    )
    .required('Phone Number tidak boleh kosong'),
});

export const FormUserAccountSchema = object().shape({
  user_email: string().email('Masukkan email yang valid'),
  user_phone_number: string().matches(
    regPhoneNumber,
    'Masukkan nomor handphone yang valid',
  ),
  user_address: string().max(200, 'Maksimum 200 karakter'),
});
