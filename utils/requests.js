const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

/**
 **Fetch all properties
 */
export async function fetchProperties() {
  if (!apiDomain) {
    return [];
  }

  const res = await fetch(`${apiDomain}/properties`);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

/**
 **Fetch single property
 */
export async function fetchProperty(id) {
  if (!apiDomain) {
    return null;
  }

  const res = await fetch(`${apiDomain}/properties/${id}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}
