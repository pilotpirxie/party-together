export const PlayerAvatar = ({
  avatarId,
  size = 150,
  backgroundColor = "#ed0080",
}: {
  avatarId: number;
  size?: number;
  backgroundColor?: string;
}) => {
  return (
    <img
      src={"/avatars/" + avatarId + ".png"}
      alt="avatar"
      className="img rounded-circle"
      style={{
        width: size + "px",
        height: size + "px",
        backgroundColor: backgroundColor,
      }}
    />
  );
};
