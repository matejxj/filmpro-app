import Dropdown from "react-bootstrap/Dropdown";

import { useContext } from "react";
import { UserContext } from "./UserContext";
import { MovieListContext } from "./MovieListContext";

import Icon from "@mdi/react";
import {
  mdiEmoticonHappyOutline,
  mdiEmoticonSadOutline,
  mdiEmoticonNeutralOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

function AttendeeDecision({ movie }) {
  const { loggedInUser } = useContext(UserContext);
  const { handlerMap } = useContext(MovieListContext);

  const loggedInUserAttendance = getLoggedInUserAttendance(movie, loggedInUser);
  const guestsCount = movie.userMap?.[loggedInUser?.id]?.guests || 0;
  const guestsColor = getGuestsCount(guestsCount);

  return loggedInUser ? (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="attencanceDecision"
          variant="light"
          style={dropdownStyle()}
        >
          <Icon
            path={loggedInUserAttendance.iconPath}
            size={0.8}
            color={loggedInUserAttendance.color}
          />{" "}
          <span style={componentStyle(loggedInUserAttendance.color)}>
            {loggedInUserAttendance.attendance}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {decisionButton({
            handlerMap,
            movie,
            loggedInUser,
            color: "#69a765",
            text: "jdu",
          })}
          {decisionButton({
            handlerMap,
            movie,
            loggedInUser,
            color: "#ff2216",
            text: "nejdu",
          })}
          {decisionButton({
            handlerMap,
            movie,
            loggedInUser,
            color: "#ffb447",
            text: "nevím",
          })}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle
          id="plusGuests"
          variant="light"
          style={dropdownStyle()}
        >
          <Icon path={mdiPlusCircleOutline} size={0.8} color={guestsColor} />{" "}
          <span style={componentStyle(guestsColor)}>{guestsCount}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[0, 1, 2, 3, 4, 5, 6].map((numberOfGuests) => {
            return guestsButton({
              handlerMap,
              movie,
              loggedInUser,
              numberOfGuests,
            });
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  ) : null;
}

function dropdownStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    background: "none",
    border: "none",
  };
}

function getLoggedInUserAttendance(movie, loggedInUser) {
  let attendance;
  let iconPath;
  let color;
  if (loggedInUser && movie.userMap?.[loggedInUser?.id]?.attendance === "yes") {
    attendance = "jdu";
    iconPath = mdiEmoticonHappyOutline;
    color = "#69a765";
  } else if (
    loggedInUser &&
    movie.userMap?.[loggedInUser?.id]?.attendance === "no"
  ) {
    attendance = "nejdu";
    iconPath = mdiEmoticonSadOutline;
    color = "#ff2216";
  } else {
    attendance = "nevím";
    iconPath = mdiEmoticonNeutralOutline;
    color = "#ffb447";
  }
  return { attendance, iconPath, color };
}

function componentStyle(color) {
  return {
    fontSize: "18px",
    color: color,
  };
}

function decisionButton({ handlerMap, movie, loggedInUser, color, text }) {
  return (
    <Dropdown.Item
      key={text}
      style={{ color }}
      onClick={() =>
        handlerMap.handleAttendance({
          movieId: movie.id,
          userId: loggedInUser.id,
          attendance: text === "jdu" ? "yes" : text === "nejdu" ? "no" : null,
        })
      }
    >
      {text}
    </Dropdown.Item>
  );
}

function guestsButton({ handlerMap, movie, loggedInUser, numberOfGuests }) {
  return (
    <Dropdown.Item
      key={numberOfGuests.toString()}
      style={{ color: getGuestsCount(numberOfGuests) }}
      onClick={() =>
        handlerMap.handleAttendance({
          movieId: movie.id,
          userId: loggedInUser.id,
          guests: numberOfGuests,
        })
      }
    >
      {numberOfGuests}
    </Dropdown.Item>
  );
}

function getGuestsCount(guestsCount) {
  return guestsCount > 0 ? "#69a765" : "#707373";
}

export default AttendeeDecision;
