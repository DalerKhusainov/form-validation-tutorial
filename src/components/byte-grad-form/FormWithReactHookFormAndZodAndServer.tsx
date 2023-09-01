"use client";

import "./byte-grad-form.css";
import { useForm } from "react-hook-form";
// import type { FieldValues } from "react-hook-form";
// with we can connect with react hook form
import { zodResolver } from "@hookform/resolvers/zod";
// import { TSignUpSchema, signUpSchema } from "../../lib/types";
import { TSignUpSchema, signUpSchema } from "@/lib/types";

const FormWithReactHookFormAndZodAndServer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    // getValues, // we used for making sure that password match (but we do it now in zod)
  } = useForm<TSignUpSchema>({
    // here we conneting (invoking) react hook form to zod
    resolver: zodResolver(signUpSchema),
  });

  // const onSubmit = async (data: FieldValues) => {
  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong!");
      }
    }

    // reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Register</h3>

        <label>Email:</label>
        <input
          // IT RETURNS PROPS (that's why we are destructuring)
          {...register("email")}
          type="email"
          placeholder=""
        />
        {errors.email && <span>{`${errors.email.message}`}</span>}

        <label>Password:</label>
        <input
          // IT RETURNS PROPS (that's why we are destructuring)
          {...register("password")}
          type="password"
          placeholder=""
        />
        {errors.password && <span>{`${errors.password.message}`}</span>}

        <label>Confirm Password:</label>
        <input
          // IT RETURNS PROPS (that's why we are destructuring)
          {...register("confirmPassword")}
          type="password"
          placeholder=""
        />
        {errors.confirmPassword && (
          <span>{`${errors.confirmPassword.message}`}</span>
        )}

        <button disabled={isSubmitting} className="submitBtn" type="submit">
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormWithReactHookFormAndZodAndServer;
