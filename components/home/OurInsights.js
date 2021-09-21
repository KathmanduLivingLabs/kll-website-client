import { useRouter } from "next/router";
import clsx from "clsx";
import { uid } from "react-uid";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button } from "@material-ui/core";
import BlogListCard from "components/BlogListCard";
import BlogBackground from "../../public/blog-bg.png";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundImage: "url('/blog-bg.png')",
      mixBlendMode: "luminosity",
      opacity: 0.8,
    },
  },
  title: {
    fontFamily: "Manrope",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "14px",
    letterSpacing: "0.12em",
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontFamily: "Manrope",
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "40px",
    letterSpacing: "0em",
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(12),
  },
  blogListContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnRoot: {
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: "translate(0%, 50%)",
    padding: '14px 32px'
  },
}));

const Partners = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Container maxWidth="lg">
          <Typography
            align="center"
            variant="subtitle2"
            className={classes.title}
          >{`BLOG`}</Typography>
          <Typography
            align="center"
            variant="h4"
            className={classes.subtitle}
          >{`Our Insights`}</Typography>
          <div className={classes.blogListContainer}>
            {["", "", ""].map((blog) => (
              <BlogListCard key={uid(blog)} />
            ))}
          </div>
        </Container>

        <Button variant="outlined" classes={{ root: classes.btnRoot }} onClick={() => router.push('/blog')}>
          More at our blog{" "}
        </Button>
      </div>
    </>
  );
};

export default Partners;