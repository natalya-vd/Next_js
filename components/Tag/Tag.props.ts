import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: 'md' | 'sm';
  color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
  href?: string;
}
