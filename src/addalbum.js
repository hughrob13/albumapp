import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { db } from "./firebase";

export default function AddAlbum(props) {
  const [name, setName] = useState("");

  const handleSaveAlbum = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .add({ name: name });
  };

  return (
    <Dialog open={props.open} maxWidth="sm" fullWidth onClose={props.onClose}>
      <DialogTitle>Add An Album</DialogTitle>
      <DialogContent>
        <TextField
          label="Album Name"
          fullWidth={true}
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleSaveAlbum}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
