export interface IProduto {
  price: number;
  promotional_price: number;
  name: string;
  payment_option_details: any;
  ProductImage: [
    {
      https: string;
    }
  ];
  id: number;
}
