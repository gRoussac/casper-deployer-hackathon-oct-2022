import { Users } from '@casper-api/api-interfaces';

/** No hackathon escrow demo accounts — wallet provides the active key. */
const users: Users = [];

export const environment = { production: false, users };
