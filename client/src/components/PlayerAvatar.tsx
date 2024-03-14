const colors = [
  "#8ed3b6",
  "#e57373",
  "#61c6ea",
  "#81c784",
  "#64b5f6",
  "#a1eafb",
  "#fff176",
  "#ff8754",
  "#fcdcd5",
  "#ffd1dc",
  "#e2a3f5",
  "#151515",
  "#626c72",
  "#ffe591",
  "#ffffff",
  "#b6d7a8",
  "#f9cb9c",
  "#ea9999",
  "#a4c2f4",
  "#d5a6bd",
  "#f4cccc",
  "#8e7cc3",
  "#ff9900",
  "#ff6f61",
  "#00b386",
  "#990000",
  "#0099cc",
  "#ffd700",
  "#7f6000",
  "#6aa84f",
];

export const PlayerAvatar = ({
  avatarId,
  size = 150,
  backgroundColor,
}: {
  avatarId: number;
  size?: number;
  backgroundColor?: string;
}) => {
  const defaultBackgroundColor = colors[avatarId % colors.length];
  return (
    <img
      src={"/avatars/" + avatarId + ".png"}
      alt="avatar"
      className="img rounded-circle"
      style={{
        width: size + "px",
        height: size + "px",
        backgroundColor: backgroundColor || defaultBackgroundColor,
      }}
    />
  );
};
