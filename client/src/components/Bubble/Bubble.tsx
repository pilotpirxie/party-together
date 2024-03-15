import { ReactNode } from "react";
import styles from "./Bubble.module.css";
import cx from "classnames";

export const Bubble = ({
  children,
  direction,
  className,
}: {
  children: ReactNode;
  direction: "left" | "right" | "bottom" | "top";
  className?: string;
}) => {
  return (
    <div
      className={cx(styles.speechBubble, className, {
        [styles.speechBubbleLeft]: direction === "left",
        [styles.speechBubbleRight]: direction === "right",
        [styles.speechBubbleBottom]: direction === "bottom",
        [styles.speechBubbleTop]: direction === "top",
      })}
    >
      {children}
    </div>
  );
};
