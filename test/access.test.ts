import { describe, it, expect } from "vitest";
import { pathCovers, canAccess } from "../src/lib/access";
import { toPublicView } from "../src/lib/content";
import type { Resource } from "../src/lib/data/types";

describe("pathCovers", () => {
  it("exact match returns true", () => {
    expect(pathCovers("course/ai-untuk-pemula", "course/ai-untuk-pemula")).toBe(true);
  });

  it("folder match returns true", () => {
    expect(pathCovers("course", "course/ai-untuk-pemula")).toBe(true);
    expect(pathCovers("llm-prompt/", "llm-prompt/email-penjualan-otomatis")).toBe(true);
  });

  it("sibling course vs courses/x returns false", () => {
    expect(pathCovers("course", "courses/ai-untuk-pemula")).toBe(false);
  });

  it("empty grants returns false for paid resource", () => {
    expect(pathCovers("course/ai-untuk-pemula", "llm-prompt/email-penjualan-otomatis")).toBe(false);
  });

  it("unrelated grant returns false", () => {
    expect(pathCovers("founder-space/strategi-go-to-market-ai", "course/ai-untuk-pemula")).toBe(false);
  });

  it("bundle-all-access and wildcard grants cover all resources", () => {
    expect(pathCovers("bundle-all-access", "course/ai-untuk-pemula")).toBe(true);
    expect(pathCovers("pro", "llm-prompt/email-penjualan-otomatis")).toBe(true);
    expect(pathCovers("*", "visual-prompt/midjourney-banner-promosi")).toBe(true);
  });
});

describe("canAccess", () => {
  it("free resource returns true with empty grants", () => {
    const free = { id: "llm-prompt/chatgpt-pemasaran-umkm", access_level: "free" as const };
    expect(canAccess(free, [])).toBe(true);
  });

  it("paid resource returns false with empty grants", () => {
    const paid = { id: "course/ai-untuk-pemula", access_level: "paid" as const };
    expect(canAccess(paid, [])).toBe(false);
  });

  it("paid resource returns true with matching grant", () => {
    const paid = { id: "course/ai-untuk-pemula", access_level: "paid" as const };
    expect(canAccess(paid, ["course/ai-untuk-pemula"])).toBe(true);
  });

  it("paid resource returns true with folder grant", () => {
    const paid = { id: "course/ai-untuk-pemula", access_level: "paid" as const };
    expect(canAccess(paid, ["course"])).toBe(true);
  });

  it("paid resource returns false with non-matching grant", () => {
    const paid = { id: "course/ai-untuk-pemula", access_level: "paid" as const };
    expect(canAccess(paid, ["llm-prompt/email-penjualan-otomatis"])).toBe(false);
  });
});

describe("toPublicView", () => {
  const fullResource: Resource = {
    id: "llm-prompt/email-penjualan-otomatis",
    title: "Prompt Email Penjualan Otomatis",
    description: "Deskripsi test",
    category: "llm-prompt",
    access_level: "paid",
    teaser: "Teaser test",
    tools: ["ChatGPT"],
    topics: ["penjualan"],
    prompt_preview: "English prompt here",
    steps: ["Step 1", "Step 2"],
    tips: ["Tip 1"],
    body: "Body text here",
  };

  it("does not contain paid keys", () => {
    const view = toPublicView(fullResource);
    expect(view).not.toHaveProperty("prompt_preview");
    expect(view).not.toHaveProperty("steps");
    expect(view).not.toHaveProperty("tips");
    expect(view).not.toHaveProperty("body");
    expect(view).not.toHaveProperty("modules");
  });

  it("contains public keys", () => {
    const view = toPublicView(fullResource);
    expect(view.id).toBe(fullResource.id);
    expect(view.title).toBe(fullResource.title);
    expect(view.category).toBe(fullResource.category);
    expect(view.access_level).toBe(fullResource.access_level);
    expect(view.teaser).toBe(fullResource.teaser);
    expect(view.tools).toEqual(fullResource.tools);
    expect(view.topics).toEqual(fullResource.topics);
  });

  it("includes moduleCount for courses", () => {
    const courseResource: Resource = {
      id: "course/ai-untuk-pemula",
      title: "Kursus AI",
      description: "Deskripsi",
      category: "course",
      access_level: "paid",
      teaser: "Teaser",
      tools: ["ChatGPT"],
      topics: ["pemula"],
      modules: [
        { title: "Modul 1", sequence: 1 },
        { title: "Modul 2", sequence: 2 },
        { title: "Modul 3", sequence: 3 },
        { title: "Modul 4", sequence: 4 },
      ],
    };
    const view = toPublicView(courseResource);
    expect(view.moduleCount).toBe(4);
  });
});
