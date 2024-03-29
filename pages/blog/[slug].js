import Head from "next/head";
import { BlogJsonLd } from "next-seo";
import moment from "moment";
import { uid } from "react-uid";
import clsx from "clsx";
import fetch from "isomorphic-unfetch";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import {
  Typography,
  Divider,
  Avatar,
  Container,
  Hidden,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@material-ui/core";
import BlogListCard from "components/blog/BlogListCard";
import Tags from "components/blog/Tags";
import Share from "components/blog/Share";
import { tablet } from "../../styles/theme";
import AuthorAvatar from "../../components/blog/AuthorAvatar";

const useStyles = makeStyles((theme) => ({
  blog: {
    position: "relative",
    margin: "auto",
    marginTop: theme.spacing(8),
    maxWidth: "800px",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(4),
      paddingBottom: theme.spacing(10),
    },
  },
  share: {
    position: "absolute",
    bottom: "30%",
    left: "-137px",
    transform: "translateX(-100%)",
  },
  shareMobileView: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerImageContainer: {
    position: "relative",
    width: "100%",
    height: "66vh",
    [theme.breakpoints.down("xs")]: {
      height: "64vw",
    },
  },
  headerImageOverlay: {
    position: "absolute",
    background: "linear-gradient(180deg, #0D1829 0%, rgba(13, 24, 41, 0) 100%)",
    transform: "matrix(1, 0, 0, -1, 0, 0)",
    bottom: 0,
    padding: theme.spacing(10),
    width: "100%",
    height: "40%",
  },
  timestamp: {
    display: "flex",
    gap: theme.spacing(8),
    marginBottom: theme.spacing(3),
    color: theme.palette.grey[700],
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
      "& h6": {
        fontSize: "14px",
      },
    },
  },
  author: {
    display: "flex",
    gap: theme.spacing(3),
    marginTop: theme.spacing(5),
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(3),
    },
  },
  avatar: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[700],
  },
  guestAvatar: {
    fontSize: "20px",
    lineHeight: 1,
  },
  content: {
    // display: "flex",
    // flexDirection: "column",
    // gap: theme.spacing(6),
    "& ol": {
      paddingLeft: "1.5rem",
    },
    "& ul": {
      paddingLeft: "1.5rem",
      lineHeight: "32px",
    },
  },
  authorDetails: {
    display: "flex",
    flexDirection: "column",
  },
  authorName: {
    fontWeight: 500,
    color: "#304254",
    lineHeight: "1rem",
    marginBottom: theme.spacing(1),
  },
  authorTitle: {
    lineHeight: 1,
    fontWeight: 400,
    color: "#445668",
  },
  content: {
    marginTop: theme.spacing(8),
    // display: "flex",
    // flexDirection: "column",
    // gap: theme.spacing(6),
    "& ol": {
      paddingLeft: "1.5rem",
    },
    "& ul": {
      paddingLeft: "1.5rem",
    },
  },
  photoTitle: {
    lineHeight: "1rem",
    marginTop: theme.spacing(6),
  },
  imageFill: {
    position: "relative",
    width: "100vw",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      "& div": {
        position: "unset !important",
      },
    },
  },
  image: {
    objectFit: "cover",
    width: "100vw important",
    position: "relative !important",
    height: "unset !important",
  },
  heroImageFill: {
    marginTop: theme.spacing(10),
    position: "relative",
    width: "100%",
    height: "100%",
    width: "100%",
    "& div": {
      position: "unset !important",
    },
  },
  heroImage: {
    objectFit: "cover",
    width: "100% important",
    position: "relative !important",
    height: "unset !important",
  },
  // imageHeroes: {
  //   marginTop: theme.spacing(10),
  //   position: "relative",
  //   width: "100%",
  //   height: 396,
  // },
  // imageFullWidth: {
  //   width: "100vw",
  //   height: 700,
  //   marginLeft: "calc(-50vw + 49%)",
  //   overflowX: "hidden",
  //   marginTop: theme.spacing(12.5),
  // },
  divider: {
    marginTop: theme.spacing(12.5),
    marginBottom: theme.spacing(10),
    backgroundColor: "#CAD5E0",
    height: "1px",
  },
  footerMargin: {
    marginBottom: theme.spacing(3),
  },
  relatedPostsBgCtr: {
    background: theme.palette.grey[100],
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(20),
    marginTop: theme.spacing(15),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      marginTop: theme.spacing(10),
    },
  },
  relatedPostsBg: {
    margin: "auto",
    marginTop: "1.78rem",
    maxWidth: "800px",
  },
  positioned: {
    position: "relative",
    background: "#0cf",
    marginTop: "-1.6rem",
    zIndex: 100,
  },
  // relatedImage: {
  //   background: "url('../../public/image3.png')",
  //   height: 200,
  //   width: 200,
  // },
  relatedBlogs: {
    display: "flex",
    gap: "1.11rem",
  },
  headerImgFill: {
    position: "relative",
  },
  readMoreBlogsTitle: {
    fontSize: "32px",
    fontWeight: 600,
    lineHeight: "32px",
    color: theme.palette.grey[800],
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      lineHeight: 1.5556,
    },
  },
  blogListContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "15px",
    rowGap: theme.spacing(12),
    marginTop: theme.spacing(8),
    [theme.breakpoints.down(tablet)]: {
      gridTemplateColumns: "1fr",
      rowGap: theme.spacing(8),
      marginTop: theme.spacing(4),
    },
  },
  authorBio: {
    lineHeight: 1.5,
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down("xs")]: {
      lineHeight: 1.428,
      marginBottom: theme.spacing(3),
    },
  },
  paragraph: {
    marginBottom: "1rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.7778rem",
    },
  },
  markdownImageFill: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    position: "relative",
    width: "100%",
    height: "100%",
    "& div": {
      position: "unset !important",
    },
  },
  markdownImage: {
    objectFit: "cover",
    width: "100% important",
    position: "relative !important",
    height: "unset !important",
  },
  header: {
    fontWeight: 700,
    lineHeight: 1.55,
    color: theme.palette.grey[800],
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(8),
    },
  },
}));

