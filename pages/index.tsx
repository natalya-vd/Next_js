import { Button, Htag } from '../components';

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='down' className='jfdkjfd'>Кнопка</Button>
      <Button appearance='ghost'>Кнопка</Button>
      <Button appearance='ghost' arrow='right'>Кнопка</Button>
    </>
  );
}
