"use client";
import React, { Suspense } from "react";

import UserProfileComponent from "@/components/dashboard/dashboard";

const UserProfilePage: React.FC = () => {
  return (
    <>
      <Suspense>
        <UserProfileComponent />
      </Suspense>
    </>
  );
};

export default UserProfilePage;