function MarkdownParagraph(props) {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.paragraph}>
      {props.children}
    </Typography>
  );
}

const MarkdownHeading = ({ ...props }) => {
  const classes = useStyles();

  let variant;
  switch (props.level) {
    case 1:
      variant = "h5";
      break;
    case 2:
      variant = "h6";
      break;
    case 3:
      variant = "subtitle1";
      break;
    case 4:
      variant = "subtitle2";
      break;
    default:
      variant = "h5";
      break;
  }

  return (
    <Typography className={classes.header} gutterBottom variant={variant}>
      {props.children}
    </Typography>
  );
};

const MarkdownListItem = (props) => {
  const classes = useStyles();

  return (
    <li className={classes.listItem}>
      <Typography variant="body1" component="span">
        {props.children}
      </Typography>
    </li>
  );
};

function MarkdownTable(props) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" aria-label="a dense table">
        {props.children}
      </Table>
    </TableContainer>
  );
}

function MarkdownTableCell(props) {
  return (
    <TableCell>
      <Typography>{props.children}</Typography>
    </TableCell>
  );
}

function MarkdownTableRow(props) {
  return <TableRow>{props.children}</TableRow>;
}

function MarkdownTableBody(props) {
  return <TableBody>{props.children}</TableBody>;
}

function MarkdownTableHead(props) {
  return <TableHead>{props.children}</TableHead>;
}

function MarkdownImage(props) {
  const classes = useStyles();
  return (
    <div className={classes.markdownImageFill}>
      <Image
        className={classes.markdownImage}
        src={props.src}
        layout="fill"
        objectFit="cover"
        alt={props.alt}
        sizes="800px"
      />
    </div>
  );
}

const renderers = {
  heading: MarkdownHeading,
  paragraph: MarkdownParagraph,
  link: Link,
  listItem: MarkdownListItem,
  image: MarkdownImage,
  table: MarkdownTable,
  tableHead: MarkdownTableHead,
  tableBody: MarkdownTableBody,
  tableRow: MarkdownTableRow,
  tableCell: MarkdownTableCell,
};

