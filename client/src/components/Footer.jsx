function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        © {new Date().getFullYear()} RumeliLearn | MERN Stack Web Application
      </p>
      <span style={styles.text}>
        Developed for BLG330 Web Programming Course
      </span>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "24px",
    textAlign: "center",
    backgroundColor: "#f3f4f6",
    color: "#333",
    borderTop: "1px solid #d1d5db",
  },

  text: {
    fontSize: "14px",
    color: "#6b7280",
  },
};

export default Footer;