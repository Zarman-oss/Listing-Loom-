import Link from 'next/link.js';
import BlackButton from './UI/buttons/BlackButton.jsx';

export default function AgentContactModal({ property }) {
  return (
    <div className="">
      <Link href="/contact">
        <BlackButton text="Contact Agent" />
      </Link>{' '}
    </div>
  );
}
