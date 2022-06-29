import RegisterForm from '../../views/components/RegisterForm'

const RegisterPage = () => {

  const registerHandler = (registerData) => {
    // Tutaj do backendu
  }

  return(
    <section>
      <RegisterForm onRegister={registerHandler} />
    </section>
  )
}

export default RegisterPage