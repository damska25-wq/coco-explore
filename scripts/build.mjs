// Build complet (Eleventy puis contrôle du site), lancé par `npm run build`
// sur Netlify. Si l'une des deux étapes échoue, le build échoue (Netlify garde
// la version précédente en ligne) et, sur le build de production, une
// notification est envoyée sur le canal ntfy de l'utilisateur (NTFY_TOPIC,
// le même que pour les avis) pour qu'il sache que la mise en ligne est bloquée.
import { spawnSync } from "node:child_process";

function run(label, cmd, args) {
  const result = spawnSync(cmd, args, { stdio: ["inherit", "inherit", "pipe"], encoding: "utf8" });
  if (result.stderr) process.stderr.write(result.stderr);
  return { label, ok: result.status === 0, stderr: result.stderr || "" };
}

async function notifyFailure(step) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic || process.env.CONTEXT !== "production") return;
  // Les dernières lignes d'erreur suffisent à comprendre (ntfy limite la taille).
  const details = step.stderr.trim().split("\n").slice(-12).join("\n").slice(0, 1500);
  const commit = (process.env.COMMIT_REF || "").slice(0, 7);
  try {
    await fetch("https://ntfy.sh/" + encodeURIComponent(topic), {
      method: "POST",
      headers: {
        // ntfy lit les en-têtes en latin-1 : titre sans caractère accentué.
        Title: "Mise en ligne bloquee - Coco Explore",
        Tags: "warning",
        Priority: "high",
        Click: "https://app.netlify.com/projects/cocoexplore/deploys",
      },
      body:
        `Étape en échec : ${step.label}${commit ? ` (commit ${commit})` : ""}.\n` +
        `Le site reste en ligne dans sa version précédente.\n\n${details}`,
    });
  } catch (e) {
    console.error("Notification ntfy impossible :", e.message);
  }
}

const steps = [
  ["build Eleventy", "npx", ["@11ty/eleventy"]],
  ["contrôle du site", "node", ["scripts/check-site.mjs"]],
];
for (const [label, cmd, args] of steps) {
  const step = run(label, cmd, args);
  if (!step.ok) {
    await notifyFailure(step);
    process.exit(1);
  }
}
