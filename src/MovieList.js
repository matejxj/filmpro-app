import { useContext, useState } from "react";
import { MovieListContext } from "./MovieListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import MovieCard from "./MovieCard";
import MovieForm from "./MovieForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function MovieList() {
  const { movieList } = useContext(MovieListContext);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const filteredMovieList = movieList.filter(
    (movie) => new Date(movie.date) > new Date()
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowMovieForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
          událost
        </Button>
        <Button variant="success" disabled>
          <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} />{" "}
          Nové události
        </Button>
      </div>
      {!!showMovieForm ? (
        <MovieForm movie={showMovieForm} setShowMovieForm={setShowMovieForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          movie={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {filteredMovieList.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            setShowMovieForm={setShowMovieForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default MovieList;
