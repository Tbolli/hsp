function RefeshBtn(props) {
  const customBtnSyle ={
    height: "50px",
    margin: "20px 60px 10px 60px"
  } 

  const customDivSyle ={
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
    textAlign: "center"
  } 

  return (
    <div style={customDivSyle}>
      <button style={customBtnSyle} className="btn btn-primary" onClick={props.clickBtn}>
        <h4 style={{margin:"0"}}>Refresh Prices</h4>
      </button>
      <p><b>N.B.</b> RateLimit: 60 min (50 000 month)</p>
    </div>
    
  );
}
export default RefeshBtn;
