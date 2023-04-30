export type Records = {
  id: string;
  createdTime: string;
  fields: Fields;
};

export type Fields = {
  name: string;
  author: string;
};

export type Response = Array<
  {
    id: string;
    createdAt: string;
  } & Fields
>;
