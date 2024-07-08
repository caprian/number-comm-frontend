const API_URL = 'http://localhost:5001';

const getCalculations = async () => {
  const response = await fetch(`${API_URL}/calc`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch calculations');
  }

  const data = await response.json();
  return data;
};

const addInitialCalculation = async (startingNumber: number) => {
  const response = await fetch(`${API_URL}/calc/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ startingNumber }),
  });

  if (!response.ok) {
    throw new Error('Failed to add initial calculation');
  }

  const data = await response.json();
  return data;
};

const addComment = async (parentId: string, operator: string, right: number) => {
  const response = await fetch(`${API_URL}/calc/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ parentId, operator, right }),
  });

  if (!response.ok) {
    throw new Error('Failed to add comment');
  }

  const data = await response.json();
  return data;
};

const calcService = {
  getCalculations,
  addInitialCalculation,
  addComment,
};

export default calcService;
