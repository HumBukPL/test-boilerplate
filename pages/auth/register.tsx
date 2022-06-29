import RegisterForm from '../../views/components/RegisterForm'

const RegisterPage = () => {

  const registerHandler = (registerData: any) => {  
    // Tutaj do backendu
  }

  return(
    <section>
      <RegisterForm onRegister={registerHandler} />
    </section>
  )
}

export default RegisterPage