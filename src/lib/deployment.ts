/** Server-only build context; client scripts must not import this module. */
export const IS_DEPLOY_PREVIEW = process.env.CONTEXT === "deploy-preview";

export function getDeployPreviewOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".netlify.app")
      && !url.username && !url.password ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
