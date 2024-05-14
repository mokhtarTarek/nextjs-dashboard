'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  //return an object with the current url params
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    //UrlSearchParms() : params => ?page=1&query=a
    const params = new URLSearchParams(searchParams)
    //if term then update params 
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // update the url in the browser => send a new request to the server and the table will be apdated 
    replace(`${pathname}?${params.toString()}`);

  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={e => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
