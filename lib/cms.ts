export type SonicContentItem<T> = {
  id: string
  slug?: string
  title?: string
  data?: T | string | null
  status?: string
  meta_title?: string | null
  meta_description?: string | null
}

type SonicCollectionResponse<T> = {
  data?: SonicContentItem<T>[]
}

// The legacy Sonic CMS has been decommissioned in favour of Decap CMS, which stores
// all editable content as Git-tracked JSON under `content/`.
//
// Reads are hard-disabled here on purpose: as long as `CMS_API_BASE_URL` remains set in
// a deploy environment (e.g. Cloudflare Pages), the old CMS would silently win over the
// in-repo content at build time and serve stale navigation, footer links and homepage
// blocks. Flipping this flag off makes every `getPublished*` helper fall through to the
// fallbacks defined in `lib/site-data.ts` / `content/*.json`.
const LEGACY_CMS_ENABLED = false

function getCmsBaseUrl() {
  if (!LEGACY_CMS_ENABLED) {
    return undefined
  }

  return process.env.CMS_API_BASE_URL?.replace(/\/$/, "")
}

export function parseContentData<T>(item: SonicContentItem<T>): T | null {
  if (!item.data) {
    return null
  }

  if (typeof item.data === "string") {
    try {
      return JSON.parse(item.data) as T
    } catch {
      return null
    }
  }

  return item.data
}

export async function getPublishedCollection<T>(
  collectionName: string,
  fallback: readonly T[]
): Promise<readonly T[]> {
  const records = await getPublishedRecords<T>(collectionName)
  const data = records.map(parseContentData).filter((item): item is T => Boolean(item))

  return data.length > 0 ? data : fallback
}

export async function getPublishedRecords<T>(collectionName: string): Promise<SonicContentItem<T>[]> {
  const baseUrl = getCmsBaseUrl()

  if (!baseUrl) {
    return []
  }

  try {
    const response = await fetch(`${baseUrl}/api/collections/${collectionName}/content`, {
      headers: process.env.CMS_READ_TOKEN
        ? { Authorization: `Bearer ${process.env.CMS_READ_TOKEN}` }
        : undefined,
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return []
    }

    const payload = (await response.json()) as SonicCollectionResponse<T>

    return payload.data ?? []
  } catch {
    return []
  }
}

export async function getPublishedCollectionData<T>(
  collectionName: string,
  fallback: readonly T[]
): Promise<readonly T[]> {
  return getPublishedCollection(collectionName, fallback)
}

export async function getPublishedSingleton<T>(collectionName: string, fallback: T): Promise<T> {
  const records = await getPublishedRecords<T>(collectionName)
  const first = records.map(parseContentData).find(Boolean)

  return first ?? fallback
}

export async function getPublishedBySlug<T>(
  collectionName: string,
  slug: string,
  fallback: T
): Promise<T> {
  const records = await getPublishedRecords<T>(collectionName)
  const match = records.find((item) => item.slug === slug)
  const data = match ? parseContentData(match) : null

  return data ?? fallback
}

export async function getPublishedRecordBySlug<T>(
  collectionName: string,
  slug: string
): Promise<SonicContentItem<T> | null> {
  const records = await getPublishedRecords<T>(collectionName)

  return records.find((item) => item.slug === slug) ?? null
}
