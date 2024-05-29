import { useContext, useState } from "react";
import { MovieContext } from "./MovieContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import MovieDateTimeBadge from "./MovieDateTimeBadge";
import MovieDetail from "./MovieDetail";

import MessageForm from "./MessageForm";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiPlusBoxOutline } from "@mdi/js";
import MessageList from "./MessageList";

function MovieRoute() {
  const navigate = useNavigate();
  const [showMessageForm, setShowMessageForm] = useState(false);

  const { state, movie } = useContext(MovieContext);

  let child = null;
  switch (state) {
    case "ready":
      child = (
        <>
          {!!showMessageForm ? (
            <MessageForm
              movie={showMessageForm}
              setShowMessageForm={setShowMessageForm}
            />
          ) : null}
          <div
            className="card border-0 shadow rounded"
            style={componentStyle()}
          >
            <>
              <MovieDateTimeBadge movie={movie} />
              <MovieDetail movie={movie} />
              <div
                style={{
                  display: "grid",
                  gap: "2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => navigate("/movieDetail?id=" + movie.id)}
                  size={"sm"}
                >
                  <Icon path={mdiEyeOutline} size={0.7} />
                </Button>
                <Button onClick={() => setShowMessageForm(movie)} size={"sm"}>
                  <Icon path={mdiPencil} size={0.7} />
                </Button>
              </div>
            </>
          </div>
          <div
            className="card border-0 shadow rounded"
            style={componentStyle()}
          >
            <Button onClick={() => setShowMessageForm(movie)}>
              <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
              zpráva
            </Button>
            {movie.messageList.length ? (
              <MessageList />
            ) : (
              "Zatím sem nikdo nic nenapsal"
            )}
          </div>
        </>
      );
      break;
    case "pending":
      child = "loading...";
      break;
    case "error":
      child = "error";
      break;
    default:
      child = "loading...";
  }

  return child;
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default MovieRoute;
