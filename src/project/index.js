import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home";
import Search from "./search";
import Show from "./show";
import UserList from "./users/list";
import UserDetails from "./users/details";
import SignIn from "./users/signin";
import Account from "./users/account";
import SignUp from "./users/signup";
import Nav from "./nav";
import store from "./store";
import { Provider } from "react-redux";
import CurrentUser from "./users/currentUser";
import ProtectedAdminRoute from "./users/protectedAdminRoute";
import "./index.css";

function Project() {
  return (
    <Provider store={store}>
      {/* <CurrentUser> */}
        <div>
          <div>
            <Nav />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search/" element={<Search />} />
              <Route path="/show/:id" element={<Show />} />
              <Route
                path="/users"
                element={
                  <ProtectedAdminRoute>
                    <UserList />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/users/:id" element={<UserDetails />} />
            </Routes>
          </div>
        </div>
      {/* </CurrentUser> */}
    </Provider>
  );
}

export default Project;