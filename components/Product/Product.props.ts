import { ProductModel } from "../../interfaces/product.interface";
import { DetailedHTMLProps } from 'react';
import { HTMLAttributes } from 'react';

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel
}
