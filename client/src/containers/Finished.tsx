import { Container } from "../components/Container.tsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "../data/store.ts";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";
import cx from "classnames";

export function Finished() {
  const { t } = useTranslation();
  const users = useAppSelector((state) => state.game.users);
  return (
    <Container>
      <div className="text-center">
        <h1>{t("The End")}</h1>
      </div>

      <div className="d-flex gap-2 justify-content-center align-items-center flex-wrap">
        {users.map((user, index) => (
          <PlayerAvatar
            className={cx(
              "animate__infinite animate__bounce animate__animated",
              {
                "animate__delay-1s": index % 2 === 0,
                "animate__delay-2s": index % 2 === 1,
              },
            )}
            avatarId={user.avatar}
            size={120}
            key={user.id}
            backgroundColor={user.color}
          />
        ))}
      </div>

      <div className={"text-center"}>
        <Link to={"/"} className="btn btn-warning text-dark mt-3">
          {t("Back to home")}
        </Link>
      </div>
    </Container>
  );
}
