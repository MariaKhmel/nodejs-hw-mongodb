import dotenv from 'dotenv';

dotenv.config();
export function env(name, defaultValue) {
    console.log('here');
    const value = process.env[name];

    if (value) return value;

    if (defaultValue) return defaultValue;

    throw new Error(`Missing: process.env['${name}'].`);
}
