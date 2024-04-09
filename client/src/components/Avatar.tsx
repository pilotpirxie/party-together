import { PlayerAvatar } from "./PlayerAvatar.tsx";
import { getRandomAvatar } from "../utils/avatars.ts";
import { getRandomPastelColor } from "../utils/colors.ts";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export function AvatarChoose({
  avatar,
  color,
  onRollAvatar,
}: {
  avatar: number;
  color: string;
  onRollAvatar: (avatarIndex: number, color: string) => void;
}) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleRollAvatar = () => {
    onRollAvatar(getRandomAvatar(), getRandomPastelColor());
    avatarRef.current?.classList.remove("animate__jello");
    setTimeout(() => {
      avatarRef.current?.classList.add("animate__jello");
    }, 10);
  };

  return (
    <div className="text-center cursor-pointer" onClick={handleRollAvatar}>
      <div ref={avatarRef} className="animate__jello animate__animated">
        <PlayerAvatar avatarId={avatar} backgroundColor={color} />
      </div>
      <div>
        <i className="ri-refresh-line" /> {t("Roll avatar")}
      </div>
    </div>
  );
}
