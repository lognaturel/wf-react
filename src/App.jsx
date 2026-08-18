import React, { useEffect, useRef } from "react";
import { createApp, h } from "vue";

import {
  OdkWebForm,
  webFormsPlugin,
} from "@getodk/web-forms";

function mountOdkWebForm(element, {
  formXml,
  fetchFormAttachment,
  onLoaded,
  onSubmit,
}) {
  const app = createApp({
    render: () =>
      h(OdkWebForm, {
        formXml,
        fetchFormAttachment,

        onLoaded,
        onSubmit,
      }),
  });

  app.use(webFormsPlugin);
  app.mount(element);

  return () => app.unmount();
}

function OdkForm(props) {
  const ref = useRef(null);

  useEffect(() => {
    return mountOdkWebForm(ref.current, props);
  }, []);

  return <div ref={ref} />;
}

export default function App() {
const formXml = `
<?xml version="1.0"?>
<h:html
  xmlns="http://www.w3.org/2002/xforms"
  xmlns:h="http://www.w3.org/1999/xhtml"
  xmlns:jr="http://openrosa.org/javarosa"
>
  <h:head>
    <h:title>Tiny Test Form</h:title>

    <model>
      <instance>
        <data id="tiny-test">
          <name />
        </data>
      </instance>

      <bind nodeset="/data/name" type="string" />
    </model>
  </h:head>

  <h:body>
    <input ref="/data/name">
      <label>Your name</label>
    </input>
  </h:body>
</h:html>
`;

  return (
    <OdkForm
      formXml={formXml}

      fetchFormAttachment={async (name) => {
        console.log("attachment requested", name);
        throw new Error("No attachments in playground");
      }}

      onLoaded={() => {
        console.log("ODK form loaded");
      }}

      onSubmit={(...args) => {
        console.log("submission", args);
      }}
    />
  );
}