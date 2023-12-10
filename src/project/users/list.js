import React, { useState } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function UserList() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const setRole = async (user, role) => {
    user.role = role;
    await client.updateUser(user._id, user);
    fetchUsers();
  }
  useState(() => {
    fetchUsers();
  }, []);
  return (
    <div className="wd-green-page wd-full">
      <div className="container wd-white-background" style={{borderBottomLeftRadius:"26px", borderBottomRightRadius:"26px"}}>
        <h2 className="wd-black pt-4">Users Management</h2>
        <div className="list-group" style={{paddingBottom:"12px"}}>
          {users.map((user) => (
            <li className="list-group-item">
              <div className="float-end">
                <DropdownButton className="wd-alternateButton d-grid" title={user.role}  variant="success" size="sm" style={{"width":"100px"}}>
                  <Dropdown.Item onClick={() => setRole(user, "ADMIN")}> <span>ADMIN</span> </Dropdown.Item>
                  <Dropdown.Item onClick={() => setRole(user, "CURATOR")}> <span>CURATOR</span> </Dropdown.Item>
                  <Dropdown.Item onClick={() => setRole(user, "VIEWER")}> <span>VIEWER</span> </Dropdown.Item>
                </DropdownButton>
              </div>
              <Link className="wd-black d-flex" key={user._id} to={"/profile/" + user._id}>
                {user.username}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
