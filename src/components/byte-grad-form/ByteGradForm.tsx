import "./byte-grad-form.css";
import { useState } from "react";

const ByteGradForm = () => {
  // input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // submiting process value
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setErrors(["Password and confirm password must match"]);
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <label>Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          //   maxLength={50}
          required={true} // also just required
          placeholder=""
        />

        <label>Password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          //   minLength={10}
          required={true} // also just required
          placeholder=""
        />

        <label>Confirm Password:</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          required={true} // also just required
          placeholder=""
        />

        <button disabled={isSubmitting} className="submitBtn" type="submit">
          {isSubmitting ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ByteGradForm;
