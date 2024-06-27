"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";

interface UserItem {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
}

interface UserTableProps {
  dict: any;
  initialUsers: UserItem[];
}

const UserTable: React.FC<UserTableProps> = ({ dict, initialUsers }) => {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/participants");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table border mb-0">
        <thead className="fw-semibold">
          <tr className="align-middle table-light dark:table-dark">
            <th className="text-center" aria-label="icon">
              <FontAwesomeIcon icon={faUsers} fixedWidth />
            </th>
            <th>{dict.dashboard.listing.headers.name}</th>
            <th>{dict.dashboard.listing.headers.email}</th>
            <th>{dict.dashboard.listing.headers.phone}</th>
            <th>{dict.dashboard.listing.headers.birthdate}</th>
            <th>{dict.dashboard.listing.headers.gender}</th>
            <th aria-label="Action" />
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index} className="align-middle">
              <td className="text-center">
                <div className="avatar avatar-md d-inline-flex position-relative">
                  <Image fill sizes="40px" className="rounded-circle" src={`/assets/img/avatars/${index + 1}.jpg`} alt={item.email} />
                  <span className={`avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white`} />
                </div>
              </td>
              <td>
                <div>{item.name}</div>
              </td>
              <td>
                <div>{item.email}</div>
              </td>
              <td>
                <div>{item.phone}</div>
              </td>
              <td>
                <div>{item.birthdate}</div>
              </td>
              <td>
                <div>{item.gender}</div>
              </td>
              <td>
                <Dropdown align="end">
                  <DropdownToggle
                    as="button"
                    bsPrefix="btn"
                    className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                    id={`action-user${index + 1}`}>
                    <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                    <DropdownItem href="#/action-2">{dict.action.edit}</DropdownItem>
                    <DropdownItem className="text-danger" href="#/action-3">
                      {dict.action.delete}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
