// MetaTag.jsx

import { Helmet } from "react-helmet-async";
import React from "react";

const MetaTag = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>

      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:description" content={props.description} />

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
    </Helmet>
  );
};

export default MetaTag;
