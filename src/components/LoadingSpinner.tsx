export default function LoadingSpinner({ big = false, size = 9 }) {
  const spinnerSize = big ? "w-16 h-16" : `w-${size} h-${size}`;

  return (
    <div className="flex justify-center p-4 bg-amber-50">
      <div className={`${spinnerSize} motion-safe:animate-spin stroke-amber-700 fill-amber-200`} >
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="status">
          <path d="m7.9999999 2.0000001c-3.3137056 0-5.9999999 2.6862943-5.9999999 6 0 3.3137059 2.6862943 5.9999999 5.9999999 5.9999999 2.7212741 0 5.0241771-1.802717 5.7589281-4.285714h-1.848214c-.66366 1.50816-2.1572654 2.571428-3.9107141 2.571428-2.3669314 0-4.2857142-1.918783-4.2857142-4.2857139 0-2.3669315 1.9187828-4.2857143 4.2857142-4.2857143 1.18392 0 2.2418701.4932 3.0133931 1.2723214l-2.1562502 2.15625h5.1428572v-5.1428571l-1.759487 1.7594866c-1.087234-1.0836737-2.5832531-1.7594866-4.2405131-1.7594866z" />
        </svg>
      </div>
    </div>
  )
}


  // ALT: pure [connected] circle loader...
  // const constructionCode = `${spinnerSize} absolute rounded-full border-8 border-solid`
  // return (
  //   <div className="flex justify-center p-3" >
  //     <div className="relative">
  //       <div className={`${constructionCode} border-gray-200`}></div>
  //       <div className={`${constructionCode} animate-spin border-amber-700 border-t-transparent shadow-md`}></div>
  //     </div>
  //   </div>
  // );