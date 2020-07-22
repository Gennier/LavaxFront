import { useRouter } from 'next/router';

const Heading = () => {
  const router = useRouter();
  const path = router.route.split('/')[1];
  const pathFormat = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <>
      <p className="heading">{pathFormat}</p>
    </>
  );
};

export default Heading;
