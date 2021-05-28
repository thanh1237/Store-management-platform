import Account from "pages/Account/container/Account";
import CreateModal from "pages/Account/container/CreateModal";
import React from "react";
import "./Account.css";

export const AccountIndex = () => {
  return (
    <div className="create-button">
      <CreateModal />
      <Account />
    </div>
  );
};
export default AccountIndex;
