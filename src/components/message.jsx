import { Typography } from '@mui/material';
import React, { memo } from 'react';
import moment from 'moment';

const Message = ({ message, user }) => {
  const { content, sender, createdAt } = message;
  const { id } = user;

  const sameSender = String(sender._id) === String(id);

  return (
    <div
      style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        background: 'white',
        color: sameSender ? 'black' : 'red',
        borderRadius: '5px',
        padding: '0.5rem',
        width: 'fit-content',
      }}
    >
      {!sameSender && (
        <Typography variant="caption" color={"0000007a"} fontWeight={"600"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      <Typography variant="caption" color={'text.secondary'}>
        {moment(createdAt).fromNow()}
      </Typography>
    </div>
  );
};

export default memo(Message);
