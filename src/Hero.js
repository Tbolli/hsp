function App(props) {
  return (
    <div className={"contianer"}>
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold">{props.Name} ({props.product.CoinsPerHour/1_000_000}m/h)</h1>
        <div className="overflow-hidden" style={{maxheight: "30vh"}}>
          <div className="container px-5">
            <img src={props.img} className="img-fluid" alt="Example image" width="300" loading="lazy"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
