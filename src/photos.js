import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import PhotoCard from "./photocard";
import AddPhoto from "./addphoto";
import { db, snapshotToArray } from "./firebase";

export default function Photos(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .doc(props.match.params.album_id)
      .collection("photos")
      .onSnapshot(snapshot => {
        const updatedphotos = snapshotToArray(snapshot);
        setPhotos(updatedphotos);
      });
    return unsubscribe;
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10
      }}
    >
      {photos.map(p => {
        return (
          <PhotoCard
            key={p.id}
            photo={p}
            public={false}
            user={props.user}
            album_id={props.match.params.album_id}
          />
        );
      })}

      <div>
        <Button
          color="secondary"
          onClick={() => {
            setDialogOpen(true);
          }}
          variant="contained"
          style={{ marginRight: 10, marginTop: 10 }}
        >
          Add Photo
        </Button>
      </div>
      <AddPhoto
        album_id={props.match.params.album_id}
        open={dialog_open}
        user={props.user}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
