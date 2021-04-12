import React, { useState } from 'react'
import {gql, useMutation} from '@apollo/client';
import {AUTH_TOKEN} from '../constants';
import { useHistory } from 'react-router';

const Login = () => {
    const history = useHistory();
    const [formState, setFormState] = useState({
        login: true,
        name: '',
        email: '',
        password: ''
    });

    const SIGNUP_MUTATION = gql`
        mutation SignupMutation(
            $name: String!
            $email: String!
            $password: String!
            ) {
                signup(name: $name, email: $email, password: $password) {
                    token
                }
            }
    `;

    const LOGIN_MUTATION = gql`
        mutation LoginMutation(
            $email: String!
            $password: String!
            ) {
                login(email: $email, password: $password) {
                    token
                }
            }
`;

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({login}) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            history.push('/');
        }
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            name: formState.name,
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({signup}) => {
            localStorage.setItem(AUTH_TOKEN, signup.token);
            history.push('/');
        }
    });

    return (
        <div>
            <h4 className="mv3">
                {formState.login ? 'Login' : 'Sign Up'}
            </h4>
            <div className="flex flex-column">
                {!formState.login &&
                    (
                        <input 
                            type="text" 
                            value={formState.name} 
                            onChange={e => setFormState({...formState, name: e.target.value})} 
                            placeholder="Your name"
                        />
                    )
                }
                <input
                    type="text"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    placeholder="Your email address"
                />
                <input
                    type="text"
                    value={formState.password}
                    onChange={e => setFormState({...formState, password: e.target.value})}
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <button
                    className="pointer mr2 button"
                    onClick={formState.login ? login : signup}>
                    {formState.login ? 'login' : 'create account'}
                </button>
                <button 
                    className="pointer button"
                    onClick={
                    () => {setFormState({...formState, login: !formState.login})}
                }>
                              {formState.login ? 'need to create an account?' : 'already have an account?'}
                </button>
            </div>
        </div>
    )
}

export default Login
