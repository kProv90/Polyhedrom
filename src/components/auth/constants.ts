// Validation rules
const handleRules = [
  (v: string) => !!v || 'Handle is required',
  (v: string) => (v && v.length >= 3) || 'Handle must be at least 3 characters',
  (v: string) =>
    /^[a-zA-Z0-9_]+$/.test(v) || 'Handle can only contain letters, numbers, and underscores',
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
]

export { handleRules, emailRules, passwordRules }
