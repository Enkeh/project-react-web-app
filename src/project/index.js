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
import ProjectNav from "./nav";
import store from "./store";
import { Provider } from "react-redux";
import CurrentUser from "./users/currentUser";
import ProtectedAdminRoute from "./users/protectedAdminRoute";
import "./index.css";

function Project() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <div>
          <div>
            <ProjectNav />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Account />} />
              <Route path="/search/:query/:page" element={<Search />} />
              <Route path="/search//:page" element={<Search />} />
              <Route path="/search/:query/" element={<Search />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/search" element={<Search />} />
              <Route path="/details/:id" element={<Show />} />
              <Route
                path="/users"
                element={
                  <ProtectedAdminRoute>
                    <UserList />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/profile/:id" element={<UserDetails />} />
            </Routes>
          </div>
        </div>
      </CurrentUser>
    </Provider>
  );
}

export default Project;