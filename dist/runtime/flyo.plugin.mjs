import { useRouter, defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { useFlyoConfig } from "./composables/useFlyoConfig.mjs";
import FlyoVue from "@flyodev/nitrocms-vue3";
export default defineNuxtPlugin(async ({ vueApp }) => {
  const { token, allowEdit, registerPageRoutes } = useRuntimeConfig().flyo;
  vueApp.use(FlyoVue, {
    token,
    allowEdit
  });
  const { response: config } = await useFlyoConfig();
  const router = useRouter();
  if (registerPageRoutes) {
    config.pages.forEach((route) => {
      router.addRoute(
        {
          name: `${route}`,
          path: `/${route}`,
          component: () => import("~/pages/cms.vue")
          // using ${defaultPageRoute} does not work
        }
      );
    });
  }
});
