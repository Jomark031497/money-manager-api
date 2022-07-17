const omitPassword = (user: any) => {
  const { password, ...rest } = user;

  return rest;
};

export default omitPassword;
