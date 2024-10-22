import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      <meta
        name="facebook-domain-verification"
        content="a405pla9tx5j4ipfws3nhrmzkbl5vd"
      />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `          
          @font-face {
            font-family: 'Acumin';
            src: url("${
            asset("/fonts/AcuminPro-Italic.woff2")
          }") format('woff2'),
                url("${asset("/fonts/AcuminPro-Italic.woff")}") format('woff'),
                url("${
            asset("/fonts/AcuminPro-Italic.ttf")
          }") format('truetype');
            font-weight: normal;
            font-style: italic;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Acumin';
            src: url("${
            asset("/fonts/AcuminPro-BoldItalic.woff2")
          }")  format('woff2'),
                url("${
            asset("/fonts/AcuminPro-BoldItalic.woff")
          }")  format('woff'),
                url("${
            asset("/fonts/AcuminPro-BoldItalic.ttf")
          }")  format('truetype');
            font-weight: bold;
            font-style: italic;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Acumin';
            src: url("${
            asset("/fonts/AcuminPro-Regular.woff2")
          }") format('woff2'),
                url("${asset("/fonts/AcuminPro-Regular.woff")}") format('woff'),
                url("${
            asset("/fonts/AcuminPro-Regular.ttf")
          }") format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Acumin';
            src: url("${asset("/fonts/AcuminPro-Bold.woff2")}") format('woff2'),
                url("${asset("/fonts/AcuminPro-Bold.woff")}") format('woff'),
                url("${asset("/fonts/AcuminPro-Bold.ttf")}") format('truetype');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Ouroboros';
            src: url("${
            asset("/fonts/Ouroboros-Regular.woff")
          }") format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
