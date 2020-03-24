import React, { useState, useEffect } from "react";
import PhotoCard from "./photocard";
import AddPhoto from "./addphoto";
import { db, snapshotToArray } from "./firebase";

export default function Public(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  const [publicp, setPublic] = useState([]);

  useEffect(() => {
    db.collectionGroup("photos")
      .get()
      .then(snapshot => {
        const updatedpublic = snapshotToArray(snapshot);
        setPublic(updatedpublic);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10
      }}
    >
      {publicp.map(p => {
        return <PhotoCard photo={p} public={true} />;
      })}

      <div>
        {/* <Button
          color="secondary"
          onClick={() => {
            setDialogOpen(true);
          }}
          variant="contained"
          style={{ marginRight: 10, marginTop: 10 }}
        >
          Add Photo
        </Button> */}
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
