import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

const Register = ({ history }) => {
  const context = useContext(AuthContext);

  const initialState = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);
  const [errors, setErrors] = useState({});
  const [addUser, { loading }] = useMutation(REGITER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      if (err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          label="Email"
          type="email"
          placeholder="Email.."
          name="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          value={values.confirmPassword}
          type="password"
          error={errors.confirmPassword ? true : false}
          onChange={(e) => onChange(e)}
        />
        <Button type="submit" primary>
          Register
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

const REGITER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
