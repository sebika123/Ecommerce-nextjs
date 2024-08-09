 async function getServerSideProps() {
    // Fetch data from a database, API, etc.
    const initialPostContent = ''; // Replace with actual fetching logic if needed
    const initialLikes = 0; // Replace with actual fetching logic if needed
  
    return {
      props: {
        initialPostContent,
        initialLikes,
      },
    };
  }
  

  export default getServerSideProps;