import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth.js";
import { Button, Form, InlineNotification, PasswordInput, Stack, TextInput } from "@carbon/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    showError: false,
  });

  const [Login] = useMutation(LOGIN_USER);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value, showError: false });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await Login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      setFormState({...formState, showError: true});
      console.error(err);
    }
  };

  const createAccount = () => {
    navigate('/sign-up');
  };

  return (
    <div className="basic-content">
      <h1>Login</h1>
      {formState.showError && <InlineNotification style={{marginBottom: '2rem'}} title="Unable to login" subtitle="Check the email and password and try again." hideCloseButton={true} lowContrast={true}  />}
      <Form>
        <Stack gap={7}>
          <TextInput
            id="login-email"
            required={true}
            labelText="Email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
          <PasswordInput
            id="login-password"
            required={true}
            labelText="Password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
          <Button disabled={!formState.email || !formState.password} type="button" onClick={handleFormSubmit}>Login</Button>
          <div>-- OR --</div>
          <Button kind="tertiary" type="button" onClick={createAccount}>Create account</Button>
        </Stack>
      </Form>
    </div>
  );
}

export default Login;
