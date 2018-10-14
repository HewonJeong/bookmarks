import _ from 'lodash';
import { UUIDV4, STRING, TEXT, ARRAY, Instance } from 'sequelize';
import db from '../';

interface BookmarkAttributes {
  id?: string;
  createdBy: string;
  title: string;
  url: string;
  description: string;
  image: string;
  archived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
type BookmarkInstance = Instance<BookmarkAttributes> & BookmarkAttributes;
const Bookmark = db.define<BookmarkInstance, BookmarkAttributes>(
  'bookmark',
  {
    id: {
      type: UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    createdBy: STRING,
    title: STRING,
    url: STRING,
    description: STRING,
    image: STRING,
  },
  { paranoid: true }
);

export default Bookmark;
