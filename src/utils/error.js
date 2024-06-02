export const throwNotFoundError = () => {
    const error = new Error('Not Found');
    error.status = 404;
    throw error;
};

