export const styles = {
  image: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",

    "> img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
    },
  },
  textContainer: {
    position: "absolute",
    zIndex: "2",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    lineHeight: "1.1",
    width: "80%",

    "@media screen and (min-width: 760px)": {
      width: "50%",
      maxWidth: "800px",
    },
  },
  overlay: {
    content: '" "',
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: "1",
  },
  subtitle: {
    color: "#77A3FD",
  },
  logoContainer: {
    width: "50px",
    height: "50px",
    zIndex: "2",
    position: "relative",
    padding: "25px",
  },
  button: {
    color: "white",
    border: "1px solid white",
    padding: "12px 16px",
  },
};
