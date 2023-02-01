import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../utils/mutations";

import Auth from "../../utils/auth.js";
import { Button, Form, InlineNotification, PasswordInput, Stack, TextInput } from "@carbon/react";

function Register() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    showError: false,
  });

  // eslint-disable-next-line no-unused-vars
  const [register, { error, data }] = useMutation(REGISTER_USER);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value, showError: false });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await register({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.register.token);
    } catch (err) {
      setFormState({...formState, showError: true});
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      {formState.showError && <InlineNotification style={{marginBottom: '2rem'}} title="Unable to sign up" subtitle="Check the form and try again." hideCloseButton={true} lowContrast={true}  />}
      <Form>
        <Stack gap={7}>
          <TextInput
            id="register-name"
            required={true}
            labelText="Name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />
          <TextInput
            id="register-email"
            required={true}
            labelText="Email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
          <PasswordInput
            id="register-password"
            required={true}
            labelText="Password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
          <Button disabled={!formState.password || !formState.email || !formState.name} onClick={handleFormSubmit}>Sign Up</Button>
        </Stack>
      </Form>
    </div>
  );
}

export default Register;
