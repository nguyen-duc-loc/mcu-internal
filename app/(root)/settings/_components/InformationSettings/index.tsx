import React from "react";

import { createAuthHeader } from "@/lib/api/auth-header";
import { getMe } from "@/lib/api/data/users";

import UpdateInformationForm from "./UpdateInformationForm";

const InformationSettings = async () => {
  const me = await getMe(await createAuthHeader());

  return <UpdateInformationForm me={me} />;
};

export default InformationSettings;
