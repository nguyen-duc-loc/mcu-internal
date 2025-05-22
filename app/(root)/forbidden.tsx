import React from "react";

import ErrorPage from "@/components/error-page";

const Forbidden = () => {
  return (
    <ErrorPage
      errorCode={403}
      message="Forbidden"
      description="Accessing the page or resource you were trying to reach is forbidden"
    />
  );
};

export default Forbidden;
