import { useContext } from "react";
import { MovieContext } from "./MovieContext.js";
import { UserContext } from "./UserContext.js";

function MessageList() {
  const { movie } = useContext(MovieContext);
  const { userList } = useContext(UserContext);

  const userMap = {};
  userList.forEach((user) => {
    userMap[user.id] = user;
  });

  movie.messageList.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    else return 0;
  });

  return (
    <div>
      {movie.messageList.map((message) => {
        return (
          <div>
            {message.date} {message.text} ({userMap?.[message.userId]?.name})
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
