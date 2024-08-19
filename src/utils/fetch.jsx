const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchSubscribed = async () => {
  try {
    const res = await fetch(`${API_URL}/api/subscribed`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: { revalidate: 10 }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Unexpected content type: ${contentType}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return { subscribers: [] };
  }
};