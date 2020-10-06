import bcrypt from 'bcryptjs';

export const hash = (password: string): Promise<string> => bcrypt.hash(password, 10);
