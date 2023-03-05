// @ts-nocheck

import styled, { css, keyframes } from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";

import { TabEnum } from "./TabsEnum";

const tabsData = [
  { title: "Home", value: TabEnum.HOME },
  { title: "Craft", value: TabEnum.CRAFT },
  { title: "Words", value: TabEnum.WORDS },
  { title: "Photos", value: TabEnum.PHOTOS },
  { title: "Social", value: TabEnum.SOCIAL },
];

const Tabs = (props: Props) => {
  const { selectedTab, setSelectedTab } = props;
  const [tabBoundingBox, setTabBoundingBox] = useState(null);
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState(null);
  const [highlightedTab, setHighlightedTab] = useState(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = useState(true);
  const [isBeingPressed, setIsBeingPressed] = useState(false);
  const [showShortcutPrompts, setShowShortcutPrompts] = useState(false);

  const highlightRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "1") setSelectedTab(() => 1);
      if (event.key === "2") setSelectedTab(() => 2);
      if (event.key === "3") setSelectedTab(() => 3);
      if (event.key === "4") setSelectedTab(() => 4);
      if (event.key === "5") setSelectedTab(() => 5);
    },
    [setSelectedTab]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const repositionHighlight = (e: MouseEvent, tab: unknown) => {
    setTabBoundingBox(e.target.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(highlightedTab);
    setHighlightedTab(tab);
  };

  const resetHighlight = () => setHighlightedTab(null);

  const highlightStyles = {};

  if (tabBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedTab ? 1 : 0;
    highlightStyles.width = `${tabBoundingBox.width}px`;
    highlightStyles.transform = `translate(${
      tabBoundingBox.left - wrapperBoundingBox.left
    }px)`;
    if (isBeingPressed) {
      highlightStyles.boxShadow = "inset 1px 2px 4px 1px rgb(29, 29, 29)";
    }
  }

  return (
    <ContainerFlexColumn>
      <TabsNav
        ref={wrapperRef}
        onMouseLeave={resetHighlight}
        onMouseOver={() => setShowShortcutPrompts(() => true)}
        onMouseOut={() => setShowShortcutPrompts(() => false)}
      >
        <TabsHighlight ref={highlightRef} style={highlightStyles} />
        {tabsData.map((tab) => (
          <Tab
            key={tab.value}
            tabValue={tab.value}
            showShortcutPrompts={showShortcutPrompts}
            isSelectedTab={selectedTab !== tab.value}
            onMouseOver={(ev) => repositionHighlight(ev, tab)}
            onMouseDown={() => setIsBeingPressed(() => true)}
            onMouseUp={() => {
              setIsBeingPressed(() => false);
              setSelectedTab(() => tab.value);
            }}
          >
            {tab.title}
          </Tab>
        ))}
      </TabsNav>
    </ContainerFlexColumn>
  );
};

interface TabProps {
  tabValue: number;
  showShortcutPrompts: boolean;
  isSelectedTab: boolean;
}

const TabsNav = styled.div`
  position: relative;
  color: rgb(229, 229, 229);
  background-color: rgb(20, 20, 20);
  border-radius: 10px;
  padding: 5px;
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
}`;

const Tab = styled.a<TabProps>`
  padding: 15px;
  font-size: ${14 / 16}rem;
  color: rgb(229, 229, 229);
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 250ms;
  height: 100%;
  user-select: none;

  ${(props) => {
    if (!props.isSelectedTab) {
      return css`
        background: rgb(90, 90, 90);
        border-radius: 8px;
        box-shadow: inset 1px 1px 2px 1px rgb(29, 29, 29);
        color: rgb(200, 200, 200);
      `;
    }
  }}

  ${(props) => {
    if (props.showShortcutPrompts) {
      return css`
        &::after {
          content: "${props.tabValue}";
          position: absolute;
          bottom: -32px;
          left: 36%;
          background: rgb(90, 90, 90);
          border-radius: 3px;
          padding: 4px 7px;
          color: rgb(229, 229, 229);
          box-shadow: rgb(229 229 229) 0px 0px 2px 0px inset;
          font-size: ${10 / 14}rem;
          display: flex;
          width: 20px;
          opacity: 0;
          animation: ${fadeIn} 500ms linear 1.75s 1 forwards;
        }
      `;
    }
  }}
`;

const TabsHighlight = styled.div`
  background: rgb(90, 90, 90);
  position: absolute;
  top: 4.5px;
  left: 0;
  border-radius: 8px;
  height: 48px;
  transition: 0.15s ease;
  transition-property: width, transform, opacity;
  border: 1px rgb(20, 20, 20) solid;
`;

const ContainerFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Tabs;
