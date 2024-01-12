import { getDateInLocaleTime } from 'src/utils/date';
import { v4 as uuid } from 'uuid';

export class Group {
  id: string;
  code: string;
  name: string;
  index: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(
    props: Omit<Group, 'id' | 'createdAt'>,

    id?: string,
  ) {
    Object.assign(this, props);
    this.createdAt = getDateInLocaleTime(new Date());
    this.updatedAt = getDateInLocaleTime(new Date());

    this.id = id ?? uuid();
  }
}
