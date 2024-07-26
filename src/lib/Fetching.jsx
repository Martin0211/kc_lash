
const fetchSubscribed = async () => {
    const res = await fetch(`https://kc-lash.vercel.app/api/subscribed/`);
    const data = await res.json();
    return data;
  };
  
  export default fetchSubscribed;