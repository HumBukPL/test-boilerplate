import RegisterForm from '../../views/components/RegisterForm'
import Grid from '@mui/material/Grid'

const RegisterPage = () => {
  const registerHandler = (registerData: any) => {
    // Tutaj do backendu
  }

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      minWidth="70vw"
    >
      <Grid item xs={12} md={12} lg={12} alignItems="center">
        <RegisterForm />
      </Grid>
    </Grid>
  )
}

export default RegisterPage
