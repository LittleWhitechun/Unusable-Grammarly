import "./App.css";
import SuggestList from "./components/SuggestList";
import MyTextArea from "./components/TextArea";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

interface todoItem {
  position: number[][];
  title: string;
  todo: string;
  replacement: string;
}
const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 50px;
  background-image: linear-gradient( 135deg, #736EFE 10%, #5EFCE8 100%);
  height: 100vh;
`;

function App() {
  const [content, setContent] = useState<todoItem[]>([]);
  const [unfoldItem, setUnFoldItem] = useState("");
  const [doReplaceProps, setDoReplaceProps] = useState([]);
  const [listSelectedItem,setListSelectedItem] = useState([])
  useEffect(() => {
    // console.log('content:',content)
  }, [content]);

  useEffect(() => {
    const selectedDom = document.getElementById(unfoldItem);
    if (selectedDom) {
      const listDom = document.getElementsByClassName("suggest-list")[0];
      Array.from(listDom.children).forEach((item) => {
        item.classList.remove("unfold");
      });
      selectedDom.classList.add("unfold");
    }
  }, [unfoldItem]);

  useEffect(() => {
    // console.log('reaplce:',doReplaceProps)
  }, [doReplaceProps]);
  return (
    <>
      <StyledApp>
        <MyTextArea
          setContent={setContent}
          setUnFoldItem={setUnFoldItem}
          doReplaceProps={doReplaceProps}
          listSelectedItem = {listSelectedItem}
        ></MyTextArea>
        <SuggestList
          content={content}
          setUnFoldItem={setUnFoldItem}
          setDoReplaceProps={setDoReplaceProps}
          setListSelectedItem = {setListSelectedItem}
        ></SuggestList>
      </StyledApp>
    </>
  );
}

export default App;
