'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import Provider from './provider';

const Page = () => {
  return (
    <Provider>
      <div className="p-4 ">
        <h1>Hey</h1>
        <Button>Click me</Button>
      </div>
    </Provider>
  );
};

export default Page;
