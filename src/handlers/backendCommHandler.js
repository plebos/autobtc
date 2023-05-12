export const fetchCreateUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/create_user`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching unique ID and balance:', error);
    }
  };
  
export async function fetchBalanceLimits() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/balance_limits`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching balance limits:", error);
    }
  }


  export async function fetchUserBalance({unique_id}) {
    try {
        console.log(unique_id)
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/get_balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unique_id: unique_id,
        }),
      });
      return response;
    } catch (error) {
        console.error("Error fetching balance limits:", error);
    }
  }
  
  export const requestInvoice = async (uniqueId, sid, amount_sats, sponsor = false) => {
    try {
      console.log(JSON.stringify({
        unique_id: uniqueId,
        sid: sid,
        amount_msats: amount_sats * 1000,
        sponsor: sponsor
      }));

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/get_invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unique_id: uniqueId,
          sid: sid,
          amount_msats: amount_sats * 1000,
          sponsor: sponsor
        }),
      });

      const res = await response.json();
      if (!response.ok || res.status === "error") {
        console.error('Error fetching invoice:', response);
        if (res) {
          return { error: true, message: `${res.message}` };
        } else {
          return { error: true, message: `Error fetching invoice` };
        }
      }

      console.log('Invoice response:', res);
      return res;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      return { error: true, message: 'Error requesting invoice. Please try again later.' };
    }
  };