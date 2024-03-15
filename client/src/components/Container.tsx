import { ReactNode } from "react";
import cx from "classnames";

export const Container = ({
  children,
  size = "m",
}: {
  children: ReactNode;
  size?: "s" | "m" | "l" | "xl";
}) => {
  return (
    <div className="bg-info vh-100 overflow-y-auto">
      <div className="container py-3 py-md-5">
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
            <div className="card card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
