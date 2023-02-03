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
    errorMsg: '',
    showError: false,
  });

  const [register] = useMutation(REGISTER_USER);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value, showError: false });
  };

  const handleFormSubmit = async () => {
    if (!formState.email || !formState.name || !formState.password) {
      return;
    }

    try {
      const { data } = await register({
        variables: {
          name: formState.name,
          email: formState.email,
          password: formState.password,
        },
      });
      Auth.login(data.register.token);
    } catch (err) {
      console.warn(err);
      setFormState({...formState, showError: true, errorMsg: err?.message || ''});
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleFormSubmit();
    }
  }


  return (
    <div className="basic-content">
      <h1>Sign Up</h1>
      {formState.showError && <InlineNotification style={{marginBottom: '2rem'}} title="Unable to sign up" subtitle={formState.errorMsg || 'Check the form and try again.'} hideCloseButton={true} lowContrast={true}  />}
      <Form>
        <Stack gap={7}>
          <TextInput
            id="register-name"
            required={true}
            labelText="Name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            onKeyUp={handleEnter}
          />
          <TextInput
            id="register-email"
            required={true}
            labelText="Email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            onKeyUp={handleEnter}
          />
          <PasswordInput
            id="register-password"
            required={true}
            labelText="Password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            onKeyUp={handleEnter}
          />
          <Button disabled={!formState.password || !formState.email || !formState.name} onClick={handleFormSubmit}>Sign Up</Button>
        </Stack>
      </Form>
    </div>
  );
}

export default Register;
