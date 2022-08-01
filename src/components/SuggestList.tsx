import React, { createRef, useEffect, useState } from "react";
import SuggestListItem from "./SuggestListItem";
import styled from "styled-components";
import { create } from "domain";

const Errors = ["Misspelling", "SyntaxError", "FormatError"];

interface todoItem {
  position: number[][];
  title: string;
  todo: string;
  replacement: string;
}
const StyledSuggestList = styled.div`
  width: 450px;
  padding: 0 15px;
  overflow: auto;
  height: 450px;
  border-radius: 5px;
  margin-top: 10px;
`;

const StyledSuggestTypesList = styled.div`
  padding: 0 15px;
  height: 450px;
  border-radius: 5px;
  margin-top: 10px;
`;

const StyledSuggestTypesListItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 12px;
  color: #000000c7;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
  user-select: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const StyledSuggestTypesListItemCount = styled.span`
  // mix-blend-mode: difference;
  border-radius: 5px;
  margin-left: 5px;
  padding: 0 7.5px;
  color: black;
  background-color: #93bcff;
`;

const StyledNoSuggestFill = styled.div`
  text-align: center;
  line-height: 100px;
  font-family: fantasy;
  color: white;
  font-size: 30px;
`;
const SuggestList = (props: {
  content: todoItem[];
  setUnFoldItem: any;
  setDoReplaceProps: any;
  setListSelectedItem: any;
}) => {
  const { content, setUnFoldItem, setDoReplaceProps, setListSelectedItem } =
    props;
  const [suggestTypesCount, setSuggestTypesCount] = useState<{
    [key: string]: number;
  }>({
    AllCount: 0,
    Misspelling: 0,
    SyntaxError: 0,
    FormatError: 0,
  });
  const [showContent, setShowContent] = useState<todoItem[]>([]);
  const [curType, setCurType] = useState<string>("AllCount");

  const getShowContent = (type: string) => {
    if (type == "AllCount") {
      return content;
    } else {
      return content.filter((item) => item.todo == type);
    }
  };

  useEffect(() => {
    // 设置各类type数量 content改变时重新渲染
    const tmpSuggestTypesCount = suggestTypesCount;
    Object.keys(tmpSuggestTypesCount).forEach((type) => {
      tmpSuggestTypesCount[type] = content.filter(
        (item) => item.todo == type
      ).length;
    });
    tmpSuggestTypesCount.AllCount = eval(
      Object.values(tmpSuggestTypesCount).join("+")
    );
    setSuggestTypesCount(tmpSuggestTypesCount);
    setShowContent(getShowContent(curType));
  }, [content]);

  useEffect(() => {
    setShowContent(getShowContent(curType));
  }, [curType]);

  return (
    <>
      <StyledSuggestList className="suggest-list">
        {showContent.length != 0 ? (
          showContent.map((item, idx) => {
            return (
              <SuggestListItem
                title={item.title}
                todo={item.todo}
                replacement={item.replacement}
                position={item.position}
                setUnFoldItem={setUnFoldItem}
                setDoReplaceProps={setDoReplaceProps}
                setListSelectedItem={setListSelectedItem}
              ></SuggestListItem>
            );
          })
        ) : (
          <>
            <StyledNoSuggestFill>No Suggest.....</StyledNoSuggestFill>
          </>
        )}
      </StyledSuggestList>
      <StyledSuggestTypesList>
        {Object.keys(suggestTypesCount).map((type) => {
          return (
            <StyledSuggestTypesListItem
              onClick={() => setCurType(type)}
              className={type == curType ? "active" : ""}
            >
              {type}
              <StyledSuggestTypesListItemCount>
                {suggestTypesCount[type]}
              </StyledSuggestTypesListItemCount>
            </StyledSuggestTypesListItem>
          );
        })}
      </StyledSuggestTypesList>
    </>
  );
};

export default SuggestList;
