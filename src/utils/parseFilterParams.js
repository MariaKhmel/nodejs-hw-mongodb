const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => ['home', 'personal', 'work'].includes(contactType);

    if (isContactType(contactType)) return contactType;
};
const parseBoolean = (isFavourite) => {
    if (isFavourite === 'true') {
        return true;
    } else if (isFavourite === 'false') {
        return false;
    }
};


export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedBoolean = parseBoolean(isFavourite);

    return {
        isFavourite: parsedBoolean,
        contactType: parsedContactType,
    };
};