function BlogDetail({ blog, relatedBlogs }) {
  const classes = useStyles();

  const guest = {
    name: "John Doe",
    description: "this is a description",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis nibh nec orci fringilla, eu euismod orci fringilla. Nam bibendum finibus augue, ut gravida lectus tincidunt at. Nulla diam enim, sodales quis nulla eget, blandit venenatis nibh. Aliquam erat volutpat. Nam at elit est. Etiam dignissim metus velit, et convallis magna vulputate sed. Proin in imperdiet dolor, in rutrum neque. Morbi neque libero, sollicitudin lacinia placerat et, tincidunt vel ipsum. Nulla molestie laoreet mauris ac accumsan. Donec finibus ante vel ligula consectetur vulputate. ",
  };

  return (
    <>
      <Head>
        <title>{`${blog.title} | Blog | Kathmandu Living Labs`}</title>
      </Head>
      {/* <BlogJsonLd
        url="https://kathmandulivinglabs.org/blog"
        title={blog.title}
        images={[blog.coverPhoto?.url]}
        dateModified={blog.created_at}
        datePublished={blog.published_at}
        authorName={blog.member.name}
        keywords={blog.tags.map((tag) => tag.name).join(", ")}
      /> */}
      {blog.coverPhoto && (
        <div className={classes.headerImageContainer}>
          <Image
            priority
            className={classes.headerImage}
            src={blog.coverPhoto.url}
            layout="fill"
            objectFit="cover"
            alt="Picture of the author"
          />
          <div className={classes.headerImageOverlay} />
        </div>
      )}
      <Container fixed>
        <div className={classes.blog}>
          <div className={classes.timestamp}>
            <Typography variant="subtitle2">
              {moment(blog.updated_at).format("ll")}
            </Typography>
            <Typography variant="subtitle2">
              {Math.ceil(blog.content.split(" ").length / 200)} min read
            </Typography>
          </div>
          <Typography variant="h4">{blog.title}</Typography>
          {(blog.member || blog.guestAuthor) && (
            <AuthorAvatar
              member={blog.member}
              guestAuthor={blog.guestAuthor}
              showAuthorBio={false}
            />
          )}
          <div className={classes.content}>
            {/* eslint-disable react/no-children-prop */}
            <ReactMarkdown
              children={blog.content}
              escapeHtml={false}
              renderers={renderers}
            />
          </div>
          <Divider classes={{ root: classes.divider }} />
          <div className={clsx(classes.author, classes.footerMargin)}>
            <Avatar>
              <Image
                src={
                  blog.member.avatarImage
                    ? blog.member.avatarImage.url
                    : blog.member.image.url
                }
                layout="fill"
                alt="DP"
                sizes="40px"
                objectFit="cover"
              />
            </Avatar>
            <div className={classes.authorDetails}>
              <Typography variant="subtitle1" className={classes.authorName}>
                {blog.member.name}
              </Typography>
              <Typography variant="subtitle2" className={classes.authorTitle}>
                {blog.member.position}
              </Typography>
            </div>
          </div>
          <Typography variant="subtitle1" className={classes.authorBio}>
            {blog.member.bio.split("\n\n")[0]}
          </Typography>
          {blog.tags.length > 0 && <Tags tags={blog.tags} />}
          <Hidden smUp>
            <div className={classes.shareMobileView}>
              <Share />
            </div>
          </Hidden>
          <Hidden smDown>
            <div className={classes.share}>
              <Share />
            </div>
          </Hidden>
        </div>
      </Container>

      <div className={classes.relatedPostsBgCtr}>
        <Container fixed>
          <Typography className={classes.readMoreBlogsTitle}>
            Read More from our Blog
          </Typography>
          <div className={classes.blogListContainer}>
            {relatedBlogs.map((blog) => (
              <BlogListCard key={uid(blog)} blog={blog} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

// export async function getStaticPaths() {
//   const { API_URL } = process.env;
//   const res = await fetch(`${API_URL}/blogs`);
//   const blogs = await res.json();

//   const paths = blogs.map((project) => ({
//     params: { slug: project.slug },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/blogs?slug=${params.slug}`);
  const blog = await res.json();

  const relatedBlogsRes = await fetch(
    `${API_URL}/blogs?category_eq=${blog[0].category}&slug_ne=${params.slug}&_limit=3&_sort=created_at:desc`
  );
  const relatedBlogs = await relatedBlogsRes.json();

  return {
    props: {
      blog: blog[0],
      relatedBlogs,
    },
  };
}

export default BlogDetail;
