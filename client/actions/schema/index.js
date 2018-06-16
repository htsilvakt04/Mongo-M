import { schema } from 'normalizr';

export const cartItem = new schema.Entity('items', {}, { idAttribute: '_id' });
export const cartItems = new schema.Array(cartItem);