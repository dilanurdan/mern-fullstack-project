function Footer() {
  return (
    <footer style={styles.footer}>
     <p>© {new Date().getFullYear()} Rumeli | BLG330 Web Programlama Dönem Projesi</p> 
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f3f4f6",
    color: "#333",
  },
};

export default Footer;
