import React from "react";

import ErrorPage from "@/components/error-page";

const NotFoundCustomer = () => {
  return (
    <ErrorPage
      errorCode={404}
      message="Something went wrong"
      description="Sorry we were unable to find the user you are looking for"
    />
  );
};

export default NotFoundCustomer;
