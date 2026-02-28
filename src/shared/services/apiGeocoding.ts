
interface PositionType {
  latitude: number;
  longitude: number;
}

export async function getAddress({ latitude, longitude }:PositionType) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        `Failed to fetch address: ${response.status} - ${message}`
      );
    }

    const data = await response.json();

    return {
      city: data.city || data.locality || null,
      region: data.principalSubdivision || null,
      country: data.countryName || null,
     address: `${data?.locality}, ${data?.city} ${data?.postcode}, ${data?.countryName}`,
      raw: data,
    };
  } catch (error) {
    throw new Error(`getAddress() error: ${error}`);
  }
}
