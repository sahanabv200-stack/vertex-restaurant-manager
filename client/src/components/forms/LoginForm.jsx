import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

export default function LoginForm({ onSubmit, loading = false, defaultEmail = "" }) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit({ email, password });
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <Input label="Email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input
        label="Password"
        type="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
