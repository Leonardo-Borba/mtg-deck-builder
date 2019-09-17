import { RawCard } from './RawCard';

export interface Catalog {

    total_values: number;
    data: string[] | RawCard[];

}