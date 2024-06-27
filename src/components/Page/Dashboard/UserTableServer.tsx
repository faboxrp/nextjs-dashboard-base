import React from "react";
import { getDictionary } from "@/locales/dictionary";
import UserTable from "./UserTable";

interface UserItem {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
}

const UserTableServer = async () => {
  const dict = await getDictionary();

  try {
    const response = await fetch("http://127.0.0.1:8069/api/participants");
    if (!response.ok) {
      console.error("Failed to fetch participants:", response.statusText);
      return <div>Error fetching participants</div>;
    }
    const initialUsers: UserItem[] = await response.json();

    return (
      <div>
        <UserTable dict={dict} initialUsers={initialUsers} />
      </div>
    );
  } catch (error) {
    console.error("An error occurred while fetching participants:", error);
    return <div>Error fetching participants</div>;
  }
};

export default UserTableServer;
