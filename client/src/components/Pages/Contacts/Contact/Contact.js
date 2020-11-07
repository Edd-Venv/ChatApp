import React from "react";
import PropTypes from "proptypes";
import Logo from "../../../UI/Logo/Logo";

function Contact(props) {
  const { name, image } = props;
  return (
    <div>
      <p>{name}</p>
      <Logo image={image} />
    </div>
  );
}

Contact.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

export default Contact;
