function App(props) {
  return (
      <div className="card" style={{width: "18rem", textAlign:"center"}}>
        <img className="card-img-top" src={props.img} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">{props.product.Name}</h5>
          <b>{props.product.CoinsPerHour/1_000_000}m/h</b>
          <p style={{margin:"0"}}>Buy Order: {props.product.BuyOrder}</p>
          <p>Sell Order: {props.product.SellOrder}</p>
        </div>
      </div>
  );
}

export default App;
