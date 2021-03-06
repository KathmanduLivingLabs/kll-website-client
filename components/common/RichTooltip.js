import {
  Box,
  ClickAwayListener,
  Fade,
  makeStyles,
  Paper,
  Popper,
  PopperPlacementType,
} from "@material-ui/core";
import React, { ReactElement } from "react";

const useStyles = makeStyles((theme) => {
  const color = theme.palette.background.paper; // Feel free to customise this like they do in Tooltip

  return {
    popoverRoot: {
      backgroundColor: color,
      maxWidth: 1000,
      boxShadow: "0px 10px 45px rgba(13, 24, 41, 0.15)",
      padding: "24px 20px",
      borderRadius: "12px",
      position: "relative",
    },
    content: {
      // padding: theme.spacing(2),
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js and https://github.com/mui-org/material-ui/blob/4f2a07e140c954b478a6670c009c23a59ec3e2d4/docs/src/pages/components/popper/ScrollPlayground.js
    popper: {
      zIndex: 2000,
      paddingTop: "1rem",
      '&[x-placement*="bottom"] $arrow': {
        top: "-15px",
        left: 0,
        "&::before": {
          transformOrigin: "0 100%",
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: "-0.71em",
        marginLeft: 4,
        marginRight: 4,
        "&::before": {
          transformOrigin: "100% 0",
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: "-0.71em",
        height: "1em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "100% 100%",
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: "-0.71em",
        height: "1em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "0 0",
        },
      },
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js
    arrow: {
      overflow: "hidden",
      position: "absolute",
      width: "20px",
      height: "20px" /* = width / sqrt(2) = (length of the hypotenuse) */,
      boxSizing: "border-box",
      color,
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "currentColor",
        transform: "rotate(45deg)",
      },
    },
    fadeCtr: {
      background: "transparent",
      marginTop: "-1rem",
      paddingTop: "2rem",
    },
  };
});

const RichTooltip = ({
  placement = "top",
  arrow = true,
  open,
  onClose = () => {},
  content,
  children,
  popoverEnter,
  popoverLeave,
  index,
  handlePopoverOpen,
  setOpenedPopoverId,
  setOpen,
}) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = React.useState(null);
  const [childNode, setChildNode] = React.useState(null);

  return (
    <div>
      {React.cloneElement(children, { ...children.props, ref: setChildNode })}
      <Popper
        open={open}
        anchorEl={childNode}
        placement={placement}
        transition
        className={classes.popper}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: "window",
          },
          arrow: {
            enabled: arrow,
            element: arrowRef,
          },
        }}
      >
        {({ TransitionProps }) => (
          <div
            className={classes.fadeCtr}
            onMouseOver={() => handlePopoverOpen(index)}
            onMouseOut={() => setOpenedPopoverId(null)}
          >
            <Fade {...TransitionProps} timeout={0}>
              <ClickAwayListener onClickAway={onClose}>
                <Paper
                  className={classes.popoverRoot}
                  onMouseEnter={() => handlePopoverOpen(index)}
                  onMouseLeave={() => setOpenedPopoverId(null)}
                >
                  {arrow ? (
                    <span className={classes.arrow} ref={setArrowRef} />
                  ) : null}
                  <Box className={classes.content}>{content}</Box>
                </Paper>
              </ClickAwayListener>
            </Fade>
          </div>
        )}
      </Popper>
    </div>
  );
};

export default RichTooltip;
