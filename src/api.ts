const API_URL = import.meta.env.VITE_API_URL;

export async function getCards(category?: string) {
  const url = category 
    ? `${API_URL}/cards?category=${category}`
    : `${API_URL}/cards`;
  const response = await fetch(url);
  return response.json();
}

export async function getCard(id: number) {
  const response = await fetch(`${API_URL}/cards/${id}`);
  return response.json();
}

export async function createCard(cardData: any) {
  const response = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  });
  return response.json();
}