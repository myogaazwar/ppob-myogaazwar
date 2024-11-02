import bglogin from '../assets/WebsiteAssets/Illustrasi Login.png';
import AuthLayout from '../components/Layouts/AuthLayout';
import FormRegister from '../components/FormInputs/FormRegister';

const Register = () => {
  return (
    <AuthLayout type={'register'} title={'Lengkapi data untuk melengkapi akun'}>
      <FormRegister />
    </AuthLayout>
  );
};

export default Register;
