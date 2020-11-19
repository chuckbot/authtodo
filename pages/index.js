import Head from 'next/head';
import { table, minifyRecords } from './api/utils/airtable';
import Navbar from '../components/Navbar';
import Todo from '../components/Todo';
import { TodosContext } from '../contexts/TodosContext';
import { useEffect, useContext } from 'react';

export default function Home({ initialTodos }) {
  const {todos, setTodos} = useContext(TodosContext);
  useEffect(() => {
    setTodos(initialTodos);
  }, [])
  return (
    <div className="max-w-xl m-auto p-2">
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <ul>
          {todos &&
            todos.map((todo) => (
              <Todo todo={todo} key={todo.id} />
            ))}
        </ul>
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