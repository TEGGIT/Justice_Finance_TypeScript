import React, { memo, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import classes from "./ButtonMui.module.scss";

interface ButtonMuiStyleProps {
  direction?: string;
  border?: string;
  coloring?: string;
  rounding?: string; // border-radius
  textTransform?: string;
  mt?: string; // margin-top
  fontSize?: string;
  gap?: string;
  height?: string;
  padding?: string;
  fontWeight?: string;
  bc?: string; // background-color
  hb?: string; // background-color:hover
}

type ButtonType = "submit" | "reset" | "button";

interface ButtonMuiProps extends ButtonMuiStyleProps {
  text: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  alt?: string;
}

const BootstrapButton = styled(Button)<ButtonMuiStyleProps>`
  box-shadow: none;
  flex-direction: ${({ direction }) => direction};
  border: ${({ border }) => border};
  color: ${({ coloring }) => coloring};
  border-radius: ${({ rounding }) => rounding};
  text-transform: none;
  overflow: hidden;
  margin-top: ${({ mt }) => mt};
  font-size: ${({ fontSize }) => fontSize};
  z-index: 2;
  gap: ${({ gap }) => gap};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ bc }) => bc};
  font-family: "Inter", sans-serif;

  :disabled {
    background: #ededed;
    color: #8c8c8c;
  }

  :hover {
    box-shadow: none;
    background-color: ${({ bc }) => bc};
  }
`;

const ButtonMui = ({
  text,
  padding,
  icon,
  coloring,
  gap,
  fontSize,
  hb,
  mt,
  rounding,
  bc,
  height,
  onClick,
  border,
  fontWeight,
  disabled,
  direction,
  type,
  alt,
}: ButtonMuiProps) => {
  const [hover, setHover] = useState(false);

  return (
    <Stack spacing={0} direction="row">
      <BootstrapButton
        type={type}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disableRipple
        direction={direction}
        fontWeight={fontWeight}
        border={border}
        height={height}
        rounding={rounding}
        mt={mt}
        hb={hb}
        fontSize={fontSize}
        coloring={coloring}
        bc={bc}
        gap={gap}
        padding={padding}
      >
        <img src={icon} alt={alt} />
        <p>{text}</p>
        {hover && <div className={classes.buttonBackground} />}
      </BootstrapButton>
    </Stack>
  );
};

export default memo(ButtonMui);
