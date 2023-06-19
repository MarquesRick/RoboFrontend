import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Switch>
        <Route component={Home} path="/" exact />
      </Switch>
    </Suspense>
  );
};
