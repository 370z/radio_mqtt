"use client"
import Login from '@/app/login/action';
import React from 'react'
import { useFormState } from 'react-dom';

type Props = {}
const initState ={
  message:""
}

const LoginForm = (props: Props) => {
  const [state, formAction] = useFormState(Login, initState);

  return (
    <div>
      <form action={formAction}>
        <div>
          <input type="text" name="username" />
        </div>
        <div>
          <input type="password" name="password" />
        </div>
        <div>
          <button>Login</button>
        </div>
        <div>
          Message : {state.message}
        </div>
      </form>
    </div>
  );
}

export default LoginForm