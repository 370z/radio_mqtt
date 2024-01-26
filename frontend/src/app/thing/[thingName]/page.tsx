import React from 'react';
import List from '@/components/Channel/List';

type Props = {
  params: {
    thingName: string;
  };
};

const Page: React.FC<Props> = ({ params }) => {
  return (
    <div className="flex flex-col gap-10">
      {params.thingName}
      test
    <List />
  </div>
    );
};

export default Page;
