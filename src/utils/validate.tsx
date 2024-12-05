export const checkValidData = (email: string, password: string): string | null => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  // Separate error messages
  if (!isEmailValid)
    return "Invalid email address. Please enter a valid email address (e.g., user@example.com).";

  if (!isPasswordValid) {
    if (password.length < 8) {
      return "Password is too short. It must be at least 8 characters long.";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must include at least one number.";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    return "Password does not meet the required criteria.";
  }

  return null;
};
