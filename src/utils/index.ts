import ShortUniqueId from 'short-unique-id';

const utils = {
  generateUUIds: (): string => {
    const uuid = new ShortUniqueId({ length: 5 });
    return uuid();
  },
};

export default utils;
