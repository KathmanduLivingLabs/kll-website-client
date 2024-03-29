import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button, Hidden } from "@material-ui/core";
import ProjectsGrid from "components/our-work/ProjectsGrid";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(30),
    paddingBottom: theme.spacing(30),
    background: theme.palette.grey[900],
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
  },
  title: {
    color: theme.palette.grey[50],
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.111rem",
      lineHeight: 1.6,
      marginBottom: theme.spacing(2),
    },
  },
  descCtr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: theme.spacing(15),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(8),
    },
  },
  description: {
    fontFamily: "Inter",
    lineHeight: 1.6,
    fontWeight: 400,
    color: theme.palette.grey[300],
    width: 633,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7778rem",
      lineHeight: 1.428,
    },
  },
  btnRoot: {
    padding: "14px 32px",
  },
  btnLabel: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    color: theme.palette.grey[300],
  },
  mobileBtnCtr: {
    textAlign: "center",
    marginTop: theme.spacing(8),
  },
}));

const Partners = ({ projects, data }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container fixed>
        <Typography variant="h3" className={classes.title}>
          {data.title}
        </Typography>
        <div className={classes.descCtr}>
          <Typography variant="h6" className={classes.description}>
            {data.description}
          </Typography>
          <Hidden smDown>
            <Button
              variant="outlined"
              classes={{ root: classes.btnRoot, label: classes.btnLabel }}
              onClick={() => router.push("/our-work")}
            >
              {`View More`}
            </Button>
          </Hidden>
        </div>
        <ProjectsGrid projects={projects} />
        <Hidden mdUp>
          <div className={classes.mobileBtnCtr}>
            <Button
              variant="outlined"
              classes={{ root: classes.btnRoot, label: classes.btnLabel }}
              onClick={() => router.push("/our-work")}
            >
              {`Check Out All Our Work`}
            </Button>
          </div>
        </Hidden>
      </Container>
    </div>
  );
};

export default Partners;
