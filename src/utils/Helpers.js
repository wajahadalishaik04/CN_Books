export const truncateEmail = (email, maxLength = 30) => {
  return email.length > maxLength ? `${email.slice(0, maxLength)}...` : email;
};
