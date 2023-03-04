// @ts-nocheck

import { useRef, useState } from "react";

import styled from "styled-components";

const tabsData = [
  { title: "Home", value: "home" },
  { title: "Craft", value: "craft" },
  { title: "Words", value: "words" },
  { title: "Photos", value: "photos" },
  { title: "Social", value: "social" },
];

const Tabs = () => {
  const [tabBoundingBox, setTabBoundingBox] = useState(null);
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState(null);
  const [highlightedTab, setHighlightedTab] = useState(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = useState(true);
  const [isBeingPressed, setIsBeingPressed] = useState(false);

  const highlightRef = useRef(null);
  const wrapperRef = useRef(null);

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
    <TabsNav ref={wrapperRef} onMouseLeave={resetHighlight}>
      <TabsHighlight ref={highlightRef} style={highlightStyles} />
      {tabsData.map((tab) => (
        <Tab
          key={tab.value}
          onMouseOver={(ev) => repositionHighlight(ev, tab)}
          onMouseDown={() => setIsBeingPressed(() => true)}
          onMouseUp={() => setIsBeingPressed(() => false)}
        >
          {tab.title}
        </Tab>
      ))}
    </TabsNav>
  );
};

const TabsNav = styled.div`
  position: relative;
  color: rgb(229, 229, 229);
  background-color: rgb(20, 20, 20);
  border-radius: 10px;
  padding: 5px;
`;

const Tab = styled.a`
  padding: 15px;
  font-size: ${14 / 16}rem;
  color: rgb(229, 229, 229);
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 250ms;
  height: 100%;
  user-select: none;
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
`;

export default Tabs;
