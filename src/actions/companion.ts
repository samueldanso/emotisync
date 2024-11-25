"use server";

import { db } from "@/lib/db/db";
import { companions } from "@/lib/db/schemas";
import { catchError } from "@/lib/utils/errors";
import { eq } from "drizzle-orm";
import type { Companion, NewCompanion } from "@/lib/db/schemas";

export async function getCompanions() {
  try {
    const result = await db.query.companions.findMany({
      orderBy: companions.created_at,
    });

    return { data: result, error: null };
  } catch (error) {
    return catchError(error);
  }
}

export async function getCompanionById(id: string) {
  try {
    if (!id) throw new Error("Companion ID is required");

    const companion = await db.query.companions.findFirst({
      where: eq(companions.id, id),
    });

    if (!companion) {
      throw new Error("Companion not found");
    }

    return { data: companion, error: null };
  } catch (error) {
    return catchError(error);
  }
}

export async function createCompanion(
  data: NewCompanion
): Promise<{ data: Companion | null; error: string | null }> {
  try {
    if (!data.name) throw new Error("Companion name is required");
    if (!data.image_url) throw new Error("Companion image URL is required");
    if (!data.personality) throw new Error("Companion personality is required");

    const [companion] = await db.insert(companions).values(data).returning();

    return { data: companion, error: null };
  } catch (error) {
    return catchError(error);
  }
}
