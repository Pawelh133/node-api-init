import crypto from 'crypto';

export const saltHashPassword = (userpassword) => {
  const salt = genRandomString(16);
  const passwordData = sha512(userpassword, salt);

  return { password: passwordData.passwordHash, salt: passwordData.salt }
}

export const compareHashedPassword = (userPassword, hashedPassword, salt) => {
  if (userPassword && hashedPassword && salt) {
    return hashedPassword === sha512(userPassword, salt).passwordHash
  }

  return false
}

const genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  };
};

