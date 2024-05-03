import PropertyAddForm from '@/components/PropertyAddForm.jsx';
import GoBackBtn from '@/components/UI/buttons/GoBackBtn.jsx';
import Link from 'next/link.js';

export default function AddProperty() {
  return (
    <section className="px-4 py-4">
      <div className="max-w-7xl mx-auto p-1">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg">
            <Link href="/">
              <GoBackBtn text="Go Back" />
            </Link>
            <div className="mt-4">
              <PropertyAddForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
