import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-info vh-100 overflow-y-auto">
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <div className="card card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
