import type { BadgeFormat } from "../data/badge";

const FLAME = "#E65100";
const GOLD = "#FFB300";
const INK = "#F5EBE0";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function ensureFonts() {
  try {
    await Promise.all([
      document.fonts.load("800 52px Outfit"),
      document.fonts.load("700 36px Outfit"),
      document.fonts.load("600 22px Outfit"),
    ]);
  } catch {
    /* fallback system font */
  }
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
) {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export async function generateBadgeCanvas(
  imageSrc: string,
  phrase: string,
  format: BadgeFormat,
): Promise<HTMLCanvasElement> {
  await ensureFonts();

  const dims = format === "story"
    ? { w: 1080, h: 1920 }
    : { w: 1080, h: 1080 };

  const { w, h } = dims;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas non supporté");

  const img = await loadImage(imageSrc);

  drawCover(ctx, img, w, h);

  // Vignette haut
  const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.35);
  topGrad.addColorStop(0, "rgba(10, 6, 4, 0.55)");
  topGrad.addColorStop(1, "transparent");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, w, h * 0.35);

  // Gradient bas scène
  const bottomH = format === "story" ? h * 0.42 : h * 0.48;
  const bottomGrad = ctx.createLinearGradient(0, h - bottomH, 0, h);
  bottomGrad.addColorStop(0, "transparent");
  bottomGrad.addColorStop(0.45, "rgba(10, 6, 4, 0.75)");
  bottomGrad.addColorStop(1, "rgba(10, 6, 4, 0.96)");
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(0, h - bottomH, w, bottomH);

  // Lueur orange
  const glowGrad = ctx.createRadialGradient(w * 0.5, h * 0.88, 0, w * 0.5, h * 0.88, w * 0.6);
  glowGrad.addColorStop(0, "rgba(230, 81, 0, 0.35)");
  glowGrad.addColorStop(1, "transparent");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, h - bottomH, w, bottomH);

  const pad = w * 0.07;
  const contentW = w - pad * 2;

  // Badge hashtag pill
  const hashtag = "#CelebronSagbohan";
  ctx.font = "800 44px Outfit, system-ui, sans-serif";
  const tagW = ctx.measureText(hashtag).width + 56;
  const tagH = 72;
  const tagX = (w - tagW) / 2;
  const tagY = h - (format === "story" ? 340 : 280);

  roundRect(ctx, tagX, tagY, tagW, tagH, tagH / 2);
  ctx.fillStyle = FLAME;
  ctx.shadowColor = "rgba(230, 81, 0, 0.6)";
  ctx.shadowBlur = 24;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(hashtag, w / 2, tagY + tagH / 2 + 2);

  // Phrase forte
  ctx.font = "700 38px Outfit, system-ui, sans-serif";
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  const lines = wrapText(ctx, phrase, contentW);
  const lineH = 48;
  const phraseBlockH = lines.length * lineH;
  let phraseY = tagY - phraseBlockH - 28;

  for (const line of lines) {
    ctx.fillText(line, w / 2, phraseY);
    phraseY += lineH;
  }

  // Ligne dorée décorative
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 40, tagY + tagH + 28);
  ctx.lineTo(w / 2 + 40, tagY + tagH + 28);
  ctx.stroke();

  // Crédit discret
  ctx.font = "600 20px Outfit, system-ui, sans-serif";
  ctx.fillStyle = "rgba(188, 170, 164, 0.85)";
  ctx.fillText("Benin Bouge × Podlab Media", w / 2, h - pad * 0.9);

  // Bordure intérieure
  ctx.strokeStyle = "rgba(255, 179, 0, 0.25)";
  ctx.lineWidth = 3;
  roundRect(ctx, 12, 12, w - 24, h - 24, 20);
  ctx.stroke();

  return canvas;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
