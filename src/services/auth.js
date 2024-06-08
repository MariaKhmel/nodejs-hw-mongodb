import bcrypt from 'bcrypt';

export const createHashPassword = async (password) => {
    const result = await bcrypt.hash(password, 10);
    const compareResult = await bcrypt.compare(password, result);
};

