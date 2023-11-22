import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `          
          @font-face {
            font-family: "AcuminPro-Regular";
            src: url("${asset("/fonts/AcuminPro-Regular.woff2")}") format("woff2");
            font-style: regular;
            font-weight: normal;
      },`,
        }}
      />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `          
          @font-face {
            font-family: "AcuminPro-Bold";
            src: url("${asset("/fonts/AcuminPro-Bold.woff2")}") format("woff2");
            font-style: bold;
            font-weight: normal;
      },`,
        }}
      />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `          
          @font-face {
            font-family: "AcuminPro-BoldItalic";
            src: url("${asset("/fonts/AcuminPro-BoldItalic.woff2")}") format("woff2");
            font-style: boldItalic;
            font-weight: normal;
      },`,
        }}
      />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `          
          @font-face {
            font-family: "AcuminPro-Italic";
            src: url("${asset("/fonts/AcuminPro-Italic.woff2")}") format("woff2");
            font-style: italic;
            font-weight: normal;
      },`,
        }}
      />

    </Head>
  );
}

export default GlobalTags;
