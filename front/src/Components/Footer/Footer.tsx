import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import tw from 'tailwind-styled-components';

const Container = tw.footer`
  bg-gray-100
  text-black
  px-4
  py-6
`;

const SocialIcons = tw.div`
  flex
  items-center
  justify-center
  mb-6
`;

const IconLink = tw.a`
  mx-4
  
`;

const ContactInfo = tw.div`
  text-center
  text-xl
`;

const Email = tw.a`
  text-black
  hover:text-gray-500
  transition-colors
  duration-300
  inline-block
  mt-2
`;

const Phone = tw.a`
  text-black
  hover:text-gray-500
  transition-colors
  duration-300
  inline-block
  mt-2
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <SocialIcons>
        <IconLink href="https://www.facebook.com/">
          <FaFacebook color="#3B5998" size={20} />
        </IconLink>
        <IconLink href="https://twitter.com/">
          <FaTwitter color="#1DA1F2" size={20} />
        </IconLink>
        <IconLink href="https://www.instagram.com/">
          <FaInstagram color="#E1306C" size={20} />
        </IconLink>
      </SocialIcons>
      <ContactInfo>
        <Email href="mailto:contact@TAMcompany.com">contact@TAMcompany.com</Email>
        <Phone href="tel:+1234567890">(32) 456-7890</Phone>
      </ContactInfo>
    </Container>
  );
};

export default Footer;
