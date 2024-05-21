'use client';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader({ loading }) {
  return (
    <div className="flex items-center justify-center h-dvh">
      <RotatingLines
        visible={true}
        height="40"
        width="40"
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
