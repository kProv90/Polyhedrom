// Rules for handle
const handleRules = [
  (val: string) =>
    val.length >= 6 || "Handle must be at least 6 characters long",
];

// Rules for password
const passwordRules = [
  (val: string) =>
    val.length >= 8 || "Password must be at least 8 characters long",
  (val: string) =>
    /[A-Z]/.test(val) || "Password must contain at least one uppercase letter",
  (val: string) =>
    /\d/.test(val) || "Password must contain at least one number",
  (val: string) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(val) ||
    "Password must contain at least one symbol",
];

// Email rules (just basic format validation since Firebase handles existence check)
const emailRules = [
  (val: string) => !!val || "Email is required",
  (val: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
    "Please enter a valid email",
];

export { handleRules, passwordRules, emailRules };
