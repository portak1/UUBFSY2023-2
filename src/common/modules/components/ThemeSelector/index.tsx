import React, { useState, useEffect } from "react";

import Select, { SelectItemProps } from "../Select";
import { useTheme } from "../../contexts/ThemeProvider";

type ThemeSelectorProps = {
  className?: string;
};

const themes: SelectItemProps[] = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

const ThemeSelector = ({ className = "" }: ThemeSelectorProps) => {
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState<SelectItemProps>(
    themes.find((t) => t.value === theme) || themes[0]
  );

  const handleSelectedChange = (e: SelectItemProps) => {
    setSelected(e);
    toggleTheme(e.value);
  };

  useEffect(() => {
    const currentTheme = themes.find((t) => t.value === theme);
    if (currentTheme) setSelected(currentTheme);
  }, [theme]);

  return (
    <Select
      className={className}
      items={themes}
      onSelectedChange={handleSelectedChange}
      defaultSelected={selected}
    />
  );
};

export default ThemeSelector;
