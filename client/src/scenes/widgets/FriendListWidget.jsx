import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const [friends, setFriends] = useState([]);

const [loading, setLoading] = useState(true);

const getFriends = async () => {
  setLoading(true);
  const response = await fetch(
    `http://localhost:3001/users/${userId}/friends`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  setFriends(data);
  setLoading(false);
};


  useEffect(() => {
    getFriends();
  }, [userId]); // ✅ watch for userId change

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
{loading ? (
  <Typography>Loading friends...</Typography>
) : (
  friends.map((friend) => (
    <Friend
      key={friend._id}
      friendId={friend._id}
      name={`${friend.firstName} ${friend.lastName}`}
      subtitle={friend.occupation}
      userPicturePath={friend.picturePath}
    />
  ))
)}

      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
