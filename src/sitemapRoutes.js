import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/" />
    <Route path="/capsule/assign-number" />
    <Route path="/capsule/assign-number-url" />
    <Route path="/capsule/input-number" />
    <Route path="/capsule/settings/confirm" />
    <Route path="/capsule/input-recipients" />
    <Route path="/capsule/letter-format" />
    <Route path="/capsule/open/rolling" />
    <Route path="/capsule/open/text" />
    <Route path="/capsule/open/voice" />
    <Route path="/rolling/:rcapsule_number" />
    <Route path="/capsule/verify" />
    <Route path="/capsule/write/text" />
    <Route path="/capsule/write/voice" />
    <Route path="/login/kakao/nickname" />
    <Route path="/login/kakao/home" />
    <Route path="/login/kakao/settings" />
    <Route path="/capsule/settings/theme" />
    <Route path="/capsule/settings/purpose" />
    <Route path="/capsule/settings/name-date" />
    <Route path="/capsule/write/Complete" />
  </Route>
);
