import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import supabase from '../utils/supabase';
import NewTodo from '../components/NewTodo';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '../components/Account';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const session = useSession();
  const supabase = useSupabaseClient();

  const fetchTodos = async () => {
    const { data } = await supabase.from('todos').select('*');
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <Account session={session} />
      )}
      <NewTodo reload={fetchTodos} />
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      Working
    </div>
  );
}
