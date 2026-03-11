import "./KnowledgeItem.css";

const KnowledgeItem = ({ item }) => {

  return (
    <div className="box">
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="knowledge-item"
      >
        <div className="knowledge-content">
          <h2>{item.title}</h2>
          <span className="knowledge-btn">
            Thực hành tổng hợp →
          </span>
        </div>
        <div className="knowledge-thumb">
          <img src={item.imageUrl} alt={item.title} />
        </div>



      </a>
    </div >
  );

};

export default KnowledgeItem;