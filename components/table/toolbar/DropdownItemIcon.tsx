import React from "react";

interface DropdownItemIcon {
  Element: React.ComponentType<{ className: string }>;
}

const DropdownItemIcon = ({ Element }: DropdownItemIcon) => {
  return <Element className="mr-2 size-4 text-muted-foreground" />;
};

export default DropdownItemIcon;
