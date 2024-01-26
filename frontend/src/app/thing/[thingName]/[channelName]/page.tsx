import React from 'react';
import List from '@/components/Channel/List';

type Props = {
  params: {
    channelName: string;
  };
};

const Page: React.FC<Props> = ({ params }) => {
  return (
    <div className="flex flex-col gap-10">
      {params.channelName}
    <List />
  </div>
    );
};

export default Page;
