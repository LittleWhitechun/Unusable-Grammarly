import { useRef, useState } from "react";
import styled from "styled-components";
import { Tag, Space } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";


// const StyledItem = styled.div`
//   height: 22px;
//   max-height: 100px;
//   line-height: 22px;
//   font-size: 20px;
//   margin-bottom: 5px;
//   transition: all 0.35s ease;
//   will-change: height;
//   transform: translateY(0px);
//   padding: 14px 10px;
//   background-color: rgba(255, 255, 255, 0.3);
// `;
// const StyledItemLine = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

interface childProps {
  title: string;
  todo: string;
  replacement:string;
  position: number[][];
  setUnFoldItem: any;
  setDoReplaceProps:any;
  setListSelectedItem:any;
}

const Item: React.FC<childProps> = (props) => {
  const { title, todo, replacement, position, setUnFoldItem,setDoReplaceProps,setListSelectedItem } = props;
  const [content, setContent] = useState([title]);
  const showDetail = (e: React.MouseEvent<Element, MouseEvent>): void => {
    // const item = e.currentTarget;
    // item.classList.add('unfold')
    setUnFoldItem(position.join("-"));
    const curDom = document.getElementById(position.join("-"))
    setListSelectedItem([...position,curDom?.getBoundingClientRect().top])
  };
  const doReplace = ():void => {
    setDoReplaceProps([position,replacement])
  }
  return (
    <>
      <div
        onClick={(e) => showDetail(e)}
        id={position.join("-")}
        className="suggest-list-item"
      >
        <div className="suggest-list-item-todo">
          <Tag color="gray" size="medium">
            {todo}
          </Tag>
        </div>
        <div className="suggest-list-item-title">{title} <span>{todo}</span></div>
        <div className="suggest-list-item-replace" onClick={() => doReplace()}>{`Please change it into ${replacement}`}</div>
      </div>
    </>
  );
};

export default Item;
