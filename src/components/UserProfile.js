import React from "react";
// import { PropTypes } from "prop-types";
import Icon from "./Icons";

const UserProfile = ({ data }) => {
  const { avatar_url, name, login, bio, company, location } = data,
    email = "dummy@example.com";
  return (
    <div className='user-profile'>
      <img
        src={
          avatar_url
            ? avatar_url
            : "https://avatars0.githubusercontent.com/u/19514765?v=4"
        }
        alt='{name}'
      />
      <div className='name'>{name}</div>
      <div className='user-name'>{login}</div>
      <div className='bio'>{bio}</div>
      <div className='company'>
        <Icon name='company' viewBox='0 0 16 15' />
        {company}
      </div>
      <div className='location'>
        <Icon name='location' width='12' viewBox='0 0 12 16' />
        {location}
      </div>
      <div className='email'>
        <Icon name='email' width='14' viewBox='0 0 14 15' />
        <a href={"mailto:" + email}>{email}</a>
      </div>
      <div className='report'>Block or report user</div>
    </div>
  );
};

// UserProfile.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default UserProfile;
