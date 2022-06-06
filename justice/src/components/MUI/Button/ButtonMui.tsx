import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const CustomButton = withStyles({

    root: {
        background: "#363636",
        borderRadius: 3,
        border: 0,
        color: "#FFFFFF",
        padding: "12px 24px",
        boxShadow: "none",
        fontSize:"12px",
        fontWeight: 600
    },
    label: {
        textTransform: "capitalize"
    },
    disabled:{

    },


})(props => <Button {...props} />);

export default CustomButton


