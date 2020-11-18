import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image, Icon, Label, Popup } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  const {
    body,
    createdAt,
    id,
    username,
    likeCount,
    likes,
    commentCount,
  } = post;

  return (
    <div>
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsmileyrainbow.files.wordpress.com%2F2008%2F10%2Fcodegeassr2_004_01.jpg&f=1&nofb=1"
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
              {moment(createdAt).fromNow(true)}
            </Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <Popup
              content="Comment on post"
              inverted
              trigger={
                <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
              }
            />
            {user && user.username === username && <DeleteButton postId={id} />}
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default PostCard;
