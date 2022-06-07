import * as React from "react";
import { memo, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import classes from "./ButtonMui.module.scss";

interface ButtonMuiStyleProps {
  direction?: string;
  border?: string;
  fontcolor?: string;
  borderradius?: string;
  textTransform?: string;
  mt?: string;
  fontSize?: string;
  gap?: string;
  height?: string;
  padding?: string;
  fontWeight?: string;
  backgroundcolor?: string;
  hoverbackground?: string;
}

interface ButtonMuiProps extends ButtonMuiStyleProps {
  text: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: any;
}

const BootstrapButton = styled(Button)<ButtonMuiStyleProps>`
  box-shadow: none;
  flex-direction: ${({ direction }) => direction};
  border: ${({ border }) => border};
  color: ${({ fontcolor }) => fontcolor};
  border-radius: ${({ borderradius }) => borderradius};
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
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  font-family: "Inter", sans-serif;

  :disabled {
    background: #ededed;
    color: #8c8c8c;
  }

  :hover {
    box-shadow: none;
    background-color: ${({ backgroundcolor }) => backgroundcolor};
  }
`;

const ButtonMui = ({
  text,
  padding,
  icon,
  fontcolor,
  gap,
  fontSize,
  hoverbackground,
  mt,
  borderradius,
  backgroundcolor,
  height,
  onClick,
  border,
  fontWeight,
  disabled,
  direction,
  type,
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
        borderradius={borderradius}
        mt={mt}
        hoverbackground={hoverbackground}
        fontSize={fontSize}
        fontcolor={fontcolor}
        backgroundcolor={backgroundcolor}
        gap={gap}
        padding={padding}
      >
        <img src={icon} />
        <p>{text}</p>
        {hover && <div className={classes.buttonBackground} />}
      </BootstrapButton>
    </Stack>
  );
};

export default memo(ButtonMui);
