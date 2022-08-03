import { useRef, useState,useContext } from "react";
import styled from "styled-components";
import {
  Tag,
  Space,
  Badge,
  Button,
  Divider,
  Collapse,
} from "@arco-design/web-react";
import { IconArrowRight,IconDelete } from "@arco-design/web-react/icon";
import "@arco-design/web-react/dist/css/arco.css";
import { ContentContext } from "../context-manager";

const CollapseItem = Collapse.Item;

const redPointImgSrc =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI0U1MzQzNCIvPgo8L3N2Zz4K";
const typeCNNames: { [key: string]: string } = {
  AllCount: "全部建议",
  Misspelling: "拼写错误",
  SyntaxError: "语法错误",
  FormatError: "格式错误",
};
interface childProps {
  title: string;
  todo: string;
  replacement: string;
  position: number[][];
  setUnFoldItem: any;
  setDoReplaceProps: any;
  setListSelectedItem: any;
}

const StyledDetailInfo = styled.div``;

const Item: React.FC<childProps> = (props) => {
  const {
    title,
    todo,
    replacement,
    position,
    setUnFoldItem,
    setDoReplaceProps,
    setListSelectedItem,
  } = props;
  const context = useContext(ContentContext)
  const showDetail = (e: React.MouseEvent<Element, MouseEvent>): void => {
    // const item = e.currentTarget;
    // item.classList.add('unfold')
    setUnFoldItem(position.join("-"));
    const curDom = document.getElementById(position.join("-"));
    setListSelectedItem([...position, curDom?.getBoundingClientRect().top]);
  };
  const doReplace = (): void => {
    setDoReplaceProps([position, replacement]);
  };
  const deleteSuggest = ():void => {
    let tmpContent:any = context.content
    tmpContent = tmpContent.filter((item: { position: any[]; }) => {return item.position.join('-')!=position.join('-')})
    context.setContent(tmpContent)
  }
  return (
    <>
      <div
        id={position.join("-")}
        className="suggest-list-item"
        onClick={(e) => showDetail(e)}
      >
        <div className="suggest-list-item-todo">
          <img
            src={redPointImgSrc}
            style={{ display: "inline-block", marginRight: "0.5rem" }}
          ></img>
          <Tag color="gray" size="medium">
            {typeCNNames[todo]}
          </Tag>
        </div>
        <div className="suggest-list-item-title">
          {/* fold状态出现 */}
          <img
            src={redPointImgSrc}
            style={{ display: "inline-block", marginRight: "0.5rem" }}
          ></img>
          {title}
          <span className="suggest-list-item-title-todo">
            {typeCNNames[todo]}
          </span>

          {/* unfold状态显示 */}
          <span className="suggest-list-item-title-replacement">
            <IconArrowRight style={{ margin: "0 1rem" }} />
            <Button shape="round" type="primary" onClick={() => doReplace()}>
              {replacement}
            </Button>
          </span>
        </div>
        <div className="suggest-list-item-replace">{`建议把${title}改成${replacement}。`}</div>
        <Divider />
        <div className="suggest-list-item-detail">
        <IconDelete onClick={() => deleteSuggest()}/>
        </div>
      </div>
    </>
  );
};

export default Item;
