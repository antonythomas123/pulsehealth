import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div className={`bg-white hover:shadow-md rounded-lg p-2 w-full ${className || ''}`}>
      <div>{children}</div>
    </div>
  );
};

export default Card;
