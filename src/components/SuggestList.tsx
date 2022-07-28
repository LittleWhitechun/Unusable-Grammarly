import React, { useEffect, useState } from "react";
import SuggestListItem from "./SuggestListItem";
import styled from "styled-components";

interface todoItem {
  position: number[][];
  title: string;
  todo: string;
  replacement:string;
}
const StyledSuggestList = styled.div`
  width: 450px;
  padding: 0 15px;
  overflow: auto;
  height: 450px;
  border-radius: 5px;
  margin-top: 10px;
`;
const SuggestList = (props: { content: todoItem[],setUnFoldItem:any,setDoReplaceProps:any,setListSelectedItem:any }) => {
  const { content,setUnFoldItem,setDoReplaceProps,setListSelectedItem } = props;
  useEffect(() => {
    // console.log("List:", todos);
  }, [content]);
  return (
    <>
      <StyledSuggestList className="suggest-list">
        {content.map((item, idx) => {
          return (
            <SuggestListItem
              title={item.title}
              todo={item.todo}
              replacement={item.replacement}
              position={item.position}
              setUnFoldItem = {setUnFoldItem}
              setDoReplaceProps = {setDoReplaceProps}
              setListSelectedItem = {setListSelectedItem}
            ></SuggestListItem>
          );
        })}
      </StyledSuggestList>
    </>
  );
};

export default SuggestList;
