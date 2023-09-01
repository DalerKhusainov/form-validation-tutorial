import "./byte-grad-form.css";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

const FormWithReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Register</h3>

        <label>Email:</label>
        <input
          // IT RETURNS PROPS (that's why we are destructuring)
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder=""
        />
        {errors.email && <span>{`${errors.email.message}`}</span>}

        <label>Password:</label>
        <input
          // IT RETURNS PROPS (that's why we are destructuring)
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters",
            },
          })}
          type="password"
          placeholder=""
        />
        {errors.password && <span>{`${errors.password.message}`}</span>}

        <label>Confirm Password:</label>
        <input
          // IT RETURNS PROPS (that's why we are destructuring)
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === getValues("password") || "Password must match",
          })}
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

export default FormWithReactHookForm;
