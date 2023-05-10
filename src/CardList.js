import Card from './Card'

function CardList(props) {
  return (
    <>
    <div className="contianer row" style={{display: "flex", gap:"30px", justifyContent :"center"}} >
      
      {props.products.length >= 1 && props.products.map((product)=>{
        return(
          <Card key={product.Id} product={product} img={props.productImages[product.Id]}/> 
        )
      })}
    </div>
    </>
  );
}

export default CardList;
