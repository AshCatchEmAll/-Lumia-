import React from "react";
import LumiaAppBar from "./LumiaAppBar";
import LumiaBottomNav from "./LumiaBottomNav";

function LumiaStickyBars({ children ,item=0}) {
  return (
    <>
      <LumiaAppBar />
      <LumiaBottomNav
        item={item}
      >  {children}</LumiaBottomNav>
    </>
  );
}
export default LumiaStickyBars;