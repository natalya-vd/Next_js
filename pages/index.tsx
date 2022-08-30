import { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { withLayout } from '../layout/Layout';
import { Button, Htag, Ptag, Tag, Rating } from '../components';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4);

  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='down' className='jfdkjfd'>Кнопка</Button>
      <Button appearance='ghost'>Кнопка</Button>
      <Button appearance='ghost' arrow='right'>Кнопка</Button>
      <Ptag size='lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat excepturi reiciendis voluptatem nobis quibusdam quidem voluptate, et suscipit minus! Eveniet, mollitia voluptatibus? Dolores magnam temporibus magni animi, et in deserunt veritatis similique deleniti ad neque optio perferendis ut quasi, illum libero! Laudantium fugit dolores velit nam odio quae asperiores cupiditate!</Ptag>
      <Tag size='sm'>small</Tag>
      <Tag size='md' color='red'>medium</Tag>
      <Tag size='md' color='green' href='http://jfdjf/fkdsj'>large</Tag>

      <Rating rating={rating} isEditable={true} setRating={setRating} />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number
}
