import cx from "classnames";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="text-center mt-3">
        {t("Game created by")}
        <a
          href="https://github.com/pilotpirxie/party-together"
          target="_blank"
          rel="noreferrer"
          className="mx-1"
        >
          PilotPirxie
        </a>
        {t("and")}
        <a
          href="https://behance.net/krzysztofsojka1"
          target="_blank"
          rel="noreferrer"
          className="mx-1"
        >
          XantesS
        </a>
        {" © " + new Date().getFullYear()}
      </div>
      <div className="d-flex gap-3 justify-content-center">
        <div
          className={cx("cursor-pointer", {
            "text-decoration-underline": i18n.language === "en",
          })}
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </div>
        <div
          className={cx("cursor-pointer", {
            "text-decoration-underline": i18n.language === "pl",
          })}
          onClick={() => i18n.changeLanguage("pl")}
        >
          PL
        </div>
      </div>
    </div>
  );
}
