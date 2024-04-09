import { ReactNode } from "react";
import cx from "classnames";

export const Container = ({
  children,
  size = "m",
  color = "white",
}: {
  children: ReactNode;
  size?: "s" | "m" | "l" | "xl";
  color?:
    | "white"
    | "dark"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info";
}) => {
  return (
    <div className={`bg-info vh-100 overflow-y-auto`}>
      <div className={`container py-3 py-md-5`}>
        <div className="row">
          <div
            className={cx([
              "col-12",
              {
                "col-md-6 offset-md-3": size === "s",
                "col-md-8 offset-md-2": size === "m",
                "col-md-10 offset-md-1": size === "l",
                "col-md-12": size === "xl",
              },
            ])}
          >
            <div className={`card card-body bg-${color}`}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
