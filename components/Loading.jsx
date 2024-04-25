'use client';
import { TailSpin } from 'react-loader-spinner';

export default function Loader({ loading }) {
  return (
    <div className="flex items-center justify-center h-dvh">
      <TailSpin
        visible={true}
        height={100}
        width={100}
        color="#000000"
        ariaLabel="tail-spin-loading"
        radius={1}
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </div>
  );
}
