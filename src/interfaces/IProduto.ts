export interface IProduto {
  price: number;
  promotional_price: number;
  name: string;
  payment_option_details: any;
  plots: number;
  ProductImage: [
    {
      thumbs: {
        180: {
          https: string;
        };
      };
    }
  ];
  id: number;
  url: {
    https: string;
  };

  content: string;
  // metatags: [
  //   {
  //     content: string;
  //   }
  // ];
}
