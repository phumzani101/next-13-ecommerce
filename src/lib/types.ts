export interface IBillboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface ICategory {
  id: string;
  name: string;
  billboard: IBillboard;
}

export interface IProduct {
  id: string;
  name: string;
}
