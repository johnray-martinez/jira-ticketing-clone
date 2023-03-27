import { FormEvent, useCallback } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { post } from "../helpers/fetch";
import ModalForm from "./ModalForm";
import SignUpForm from "./SignUpForm";

const SignUpFormModal = () => {
  // HOOKS
  const router = useRouter();

  // FORM VALIDATION
  const isPasswordMatching = (pass1: string, pass2: string): boolean => {
    return pass1 === pass2;
  };

  // FORM HANDLERS
  const onSubmitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
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

      if (!isPasswordMatching(password.value, confirmPassword.value)) {
        return;
      }

      // Attempt Sign up flow
      try {
        const signUpResult = await post(
          "/api/auth/signup",
          JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
          })
        );

        if (!signUpResult.success) {
          throw new Error(signUpResult.message);
        }

        await signIn("credentials", {
          email: email.value,
          password: password.value,
          redirect: false,
        });

        router.push("/");
      } catch (err) {
        console.error(err);
      }
    },
    [router]
  );

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
