import { User } from '../login/user.model';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Product {
    id: number;
    link : string;
    okLink : SafeResourceUrl;
    discount: number;
    affiliate: User;
}