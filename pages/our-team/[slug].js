import { useRouter } from "next/router";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/styles";
import { Typography, IconButton } from "@material-ui/core";
import fetch from "isomorphic-unfetch";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 80px)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
      height: "auto",
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "inherit",
    [theme.breakpoints.down("xs")]: {
      height: "104vw",
    },
  },
  navArrowsCtr: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "42%",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
    paddingBottom: theme.spacing(10),
  },
  arrows: {
    height: "100%",
    display: "flex",
    gap: "30px",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  navArrorIcon: {
    fontSize: "24px",
  },
  iconBtnRoot: {
    padding: "18px",
    background: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  goBackCtr: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  gobackTitle: {
    fontWeight: 500,
    lineHeight: 1,
    color: theme.palette.grey[700],
  },
  btnArrowIcon: {
    fontSize: "24px",
    color: "#fff",
    lineHeight: 1,
  },
  bioCtr: {
    padding: theme.spacing(12, 15),
    [theme.breakpoints.down("xs")]: {
      padding: "24px 16px",
    },
  },
  name: {
    fontFamily: "Inter",
    fontWeight: 600,
    lineHeight: 1.25,
    color: theme.palette.grey[900],
    marginTop: "7vh",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.333rem",
      lineHeight: 1.333,
      marginTop: theme.spacing(6),
    },
  },
  position: {
    fontSize: "1.333rem",
    fontWeight: 400,
    lineHeight: 1,
    color: theme.palette.grey[600],
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      lineHeight: 1.5556,
      marginTop: 0,
    },
  },
  bio: {
    maxWidth: 660,
    // display: "flex",
    // flexDirection: "column",
    marginTop: theme.spacing(10),
    maxHeight: "calc(100vh - 520px)",
    overflow: "auto",
    marginBottom: theme.spacing(12),
    "&::-webkit-scrollbar": {
      width: "8px",
      paddingLeft: "16px",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      borderRadius: "23px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[300],
      borderRadius: "23px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(8),
      maxHeight: "100%",
    },
  },
  para: {
    fontWeight: 400,
    lineHeight: "28px",
    color: theme.palette.grey[900],
    marginBottom: "1em",
    [theme.breakpoints.down("xs")]: {
      lineHeight: 1.5,
    },
  },
  socialLinks: {
    // marginTop: "52.92px",
    display: "flex",
    gap: theme.spacing(6),
    // position: 'absolute',
    bottom: "82px",
  },
  socialIcon: {
    fontSize: "32px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  osmLogo: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  transparentButton: {
    background: "transparent",
  },
}));

function MarkdownParagraph(props) {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.para}>
      {props.children}
    </Typography>
  );
}

const renderers = {
  paragraph: MarkdownParagraph,
};

function MemberDetail({ allMembers, memberDetail }) {
  const router = useRouter();
  const classes = useStyles();

  const { slug, name, position, bio, image, twitter, openStreetMap, linkedIn } =
    memberDetail;

  const arrayPosition = allMembers.map((e) => e.slug).indexOf(slug);

  const previousMemberSlug =
    allMembers[arrayPosition - 1] && allMembers[arrayPosition - 1].slug;

  const nextMemberSlug =
    allMembers[arrayPosition + 1] && allMembers[arrayPosition + 1].slug;

  return (
    <>
      <Head>
        <title>{name} | Our Team | Kathmandu Living Labs</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.imageContainer}>
          <Image
            priority
            src={image.url}
            layout="fill"
            objectFit="cover"
            alt={`photo of ${name}`}
            sizes="50vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkMHtZDwAC/QGgRXmBqQAAAABJRU5ErkJggg=="
          />
          <div className={classes.navArrowsCtr}>
            <div className={classes.arrows}>
              <IconButton
                aria-label="delete"
                classes={{ root: classes.iconBtnRoot }}
                disabled={arrayPosition === 0}
                onClick={() =>
                  router.push(previousMemberSlug && previousMemberSlug)
                }
              >
                <i
                  className={clsx("ri-arrow-left-line", classes.btnArrowIcon)}
                />
              </IconButton>
              <IconButton
                aria-label="delete"
                disabled={arrayPosition === allMembers.length - 1}
                classes={{ root: classes.iconBtnRoot }}
                onClick={() => router.push(nextMemberSlug)}
              >
                <i
                  className={clsx("ri-arrow-right-line", classes.btnArrowIcon)}
                />
              </IconButton>
            </div>
          </div>
        </div>
        <div className={classes.bioCtr}>
          <Link href="/our-team">
            <a className={classes.goBackCtr}>
              <i className="ri-arrow-left-line" style={{ fontSize: "18px" }} />
              <Typography variant="body1" className={classes.gobackTitle}>
                Go Back to All Team Members
              </Typography>
            </a>
          </Link>
          <Typography variant="h2" className={classes.name}>
            {name}
          </Typography>
          <Typography className={classes.position}>{position}</Typography>
          <div className={classes.bio}>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={bio} renderers={renderers} />
          </div>
          <div className={classes.socialLinks}>
            {twitter && (
              <i
                className={clsx("ri-twitter-fill", classes.socialIcon)}
                style={{ color: "#1DA1F2" }}
                onClick={() => window.open(twitter)}
              />
            )}
            {openStreetMap && (
              <Image
                className={classes.osmLogo}
                src="/icons/osm-logo.png"
                height={32}
                width={32}
                onClick={() => window.open(openStreetMap)}
                alt="OpenStreetMap logo"
              />
            )}
            {linkedIn && (
              <i
                className={clsx("ri-linkedin-fill", classes.socialIcon)}
                style={{ color: "#0077B5" }}
                onClick={() => window.open(linkedIn)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/members`);
  const members = await res.json();

  const paths = members.map((member) => ({
    params: { slug: member.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { API_URL } = process.env;

  const response = await fetch(`${API_URL}/members?slug=${params.slug}`);
  const memberDetail = await response.json();

  const allMembersResponse = await fetch(
    `${API_URL}/members?_sort=name:ASC&isAlumnus=false`
  );
  const allMembers = await allMembersResponse.json();

  return {
    props: {
      memberDetail: memberDetail[0],
      allMembers,
    },
    revalidate: 86400,
  };
}

export default MemberDetail;
