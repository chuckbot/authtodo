import Head from 'next/head';
import { table, minifyRecords } from './api/utils/airtable';
import Todo from '../compenents/Todo';
import Navbar from '../components/Navbar';

export default function Home({ initialTodos }) {
  return (
    <div className="max-w-xl m-auto p-2">
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <>
          <ul>
            {initialTodos &&
              initialTodos.map((todo) => (
                <Todo todo={todo} key={todo.id} />
              ))}
          </ul>
        </>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let todos = await table
    .select({ })
    .firstPage();
  return {
    props: {
      initialTodos: minifyRecords(todos),
    },
  };
}