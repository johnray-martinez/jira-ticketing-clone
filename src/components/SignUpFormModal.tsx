import { FormEvent, useCallback } from "react";

import { post } from "../helpers/fetch";
import ModalForm from "./ModalForm";
import SignUpForm from "./SignUpForm";

const SignUpFormModal = () => {
  // FORM VALIDATION
  const isPasswordMatching = (pass1: string, pass2: string): boolean => {
    return pass1 === pass2;
  };

  // FORM HANDLERS
  const onSubmitHandler = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type SignUpFormData = {
      firstName: HTMLInputElement;
      lastName: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
      confirmPassword: HTMLInputElement;
    };

    const { firstName, lastName, email, password, confirmPassword } =
      e.target as typeof e.target & SignUpFormData;

    if (isPasswordMatching(password.value, confirmPassword.value)) {
      await post(
        "/api/auth/signup",
        JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
        })
      );
    }
  }, []);

  return (
    <ModalForm
      title="Create an account"
      ctaText="Register now"
      onSubmitHandler={onSubmitHandler}
    >
      <SignUpForm />
    </ModalForm>
  );
};

export default SignUpFormModal;
