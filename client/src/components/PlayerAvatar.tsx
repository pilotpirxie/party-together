import cx from "classnames";

export const PlayerAvatar = ({
  avatarId,
  size = 150,
  backgroundColor,
  className,
}: {
  avatarId: number;
  size?: number;
  backgroundColor: string;
  className?: string;
}) => {
  return (
    <img
      src={"/avatars/" + avatarId + ".png"}
      alt="avatar"
      className={cx("img rounded-circle", className)}
      style={{
        width: size + "px",
        height: size + "px",
        backgroundColor: backgroundColor,
      }}
    />
  );
};
