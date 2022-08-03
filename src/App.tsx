import "./App.css";
import SuggestList from "./components/SuggestList";
import MyTextArea from "./components/TextArea";
import styled from "styled-components";
import { createContext, useEffect, useRef, useState } from "react";
import { ContentContext } from './context-manager';

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
  /* background-image: linear-gradient( 135deg, #736EFE 10%, #5EFCE8 100%); */
  background-color: white;
  height: 100vh;
  min-width:1000px;
`;

function App() {
  const [content, setContent] = useState<todoItem[]>([]);
  const [allContent,setAllContent] = useState<string>('')
  const [unfoldItem, setUnFoldItem] = useState("");
  const [doReplaceProps, setDoReplaceProps] = useState([]);
  const [listSelectedItem, setListSelectedItem] = useState([]);
  useEffect(() => {
    // console.log('app content:',content)
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
      <ContentContext.Provider value={{ allContent:allContent,content:content ,setContent:setContent}}>
        <StyledApp>
          <MyTextArea
            setContent={setContent}
            setUnFoldItem={setUnFoldItem}
            doReplaceProps={doReplaceProps}
            listSelectedItem={listSelectedItem}
            setAllContent = {setAllContent}
          ></MyTextArea>
          <SuggestList
            content={content}
            setUnFoldItem={setUnFoldItem}
            setDoReplaceProps={setDoReplaceProps}
            setListSelectedItem={setListSelectedItem}
          ></SuggestList>
        </StyledApp>
      </ContentContext.Provider>
    </>
  );
}

export default App;
