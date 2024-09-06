import React from 'react';
import {
  getItemById,
  getAllItems,
  createNewItem,
  getItemByName
} from '../api/items';

function MainPage() {
  const [verbs, setVerbs] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const allVerbs = await getItemByName('words', 'es');

        setVerbs(allVerbs);
      } catch (err) {
        console.log('error', err);
      }
    };
    getData();
  }, []);

  console.log('VERBS:', verbs);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default MainPage;
