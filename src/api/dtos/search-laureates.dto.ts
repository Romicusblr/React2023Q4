import { LaureateDTO } from './laureate.dto';

export interface SearchLaureatesDTO {
  laureates: LaureateDTO[];
  meta: {
    count: number;
  };
}
