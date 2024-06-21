'use client'
// components/SearchBar.js
import React from 'react';
import { Input } from '@nextui-org/react';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full cursor-pointer">
      <Input
        classNames={{
          base: 'max-w-full h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<FiSearch size={18} />}
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
};

export default SearchBar;
