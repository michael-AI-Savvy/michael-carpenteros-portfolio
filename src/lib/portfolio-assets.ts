// Maps image_key (stored in DB) to imported asset URL.
// Admins can override with a custom image_url; otherwise we look up here.
import projectAiChatbot from "@/assets/project-ai-chatbot.png";
import projectUpwork from "@/assets/project-upwork.png";
import projectAutoDm from "@/assets/project-auto-dm.jpg";
import projectN8nSamples from "@/assets/project-n8n-samples.png";
import projectFinalOutput from "@/assets/project-final-output.png";
import projectGenerator from "@/assets/project-generator.png";
import projectCeipalAts from "@/assets/project-ceipal-ats.png";
import projectCeipalCombine from "@/assets/project-ceipal-combine.png";
import projectZapierChatbot from "@/assets/project-zapier-chatbot.png";
import certGoogleAi from "@/assets/cert-google-ai.jpg";
import certPython from "@/assets/cert-python.jpg";
import certChatbot from "@/assets/cert-chatbot.jpg";
import certAiMarketing from "@/assets/cert-ai-marketing.jpg";
import certSupplyChain from "@/assets/cert-supply-chain.jpg";

const map: Record<string, string> = {
  "project-ai-chatbot": projectAiChatbot,
  "project-upwork": projectUpwork,
  "project-auto-dm": projectAutoDm,
  "project-n8n-samples": projectN8nSamples,
  "project-final-output": projectFinalOutput,
  "project-generator": projectGenerator,
  "project-ceipal-ats": projectCeipalAts,
  "project-ceipal-combine": projectCeipalCombine,
  "project-zapier-chatbot": projectZapierChatbot,
  "cert-google-ai": certGoogleAi,
  "cert-python": certPython,
  "cert-chatbot": certChatbot,
  "cert-ai-marketing": certAiMarketing,
  "cert-supply-chain": certSupplyChain,
};

export function resolveImage(image_url?: string | null, image_key?: string | null): string | undefined {
  if (image_url) return image_url;
  if (image_key && map[image_key]) return map[image_key];
  return undefined;
}
