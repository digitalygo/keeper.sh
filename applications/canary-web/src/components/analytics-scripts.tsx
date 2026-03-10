import { useEffect, useSyncExternalStore } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  GOOGLE_ADS_ID,
  VISITORS_NOW_TOKEN,
  hasAnalyticsConsent,
  track,
} from "../lib/analytics";

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = (): boolean => hasAnalyticsConsent();
const getServerSnapshot = (): boolean => false;

function AnalyticsScripts() {
  const hasConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const location = useLocation();
  const consentState = hasConsent ? "granted" : "denied";

  useEffect(() => {
    track("page_view", { path: location.pathname });
  }, [location.pathname]);

  return (
    <>
      {VISITORS_NOW_TOKEN && (
        <script
          src="https://cdn.visitors.now/v.js"
          data-token={VISITORS_NOW_TOKEN}
          {...(hasConsent && { "data-persist": true })}
        />
      )}
      {GOOGLE_ADS_ID && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'ad_storage': '${consentState}',
                  'ad_user_data': '${consentState}',
                  'ad_personalization': '${consentState}',
                  'analytics_storage': '${consentState}',
                  'wait_for_update': 500
                });
              `,
            }}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}

export { AnalyticsScripts };
