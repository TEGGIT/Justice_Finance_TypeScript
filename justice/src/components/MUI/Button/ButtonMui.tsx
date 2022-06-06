import * as React from "react";
import { memo, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import classes from "./ButtonMui.module.scss";

interface ButtonMuiStyleProps {
  flexDirection?: string;
  border?: string;
  fontColor?: string;
  borderRadius?: string;
  textTransform?: string;
  marginTop?: string;
  fontSize?: string;
  gap?: string;
  height?: string;
  padding?: string;
  fontWeight?: string;
  backgroundColor?: string;
  hoverBackground?: string;
}

interface ButtonMuiProps extends ButtonMuiStyleProps {
  text: string;
  img?: any;
  onClick?: () => void;
  disabled?: boolean;
  type?: any;
}

const BootstrapButton = styled(Button)<ButtonMuiStyleProps>`
  box-shadow: none;
  flex-direction: ${({ flexDirection }) => flexDirection};
  border: ${({ border }) => border};
  color: ${({ fontColor }) => fontColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  text-transform: none;
  overflow: hidden;
  margin-top: ${({ marginTop }) => marginTop};
  font-size: ${({ fontSize }) => fontSize};
  z-index: 2;
  gap: ${({ gap }) => gap};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-family: "Inter", sans-serif;
`;

// ({
//     boxShadow: "none",
//     display: 'flex',
//     flexDirection: `${flexDirection}`,
//     border: `${border}`,
//     color: `${color}`,
//     borderRadius: `${borderRadius}`,
//     textTransform: 'none',
//     overflow: 'hidden',
//     marginTop: `${marginTop}`,
//     fontSize: `${fontSize}`,
//     zIndex: '2',
//     gap: `${gap}`,
//     height: `${height}`,
//     padding: `${padding}`,
//     fontStyle: 'normal',
//     fontWeight: `${fontWeight}`,
//     backgroundColor: `${background}`,
//     fontFamily: [
//         'Inter, sans-serif',
//     ].join(','),
//     '&:hover': {
//         boxShadow: 'none',
//         backgroundColor: `${hoverBackground}`,
//     },
//     '&:active': {
//         boxShadow: 'none',
//     },
//     '&:disabled': {
//         background: '#EDEDED',
//         color: '#8C8C8C',
//     },
// });

const ButtonMui = ({
  text,
  padding,
  img,
  fontColor,
  gap,
  fontSize,
  hoverBackground,
  marginTop,
  borderRadius,
  backgroundColor,
  height,
  onClick,
  border,
  fontWeight,
  disabled,
  flexDirection,
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
        flexDirection={flexDirection}
        fontWeight={fontWeight}
        border={border}
        height={height}
        borderRadius={borderRadius}
        marginTop={marginTop}
        hoverBackground={hoverBackground}
        fontSize={fontSize}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
        gap={gap}
        padding={padding}
      >
        <img src={img} />
        <p>{text}</p>
        {hover && <div className={classes.buttonBackground} />}
      </BootstrapButton>
    </Stack>
  );
};

export default memo(ButtonMui);
