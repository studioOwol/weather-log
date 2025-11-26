export default {
  signOut: {
    title: "Sign Out",
    description: "Are you sure you want to sign out?",
    cancel: "Cancel",
    confirm: "Sign Out",
  },
  signIn: {
    title: "Sign In",
    email: "Email",
    password: "Password",
    submit: "Sign In",
    loading: "Signing in...",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up",
  },
  signUp: {
    title: "Sign Up",
    email: "Email",
    password: "Password (6+ characters)",
    confirmPassword: "Confirm password",
    submit: "Sign Up",
    loading: "Creating account...",
    hasAccount: "Already have an account?",
    signInLink: "Sign in",
    errors: {
      passwordMismatch: "Passwords don't match.",
      passwordTooShort: "Password must be at least 6 characters.",
    },
  },
} as const
