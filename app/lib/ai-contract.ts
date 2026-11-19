export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export type ImageType = typeof IMAGE_TYPES[number];
export type Enemy = { name: string; level: number; stats: { hp: number; attack: number; defense: number; speed: number }; behaviors: ("ranged" | "melee")[] };
export type UploadResult = { ok: true; enemy: Enemy; filename: string; sizeBytes: number } | { ok: false; error: string };
export function validateImage(file: { size: number; type: string }): string | null {
  if (!IMAGE_TYPES.some(type => type === file.type)) return "Choose a PNG, JPEG, or WebP image.";
  if (file.size === 0) return "The selected file is empty.";
  if (file.size > MAX_IMAGE_BYTES) return "Choose an image smaller than 4 MB.";
  return null;
}
export function isEnemy(value: unknown): value is Enemy {
  if (!value || typeof value !== "object") return false;
  const enemy = value as Record<string, unknown>;
  if (typeof enemy.name !== "string" || !enemy.name.trim() || enemy.name.length > 100 || !Number.isInteger(enemy.level) || Number(enemy.level) < 1 || Number(enemy.level) > 100) return false;
  if (!enemy.stats || typeof enemy.stats !== "object") return false;
  const stats = enemy.stats as Record<string, unknown>;
  if (!Number.isInteger(stats.hp) || Number(stats.hp) < 1 || Number(stats.hp) > 100000) return false;
  if (!["attack", "defense", "speed"].every(key => typeof stats[key] === "number" && Number.isFinite(stats[key]) && Number(stats[key]) >= 0 && Number(stats[key]) <= 100000)) return false;
  return Array.isArray(enemy.behaviors) && enemy.behaviors.length === 1 && enemy.behaviors.every(behavior => behavior === "ranged" || behavior === "melee");
}
