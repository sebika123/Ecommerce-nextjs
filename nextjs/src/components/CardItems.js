import { useRouter } from 'next/router';

const CardItem = ({ id, title, description }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Product/${id}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '16px', margin: '16px' }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CardItem;
