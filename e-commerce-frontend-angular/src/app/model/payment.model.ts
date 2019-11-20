import { Order } from './Order.model';

export class Payment {
    public id: number;
    // tslint:disable-next-line: variable-name
    public card_number: string;
    // tslint:disable-next-line: variable-name
    public card_type: string;
    // tslint:disable-next-line: variable-name
    public date_payment: Date;
    // tslint:disable-next-line: variable-name
    public code_verif: string;
    public order: Order;
}