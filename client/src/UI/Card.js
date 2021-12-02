import "./Card.css";

const Card = (props) => {
  const cardClass = "card " + props.className;
  return (
    <div className={cardClass} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;
