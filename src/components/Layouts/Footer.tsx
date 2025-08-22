import React from "react";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer>
      <div className="mt-16 border-t pt-8">
        <p className="text-center text-xs/relaxed text-muted-foreground">
          © Rimi 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
