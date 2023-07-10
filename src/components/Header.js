import React, { useState } from "react";
import {
  Typography,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import "./Header.css";
import logo from "../images.jfif";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';


const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  return (
    <Navbar expand="lg" className="bg-body-tertiary nav1" >
      <Container>
        {/* <Typography className={classes.font} variant="h4">
          Blogging
        </Typography> */}
        <Typography className={classes.font} variant="h4">
          <img src={logo} alt="Blogging" className="logo" />
        </Typography>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          {isLoggedIn && (
            <Nav className="me-auto" display="flex" marginLeft={"auto"} marginRight="auto" >
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs"
                  label="All Blogs"
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/myBlogs"
                  label="My Blogs"
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs/add"
                  label="Add Blog"
                />
              </Tabs>
            </Nav>
          )}
          <Nav className="m-auto" style={{ width: "fit-content" }}>
            {!isLoggedIn && (
              <>
                {" "}
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10, background: "red" }}
                  color="warning"
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10, background: "red" }}
                  color="warning"
                >
                  Signup
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => dispath(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, background: "red" }}
                color="warning"
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
