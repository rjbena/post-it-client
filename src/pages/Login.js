import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

const Login = ({ history }) => {
  const context = useContext(AuthContext);
  const { user } = context;

  const initialState = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm(signInUser, initialState);
  const [errors, setErrors] = useState({});
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  function signInUser() {
    loginUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={(e) => onChange(e)}
        />

        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={(e) => onChange(e)}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username

      password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
