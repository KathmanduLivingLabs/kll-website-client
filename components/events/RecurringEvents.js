import { uid } from "react-uid";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  recurringEventsContainer: {
    padding: theme.spacing(6),
    background: "#F3F6FD",
    borderRadius: 8,
    position: "sticky",
    top: "100px",
    [theme.breakpoints.down("sm")]: {
      position: "static",
    },
  },
  iconFill: {
    position: "relative",
    width: 80,
    height: 80,
  },
  recurringTitle: {
    marginTop: theme.spacing(4),
    lineHeight: 1.6,
    width: 224,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(3),
      fontSize: "1rem",
      lineHeight: 1.5556,
    },
  },
  recurringDescription: {
    color: theme.palette.grey[800],
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  divider: {
    background: "#A3BDF1",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
  },
  recurringLinks: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    "& div": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& p": {
        fontWeight: 500,
      },
    },
    [theme.breakpoints.down("xs")]: {
      gap: theme.spacing(6),
    },
  },
  linksTypo: {
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8889rem",
      lineHeight: 1,
    },
  },
  arrowIcon: {
    fontSize: "18px",
    color: theme.palette.primary.main,
    lineHeight: 1,
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  linkCtr: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

function RecurringEvents({ recurringEvents }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.recurringEventsContainer}>
        <div className={classes.iconFill}>
          <Image
            src="/icons/calendar.svg"
            layout="fill"
            objectFit="cover"
            sizes="80px"
            alt="calender"
          />
        </div>
        <Typography variant="h6" className={classes.recurringTitle}>
          Recurring Events at Kathmandu Living Labs
        </Typography>
        <Typography variant="body1" className={classes.recurringDescription}>
          {`Every month, we organize select recurring events for the Mapping Community. You’re welcome to join us during our monthly events to get in touch with us and contribute to the Open Mapping Community.`}
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.recurringLinks}>
          {recurringEvents.map((event) => (
            <Link key={uid(event)} href={`/events/${event.slug}`} passHref>
              <div className={classes.linkCtr}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.linksTypo}
                >
                  {event.title}
                </Typography>{" "}
                <i className={clsx("ri-arrow-right-line", classes.arrowIcon)} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecurringEvents;
