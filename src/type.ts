export interface MockData {
  productId: string;
  productName: string;
  price: number;
  boughtDate: string;
}

export interface IGetProducts {
  data: {
    products: MockData[];
  };
}
