import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import EditButton from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import EditPhoto from "./editphoto";

export default function PhotoCard(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  return (
    <Card
      style={{
        maxWidth: 345,
        marginRight: 10,
        marginTop: 10
      }}
    >
      <CardMedia
        height="300"
        component="img"
        image={props.photo.image}
        title=""
      />

      <CardContent>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexGrow: "1" }}>
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              color="textSecondary"
            >
              {props.photo.title}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            {!props.public && (
              <IconButton
                color="default"
                onClick={() => {
                  setDialogOpen(true);
                }}
                variant="contained"
                style={{ marginRight: 10, marginTop: 10 }}
              >
                <EditButton />
              </IconButton>
            )}
            <EditPhoto
              album_id={props.album_id}
              open={dialog_open}
              photo={props.photo}
              user={props.user}
              onClose={() => {
                setDialogOpen(false);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
