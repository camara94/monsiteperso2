import { User } from './user';
import { Parcours } from './parcours';

export class Favorite {
    _id: string;
    user: User;
    parcours: Parcours[];
    createdAt: string;
    updatedAt: string;
}

export interface FavParcours {
    user: string;
    parours: string;
}
