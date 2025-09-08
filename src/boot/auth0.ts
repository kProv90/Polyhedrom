import { defineBoot } from "#q-app/wrappers";
import { createAuth0 } from "@auth0/auth0-vue";

export default defineBoot(({ app }) => {
  app.use(
    createAuth0({
      domain: "dev-0lr82x7t4pgdauyx.us.auth0.com",
      clientId: "pkLq272Dq4hCQj484Lrx8Lv8cN7QB1S4",
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    })
  );
});
