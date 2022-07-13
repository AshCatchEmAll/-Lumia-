import React from "react";
import LumiaAppBar from "./LumiaAppBar";
import LumiaBottomNav from "./LumiaBottomNav";

function LumiaStickyBars({ children }) {
  return (
    <>
      <LumiaAppBar />
      <LumiaBottomNav
        children={
         children
        }
      />
    </>
  );
}
export default LumiaStickyBars;