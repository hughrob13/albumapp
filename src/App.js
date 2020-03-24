import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { auth, db, snapshotToArray } from "./firebase";
import Photos from "./photos";
import Public from "./public";
import AddAlbum from "./addalbum";

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dialog_open, setDialogOpen] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("albums")
        .onSnapshot(snapshot => {
          const updatedalbums = snapshotToArray(snapshot);
          setAlbums(updatedalbums);
        });
    }
  }, [user]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
          >
            My App
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List>
          <ListItem
            button
            to={"/app/public/"}
            component={Link}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Public Feed" />
          </ListItem>
          {albums.map(a => {
            return (
              <ListItem
                button
                to={"/app/album/" + a.id + "/"}
                component={Link}
                key={a.id}
                onClick={() => {
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={a.name} />
              </ListItem>
            );
          })}

          <ListItem
            button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <ListItemText primary="Create New Album" />
          </ListItem>
        </List>
      </Drawer>
      <AddAlbum
        open={dialog_open}
        user={user}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
      <Route
        path="/app/album/:album_id/"
        render={routeProps => {
          return <Photos user={user} {...routeProps} />;
        }}
      />
      <Route
        path="/app/public"
        render={routeProps => {
          return <Public user={user} {...routeProps} />;
        }}
      />
    </div>
  );
}
