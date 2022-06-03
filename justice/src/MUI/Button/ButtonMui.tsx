import styled from "styled-components";
import Button from "@material-ui/core/Button";

const HeaderButton = styled(Button)`
  .MuiButton-label {
    color: #FFFFFF;
    font-size: 12px;
    background: #363636;
    padding: 12px 24px;
    font-weight: 600;
    text-transform: capitalize;
    border: none;
  }
  .MuiButton-label:hover{
    background: #363636;
  }
`;

export default HeaderButton;


