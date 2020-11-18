import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Icon, Label } from "semantic-ui-react";

import MyPopUp from "../utils/MyPopup";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes) {
      if (user && likes.find((like) => like.username === user.username)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <MyPopUp content="Unlike">
        <Button color="teal">
          <Icon name="heart" />
        </Button>
      </MyPopUp>
    ) : (
      <MyPopUp content="Like">
        <Button color="teal" basic>
          <Icon name="heart" />
        </Button>
      </MyPopUp>
    )
  ) : (
    <MyPopUp content="You must login to like post">
      <Button as={Link} to="/login" color="teal" basic>
        <Icon name="heart" />
      </Button>
    </MyPopUp>
  );

  return (
    <div>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </div>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
