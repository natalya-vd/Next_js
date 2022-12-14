import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { MenuItem } from '../../interfaces/menu.interface';

import { withLayout } from '../../layout/Layout';

import { firstLevelMenu } from '../../helpers/helpers';
import { API } from '../../helpers/api';

function Type({ firstCategory }: TypeProps): JSX.Element {
  return (
    <div>
      {firstCategory}
    </div>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(menu => `/${menu.route}`),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find((menu) => menu.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory: firstCategoryItem.id });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number
}
